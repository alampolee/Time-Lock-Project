## 2025-02-23 - Interactive Feedback & Semantic Clarity
**Learning:** Imperative `onMouseEnter` styles are brittle and less smooth than declarative animations. Additionally, dynamic button text (e.g., "FOCUSING...") can be ambiguous to screen readers.
**Action:** Use Framer Motion's `whileHover`/`whileFocus` for interaction states and provide stable, descriptive `aria-label`s (e.g., "Focus Session In Progress") for controls with changing text.
