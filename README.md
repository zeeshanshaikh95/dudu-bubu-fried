# DUDU BUBU FRIED CHICKEN — Website

Late-night storefront for **DUDU BUBU FRIED CHICKEN** (@dudu_bubufried) — a fried chicken counter in
Miraroad, Thane. Primary conversion: browse → bag → **order on WhatsApp** (no payment gateway, by
design).

**Live preview:** https://zeeshanshaikh95.github.io/dudu-bubu-fried/ (GitHub Pages — static menu
snapshot, no admin; see [Hosting](#hosting--live-url)).

Built to the same architecture as the client's earlier Glow by Parveen, Haya Nur and Team BlackSwan
sites (React SPA + Express API + MongoDB, protected admin panel), with a completely different design
system and a new full-bleed hero slider.

> **Data policy:** the brand name, handle, delivery number, opening hours, location and cuisine lanes
> come from her own public Instagram bio (`Arabian · Korean · Turkish`, `Boba · Mojito · Shakes`,
> `8356915574`, `4 PM to 12 AM`, `Miraroad, Thane`). Menu items are built from the dishes visible in
> her posts. **Her feed publishes no prices**, so every price is blank and the site shows
> "Ask for price" — set real rates in Admin → Dishes once she shares them.

## Hosting / live URL

| Environment | URL | What works |
| GitHub Pages (live) | https://zeeshanshaikh95.github.io/dudu-bubu-fried/ | Browsing, sections, dish pages, bag, WhatsApp ordering |
| Local (`npm run dev`) | http://localhost:5173 | Everything, including `/admin` and analytics |

Pages is static, so it cannot run the Express API. The Pages build reads a committed snapshot of the
menu (`client/public/demo/catalogue.json`, enabled by `VITE_DEMO_CATALOGUE=true`). Regenerate it
after changing menu content:

```shell
npm run dev:server          # in one terminal
npm run demo:catalogue      # writes the snapshot
```

Consequences of the static preview: the admin panel has no API behind it, and review/analytics writes
are skipped. To run it as a real shop, host the API and set the `VITE_API_URL` repository variable
plus `VITE_DEMO_CATALOGUE=false` — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Tech stack

| Layer | Technology |
| Frontend | React 18 + Vite 6 + TypeScript, Tailwind CSS 3, React Router 6, react-helmet-async |
| Backend | Node + Express 4 + TypeScript, Zod validation |
| Database | MongoDB + Mongoose 8 (Atlas in production; a bundled local mongod for dev) |
| Auth | JWT bearer tokens + bcrypt (12 rounds), protected `/api/admin/*` |
| Security | Helmet, CORS allow-list, rate limiting, Zod validation, secrets via env |
| Media | Multer uploads served from `/uploads` (swap in Cloudinary/S3 when the volume grows) |
| Hosting | Static SPA build + Node API + MongoDB Atlas |

## Design system

* **Palette** — warm menu-paper cream (`#F7EFE1`), cocoa-black ink (`#1A1512`), chilli red
  (`#DE3A1F`) and fried gold (`#F5C86A`). A faint dot grid on the page reads like printed takeaway
  paper.
* **Type** — **Anton** for heavy condensed caps with tight leading, **DM Sans** for body copy,
  **Space Mono** for numbers and the hours.
* **Hero** — a full-bleed slider with a vertical numbered rail, autoplay progress bars, pill arrows
  and a chilli-red marquee ticker (hours · area · cuisines · number). Slides are editable in
  Admin → Settings.
* **Details** — sticker price plates with hard offset shadows, `ORDER THIS` underlines and dark ink
  bands, so it never reads as a recoloured version of the earlier serif storefronts.
* **Logo** — the brand's own Instagram emblem, untouched, at `client/public/brand/logo.jpg`.

## Structure

```
├── client/                  React SPA
│   ├── public/              images, brand logo, favicon, robots.txt, sitemap.xml
│   └── src/
│       ├── admin/           Protected admin panel (lazy-loaded bundle)
│       ├── api/             Typed API client + endpoint map
│       ├── components/      HeroSlider, ProductCard, MiniCart, Wordmark, layout…
│       ├── context/         Cart / Settings / Toast providers
│       ├── hooks/           useApi, usePageView
│       ├── lib/             WhatsApp builder, analytics, formatting, brand assets
│       └── pages/           Public pages
├── server/
│   └── src/
│       ├── config/          Env config + Mongo connection
│       ├── controllers/     Public + admin handlers
│       ├── middleware/      Auth, errors, rate limits, uploads
│       ├── models/          Mongoose schemas
│       ├── routes/          /api and /api/admin routers
│       ├── seed/            Bootstrap (admin + settings) and starter menu
│       ├── services/        Settings singleton
│       ├── utils/           asyncHandler, slugify
│       └── validation/      Zod schemas for every write
└── .env.example
```

## Quick start

Prerequisites: Node 20+.

```shell
npm install

# 1 — configure the API
cp .env.example server/.env        # then edit JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 2 — local database (downloads a mongod binary on first run, persists in server/.data/mongo)
npm run dev:db

# 3 — in a second terminal: bootstrap admin + settings + starter menu
npm run seed

# 4 — run the API and the client
npm run dev
# Client: http://localhost:5173     API: http://localhost:4000/api/health
```

`npm run dev:all` runs the database, API and client together.

**Admin panel:** http://localhost:5173/admin — sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from
`server/.env`. A freshly bootstrapped account must choose a new password before the panel opens.

## Admin panel

* **Overview** — 7/30/90-day page views, dish views, cart adds, order messages, top dishes,
  referrers, plus a warning when no WhatsApp number is configured.
* **Dishes** — full CRUD, multi-image upload/reorder, portion or option variants with per-option
  price and stock, new / most-ordered / featured flags, archive & restore, SEO fields, display order.
* **Sections** — the menu sections (Fried Chicken, Burgers & Wraps, Sides & Fries, Shakes & Boba),
  with reordering and live dish counts. Deleting a section keeps its dishes.
* **Reviews** — add, edit, approve, hide, delete. Only approved reviews reach the shop.
* **Feed** — images for the homepage strip and the feed page, with captions and links.
* **Settings** — identity, WhatsApp number, **hero slider slides**, announcements, kitchen story,
  order message templates, delivery and returns copy.
* **Security** — forced first-login password change, 10 login attempts / 15 min, JWT re-validated
  against the database on every request, Zod validation on all writes.

## Ordering behaviour

* Every order button builds a `wa.me` link to **+91 83569 15574** (the delivery number in her bio)
  with a pre-filled message: dishes, portions, quantities and estimated total.
* If the number is cleared in Settings, order buttons fall back to Instagram DMs so the shop is never
  a dead end — the admin dashboard flags it until the number is set.
* Prices are nullable end to end: blank means "Ask for price", never ₹0.

## Brand assets & photography

* **Logo** — her Instagram emblem at `client/public/brand/logo.jpg`, shown as a circle and never
  recoloured or stretched. Instagram only serves the avatar at 150×150 publicly, so ask her for a
  larger file before any print use.
* **Food photography** — the twelve images in `client/public/images/` are generated placeholders in
  the house palette, made for this build because Instagram does not serve its media to logged-out
  requests. Replace them with her own dish photographs (or upload through Admin → Dishes) before
  launch.

## Scripts

| Command | Purpose |
| `npm run dev` | API + client together |
| `npm run dev:all` | Database + API + client in one terminal |
| `npm run dev:db` | Local dev MongoDB (persists in `server/.data/mongo`) |
| `npm run seed` | Bootstrap admin + settings, add the starter menu if empty |
| `npm run seed:reset` | Wipe catalogue records and re-create them |
| `npm run build` | Typecheck + build both workspaces |
| `npm run typecheck` | TypeScript project-wide |
| `npm run demo:catalogue` | Write the static snapshot used by the Pages build |

## Environment variables

| Variable | Purpose |
| `PORT` | API port (4000) |
| `MONGODB_URI` | Mongo connection string |
| `JWT_SECRET` | Long random string for signing admin JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (12h) |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |
| `PUBLIC_SITE_URL` / `PUBLIC_API_URL` | Canonical URLs |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account (seed only) |
| `UPLOAD_MAX_BYTES` / `UPLOAD_MAX_FILES` | Upload limits |

Client (optional): `VITE_API_URL`, `VITE_PUBLIC_SITE_URL`, `VITE_DEMO_CATALOGUE`, `VITE_BASE`.

## Roadmap to production

1. Ask her for dish photographs and a high-resolution logo.
2. Publish real prices (or leave "Ask for price") and confirm the delivery radius in Admin → Settings.
3. Add approved reviews as they come in.
4. Set `JWT_SECRET`, a strong admin password and `CORS_ORIGINS` on the host; deploy the SPA build and
   API, and point MongoDB at Atlas.
