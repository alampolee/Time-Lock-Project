## 2026-02-05 - Framer Motion Import Aliasing
**Learning:** Due to strict ESLint `no-unused-vars` rules, `framer-motion`'s `motion` component is flagged as unused when used in JSX (e.g., `<motion.div>`) because it is lowercase.
**Action:** Always alias `motion` to `Motion` (Capitalized) when importing: `import { motion as Motion } from 'framer-motion';`.
