# HIDDEN COST FINDER — PROJECT RULES

## 1. Project Objective
Build a fast, responsive, single-page web tool that estimates hidden everyday expenses and shows users their potential monthly and annual costs.
The tool must be practical, trustworthy, accessible, lightweight, and easy to use without registration.

## 2. Technology Stack
- React + Vite + JavaScript.
- Tailwind CSS for styling.
- Lucide React for icons.
- LocalStorage only if saving user scenarios is implemented.
- No backend, authentication, database, or paid API.
- Deploy-ready for Cloudflare Pages.
- Use current stable, mutually compatible package versions.

## 3. Core Features
- Calculate costs for unused subscriptions, standby electronics, food waste, underused memberships, and other recurring expenses.
- Allow users to add multiple expense items with name, category, quantity, unit cost, frequency, and applicable time period.
- Allow editing and deleting items.
- Display estimated monthly, annual, and user-selected-period costs.
- Show category-wise totals and largest sources of potential waste.
- Provide practical, nonjudgmental savings suggestions.
- Include a reset option and sensible empty states.
- Keep all calculations functional without an internet connection.

## 4. Calculation Accuracy
- Separate calculation logic from UI components.
- Support one-time, daily, weekly, monthly, and yearly costs.
- Convert all supported frequencies to a common time basis before calculating totals.
- Distinguish recurring from one-time expenses without double-counting.
- Validate inputs and reject negative costs and invalid values.
- Default currency INR (₹) with consistent locale-aware formatting.
- Label results as estimates, not guaranteed savings.

## 5. UI/UX Rules
- Clean, human-designed financial utility aesthetic with restrained teal accents.
- Prioritize mobile-first layouts and one-handed usability.
- Keep calculator easily accessible with clear labels and visible focus states.
- Avoid excessive gradients, oversized headings, and unnecessary animations.
- Prefer clear totals, breakdowns, and comparison cards over complex charts.

## 6. Privacy
- No accounts, no data transmission to servers.
- LocalStorage for optional scenario saving with a clear delete-all option.
- Accurate privacy notice.

## 7. Advertising & Monetization
- Reserved-dimension ad slots to eliminate Cumulative Layout Shift (CLS).
- Never disguise ads as calculator controls or recommendations.
- Keep ads away from inputs and result actions.
