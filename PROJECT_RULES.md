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
- Use the current stable, mutually compatible package versions.

## 3. Core Features
- Calculate costs for unused subscriptions, standby electronics, food waste, underused memberships, and other recurring expenses.
- Allow users to add multiple expense items.
- Each item must support a name, category, quantity, unit cost, frequency, and applicable time period.
- Allow editing and deleting items.
- Display estimated monthly, annual, and user-selected-period costs.
- Show category-wise totals and the largest sources of potential waste.
- Provide practical, nonjudgmental savings suggestions.
- Include a reset option and sensible empty states.
- Keep all calculations functional without an internet connection.

## 4. Calculation Accuracy
- Separate calculation logic from UI components.
- Support one-time, daily, weekly, monthly, and yearly costs.
- Handle quantity, usage frequency, and time periods consistently.
- Convert all supported frequencies to a common time basis before calculating totals.
- Clearly distinguish recurring expenses from one-time expenses.
- Do not double-count expenses when converting between periods.
- Validate inputs and reject negative costs, invalid quantities, and invalid frequencies.
- Treat zero values as valid where appropriate.
- Use INR (₹) as the default currency, with a currency selector only if it can be implemented consistently.
- Use locale-aware currency formatting.
- Label results as estimates, not guaranteed savings.
- Never invent precise electricity consumption, food-waste amounts, subscription fees, or user expenses.
- Explain assumptions where actual costs depend on user behavior.

## 5. UI/UX Rules
- Use a clean, human-designed financial utility aesthetic.
- Prioritize mobile-first layouts and one-handed usability.
- Keep the primary calculator above the fold where practical.
- Use clear labels, short instructions, readable typography, and accessible contrast.
- Provide keyboard-accessible controls and visible focus states.
- Use inline validation messages and helpful examples.
- Use reusable components and consistent spacing.
- Avoid excessive gradients, oversized headings, unnecessary animations, and generic AI-generated dashboard designs.
- Do not use charts unless they improve comprehension. Prefer clear totals, breakdowns, and comparison cards.
- Include loading, empty, validation, and result states where applicable.

## 6. Privacy
- No account or personal information is required.
- Do not transmit expense inputs to a server.
- If saving scenarios is implemented, store them locally and provide a clear delete-all option.
- Include a privacy policy that accurately reflects the actual implementation.
- Never claim that data is stored locally unless the code genuinely does so.

## 7. Code Quality
- Use small, reusable components.
- Keep calculation utilities independent of presentation.
- Use descriptive names and consistent formatting.
- Avoid unnecessary dependencies and duplicated logic.
- Do not leave broken controls, fake functionality, TODO placeholders, or nonfunctional buttons.
- Add unit tests for calculation logic and important edge cases.
- Handle missing, invalid, and unusually large inputs safely.

## 8. Advertising
- Design unobtrusive ad placeholders that can be replaced with approved advertising code.
- Never disguise advertisements as calculator controls or recommendations.
- Keep advertisements away from primary input controls and important result actions.
- Do not load invented ad scripts, fake ad units, or fabricated ad performance metrics.
- Ensure ads do not cause layout shifts or block the calculator.

## 9. Quality Assurance
- Test every expense frequency and conversion.
- Test multiple expense items and category totals.
- Verify monthly and annual totals independently.
- Test mobile, tablet, and desktop layouts.
- Verify refresh-safe routing if additional routes are introduced.
- Run linting, tests, and a production build.
- Fix errors before considering the project complete.

## 10. Final Delivery
Provide a working, production-ready application, a clear file structure, setup instructions, deployment instructions, test results, and a list of any remaining limitations. Do not claim a test passed unless it was actually executed.
