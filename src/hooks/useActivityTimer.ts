import { useCallback, useRef } from 'react';

export function useActivityTimer(
  onIdle: () => void,
  onActive: () => void,
  idleTimeoutMs: number = 5000
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    onActive();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onIdle();
    }, idleTimeoutMs);
  }, [onIdle, onActive, idleTimeoutMs]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return { resetTimer, clearTimer };
}
