import { Socket } from 'socket.io-client';
import { initSocket } from './socketClient';
import { isPusherConfigured, getStaffChannel, triggerPusherEvent } from './pusherClient';

export type SyncMode = 'socket.io' | 'pusher' | 'serverless-poll';

type EventCallback = (data: any) => void;

class RealtimeHub {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private mode: SyncMode = 'socket.io';
  private initialized = false;
  private socketInstance: Socket | null = null;
  private pollInterval: any = null;
  private connected = false;

  public async initialize(): Promise<SyncMode> {
    if (this.initialized) {
      if (this.mode === 'socket.io' && this.socketInstance) {
        this.connected = this.socketInstance.connected;
      }
      return this.mode;
    }
    this.initialized = true;

    const envMode = process.env.NEXT_PUBLIC_SYNC_MODE;
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

    // Detect if running on Vercel deployment
    const isVercelHost =
      typeof window !== 'undefined' &&
      (window.location.hostname.endsWith('vercel.app') || window.location.hostname.includes('vercel'));

    // On Vercel without an external socket URL, Socket.IO fails due to serverless execution model
    const isVercelServerless = isVercelHost && !socketUrl;

    if (envMode === 'pusher' || isPusherConfigured()) {
      this.mode = 'pusher';
      this.connected = true;
      this.setupPusher();
      return this.mode;
    }

    if (envMode === 'serverless-poll' || isVercelServerless) {
      this.mode = 'serverless-poll';
      this.connected = true;
      this.setupPolling();
      return this.mode;
    }

    // Default to Socket.IO for Local & Docker host
    try {
      this.socketInstance = await initSocket();
      this.mode = 'socket.io';
      this.connected = this.socketInstance.connected;
      this.setupSocketListeners();
    } catch (err) {
      console.warn('Socket.IO connection failed, switching to Serverless mode', err);
      this.mode = 'serverless-poll';
      this.connected = true;
      this.setupPolling();
    }

    return this.mode;
  }

  public isConnected(): boolean {
    if (this.mode === 'socket.io' && this.socketInstance) {
      return this.socketInstance.connected;
    }
    return this.connected;
  }

  public getMode(): SyncMode {
    return this.mode;
  }

  // Subscribe to real-time events
  public on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  // Unsubscribe from real-time events
  public off(event: string, callback: EventCallback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.delete(callback);
    }
  }

  // Notify internal listeners
  private emitLocal(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(data));
    }
  }

  // Emit event to external real-time server
  public emit(event: string, data: any) {
    // 1. Local listener dispatch (map patient event name to staff event name)
    const staffEventMap: Record<string, string> = {
      patient_update: 'staff_patient_update',
      patient_status: 'staff_patient_status',
      patient_submit: 'staff_patient_submit',
      patient_focus: 'staff_patient_focus',
    };

    if (staffEventMap[event]) {
      this.emitLocal(staffEventMap[event], data);
    }
    this.emitLocal(event, data);

    // 2. Socket.IO mode
    if (this.mode === 'socket.io' && this.socketInstance) {
      this.socketInstance.emit(event, data);
    }

    // 3. Pusher / Serverless mode
    if (this.mode === 'pusher' || this.mode === 'serverless-poll') {
      triggerPusherEvent(event, data);
    }
  }

  private setupSocketListeners() {
    if (!this.socketInstance) return;

    this.socketInstance.on('connect', () => {
      this.connected = true;
      this.emitLocal('connect', true);
    });

    this.socketInstance.on('disconnect', () => {
      this.connected = false;
      this.emitLocal('disconnect', false);
    });

    const events = [
      'staff_patient_update',
      'staff_patient_status',
      'staff_patient_submit',
      'staff_patient_focus',
    ];

    events.forEach((evt) => {
      this.socketInstance?.on(evt, (data) => {
        this.emitLocal(evt, data);
      });
    });
  }

  private setupPusher() {
    this.connected = true;
    const channel = getStaffChannel();
    if (!channel) {
      this.setupPolling();
      return;
    }

    const eventMappings: Record<string, string> = {
      patient_update: 'staff_patient_update',
      patient_status: 'staff_patient_status',
      patient_submit: 'staff_patient_submit',
      patient_focus: 'staff_patient_focus',
    };

    Object.entries(eventMappings).forEach(([pusherEvt, internalEvt]) => {
      channel.bind(pusherEvt, (data: any) => {
        this.emitLocal(internalEvt, data);
      });
    });

    this.emitLocal('connect', true);
  }

  private setupPolling() {
    this.connected = true;
    if (this.pollInterval) clearInterval(this.pollInterval);

    this.emitLocal('connect', true);
    let lastHash = '';

    // Immediately fetch initial state
    const fetchState = async () => {
      try {
        const res = await fetch('/api/pusher');
        if (!res.ok) return;
        const data = await res.json();

        const currentHash = JSON.stringify(data);
        if (currentHash !== lastHash) {
          lastHash = currentHash;
          if (data.patientData) this.emitLocal('staff_patient_update', data.patientData);
          if (data.status) this.emitLocal('staff_patient_status', data.status);
          if (data.activeField !== undefined) this.emitLocal('staff_patient_focus', data.activeField);
        }
      } catch {
        // Ignore polling errors silently
      }
    };

    fetchState();
    this.pollInterval = setInterval(fetchState, 1000);
  }
}

export const realtimeHub = new RealtimeHub();
