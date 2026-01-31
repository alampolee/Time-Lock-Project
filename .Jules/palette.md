## 2025-05-19 - [Accessibility] Mirroring Hover States for Keyboard Users
**Learning:** Inline styles for hover states (`onMouseEnter`/`onMouseLeave`) are invisible to keyboard users, creating an inconsistent experience.
**Action:** Always mirror these with `onFocus`/`onBlur` handlers or use CSS classes with `:hover` and `:focus-visible`.
