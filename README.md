# Hidden Cost Finder

> **Find the Hidden Cost of Everyday Expenses**  
> Unused subscriptions, wasted food, standby electricity, and forgotten memberships quietly add up. Calculate what they cost you each month and year.

Hidden Cost Finder is a production-ready, client-side financial utility built with **React**, **Vite**, and **Tailwind CSS**. It runs 100% locally in the browser with zero backend requirements, zero account sign-ups, and complete user privacy.

---

## Features

- **Category-Tailored Calculations**:
  - **Unused Subscriptions**: Normalize monthly, annual, quarterly, and weekly fees with customizable unused percentages.
  - **Food Waste**: Calculate discarded perishables, leftovers, and takeout by item cost and frequency.
  - **Standby Vampire Electricity**: Physics-based calculation `(Watts × Qty × Hours) ÷ 1,000 × Tariff/kWh × Days`.
  - **Underused Memberships**: Gyms, sports clubs, and co-working passes with reported idle ratios.
  - **Custom Expenses**: Any one-time or recurring expense habits amortized accurately.
- **Dynamic Live Aggregates**:
  - Immediate updates on every edit.
  - Annual and monthly toggle views.
  - Identification of the single largest cost contributor.
  - Category percentage breakdowns with visual proportional indicators.
- **Input-Driven Savings Opportunities**:
  - Nonjudgmental, realistic suggestions derived strictly from the entered items.
  - Honest disclaimers—never promises 100% recovery.
- **Pre-Configured Personas**:
  - *Urban Professional* (Streaming, food deliveries, gym, standby tech).
  - *Busy Family Household* (Bulk grocery spoilage, family plans, appliances).
  - *Budget-Conscious Renter* (Duplicate accounts, impulse drinks).
- **Export & Storage**:
  - Clean printable report stylesheet (`@media print` formatted).
  - One-click markdown summary copy to clipboard.
  - Client-side scenario saving via browser `LocalStorage` with a one-click local data wipe button.
- **Accessibility & Design**:
  - Accessible focus states, WCAG contrast compliance, and semantic HTML.
  - Mobile-first responsive layout with restrained teal and slate aesthetics.
- **Monetization Readiness**:
  - Pre-allocated advertisement slots with reserved dimensions to eliminate Cumulative Layout Shift (CLS).
- **SEO & Search Visibility**:
  - Metadata, OpenGraph cards, Twitter cards.
  - Embedded JSON-LD schema (`WebApplication` and `FAQPage`).
  - Native `robots.txt` and `sitemap.xml`.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository and navigate into the folder
cd "cost finder"

# Install dependencies
npm install
```

### Local Development

```bash
# Start the Vite development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Running Unit Tests

```bash
# Run calculation engine unit test suite
npm test
```

### Production Build

```bash
# Build optimized static bundle for deployment
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment to Cloudflare Pages

This application is designed specifically for static edge hosting on **Cloudflare Pages**.

### Method 1: Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

### Method 2: Direct Upload via Wrangler CLI
```bash
# Install Wrangler globally if needed
npm install -g wrangler

# Build the project
npm run build

# Deploy dist folder directly to Cloudflare Pages
wrangler pages deploy dist --project-name=hidden-cost-finder
```

The repository includes `public/_redirects` to handle single-page application routing automatically on Cloudflare Pages.

---

## Calculation Methodologies & Assumptions

| Category | Input Variables | Formula / Logic |
| :--- | :--- | :--- |
| **Subscriptions** | Price, Frequency, Qty, Unused % | `(Price × Qty × Multiplier) × (Unused% ÷ 100)` |
| **Food Waste** | Unit Cost, Qty, Frequency | `(Cost × Qty) × Annual Multiplier` |
| **Standby Power** | Watts, Qty, Hours/Day, Tariff | `((Watts × Qty × Hours) ÷ 1,000) × Tariff × 365` |
| **Memberships** | Fee, Frequency, Qty, Unused % | `(Fee × Qty × Multiplier) × (Unused% ÷ 100)` |
| **Custom** | Unit Cost, Qty, Frequency | One-time or recurring annualized cost |

*Multipliers*: Daily = 365, Weekly = 52, Monthly = 12, Quarterly = 4, Yearly = 1, One-time = 1 amortized over 12 months.

---

## Verification & Manual Checklist

- [x] All 5 categories implemented with tailored formulas.
- [x] Instant calculation updates without page refresh.
- [x] Resilient input validation rejecting negative values.
- [x] LocalStorage graceful fallback when storage is restricted.
- [x] Print stylesheet suppressing interactive buttons and ad banners.
- [x] Clipboard API integration with fallback feedback.
- [x] Responsive layout tested on desktop, tablet, and mobile views.
- [x] Cloudflare Pages `_redirects` and `_headers` included.
- [ ] *Optional live step*: Replace `ca-pub-XXXXXXXXXXXXXXXX` with real Google AdSense or ad network tag when account approved.
- [ ] *Optional live step*: Update canonical URL in `index.html` once custom domain is attached.
