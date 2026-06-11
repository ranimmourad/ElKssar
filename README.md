# EL KSSAR — قصر الأثاث

## Project Overview
- **Name**: EL KSSAR (قصر الأثاث) — Premium Furniture & Decoration boutique
- **Goal**: A luxury Tunisian furniture showroom e-commerce experience (Egyptian 🇪🇬 & Turkish 🇹🇷 furniture, crystal, porcelain, garden furniture)
- **Stack**: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion (minimal)
- **Type**: Frontend-only. No backend, no API, no database — all data in local TypeScript mock files.

## Run Locally
```bash
npm install
npm run dev      # http://localhost:3000
```
Build & start (production):
```bash
npm run build
npm run start
```

## Deployment
- **Platform**: Vercel (zero-config, no edge functions, no Cloudflare files)
- **Status**: ✅ Builds successfully (22 static/SSG pages)
- Deploy by importing the repo into Vercel — runs `npm install` + `npm run build` unmodified.

## Routes / Functional Entry Points
| Path | Description |
|------|-------------|
| `/` | Home — hero, featured categories, best sellers, store locations |
| `/shop` | Catalog with filters (category, origin, material, price) + sorting |
| `/shop?category=<slug>` | Pre-filtered catalog by category |
| `/shop/[id]` | Product detail — gallery, details, add to cart/favorites, related |
| `/articles` | Full catalog grouped by category |
| `/favorites` | Saved favorite products (localStorage) |
| `/cart` | Cart with quantity controls, remove, totals (localStorage) |
| `/contact` | Store addresses, hours, contact form (UI only) |
| `/EL-KSSAR/admin/1162026` | **Hidden** admin dashboard (not linked anywhere) |

## Admin Dashboard (hidden)
URL: `/EL-KSSAR/admin/1162026` — no links/buttons point to it anywhere.
Features (all local, persisted to localStorage):
- Products: create / edit / delete
- Inline price editing & inventory toggle (In Stock / Out of Stock)
- Featured toggle (controls homepage best sellers)
- Image path replace
- Categories: create / edit / delete
- "Réinitialiser" restores original mock data

## Data Architecture
- **Models**: `Product`, `Category`, `CartItem`, `StoreLocation` (`types/index.ts`)
- **Mock data**: `lib/products.ts`, `lib/categories.ts`, `lib/stores.ts`
- **State**: `StoreProvider` (React Context) for cart & favorites, persisted to `localStorage`
- **Admin persistence**: `localStorage` keys `elkssar_admin_products`, `elkssar_admin_categories`

## Design
- **Background**: pure white `#FFFFFF`
- **Navbar**: matches the logo background gray `#939393` exactly — logo merges in, no rectangle
- **Accents**: Antique Gold, Walnut Brown, Sand Beige, Warm Stone Gray, rust `#9a2e15` (logo)
- **Typography**: Cormorant Garamond (serif headings), Jost (body), Amiri (Arabic)
- **Language**: French-first with Arabic support
- No glassmorphism, blur, floating cards, popups, fake testimonials/stats — handcrafted luxury feel.

## Images
- Real uploaded product photos in `public/products/`
- AI-generated hero (`public/brand/hero.jpg`) inspired by uploaded furniture
- AI-generated crystal & porcelain category images

## Store Locations
- 📍 Sidi Achour — Nabeul
- 📍 Avenue Abou Dhabi, Kharouba — Hammamet
- 📍 Avenue 2 Mars 1934, Nabeul 8000
- Ouvert tous les jours jusqu'à 21h00

## Not Yet Implemented / Next Steps
- Real checkout / payment (currently routes to contact)
- Backend persistence for admin (currently localStorage only)
- Multi-image galleries per product (data supports it; most have 1 image)
- Full RTL Arabic layout toggle

_Last Updated: 2026-06-11_
