# UI/UX Design Decisions Across Screen Sizes

Version: 1.0

---

## 1. Design System & Aesthetics

- **Color Palette**: Dark Slate background (`#020617` / `bg-slate-950`) combined with Cyan (`#06b6d4`) accents for Patient Form and Blue (`#2563eb`) accents for Staff View.
- **Glassmorphism & Depth**: Uses `backdrop-blur-md` and semi-transparent Slate backgrounds (`bg-slate-900/80`, `bg-slate-800/40`) to create a clean, modern healthcare terminal interface.
- **Typography**: Inter font with clear weight hierarchy and distinct labels for required (`*`) vs optional fields.

---

## 2. Responsiveness Strategy

### 2.1 Mobile Viewports (< 768px)

- **Patient Form**: Form fields switch to a single-column layout for easy touch input on smartphone screens.
- **Staff View**: Mirrored patient cards stack vertically into a single-column grid, making monitoring effortless on mobile devices or tablets.
- **Header Navigation**: Switches to a stacked layout with accessible touch buttons for switching between Patient and Staff views.

### 2.2 Desktop & Tablet Viewports (≥ 768px)

- **Patient Form**: Fields expand into multi-column grid layouts (3 columns for names, 2 columns for contact and DOB details), optimizing screen space.
- **Staff View**: Mirrored patient field cards display in a 3-column dashboard grid, providing instant overview without scrolling.
- **Header Navigation**: Header items align horizontally with sticky top positioning.
