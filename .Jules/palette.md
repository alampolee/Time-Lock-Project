## 2026-01-27 - [Accessibility: Mapping Hover to Focus]
**Learning:** In custom UI components where hover states are handled via JS (e.g., inline styles driven by `onMouseEnter`), these interactions are completely invisible to keyboard users. Standard CSS `:hover` often doesn't automatically map to `:focus` if not explicitly defined.
**Action:** When implementing JS-driven hover effects, always implement corresponding `onFocus`/`onBlur` handlers that trigger the same visual state (or an enhanced one) to ensure keyboard users receive the same feedback.
