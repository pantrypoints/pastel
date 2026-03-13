# 🥘 Pantrypoints

git remote add origin https://github.com/pantrypoints/pastel.git


**The Moneyless Economy Platform** — A SvelteKit web app for communities to exchange goods and services through a points-based barter system.

## Features

- 🏠 **Landing Page** — Hero with animated blobs, stats, feature highlights, registration form
- 📱 **Apps Section** — Browse the Pantrypoints ecosystem with filterable cards, each linking to a detailed showcase page (e.g. `/apps/pantrypreneur/farm`)
- 📰 **News Section** — Markdown-rendered articles with tags, search, and related articles
- 🔐 **Admin Section** — Password-protected dashboard to view/export all registrations
- 🌐 **i18n** — English + Chinese (中文) language support
- 🌙 **Light/Dark Mode** — Persisted via localStorage
- 🔍 **Global Search** — Searches both apps and news by title/description
- 💾 **Turso DB** — Registrations stored in Turso (libSQL) cloud database
- ☁️ **Cloudflare Pages** — Adapter configured and ready

## Tech Stack

- **SvelteKit** + Svelte 4
- **TailwindCSS** — Pastel blue/green/red/yellow theme
- **Lucide Svelte** — Icons
- **marked** — Markdown rendering
- **@libsql/client** — Turso database client
- **@sveltejs/adapter-cloudflare** — Cloudflare Pages deployment

## Quick Start

```bash
npm install
npm run dev
```

## Environment Variables

Set these in `.env` for local dev or in Cloudflare Pages dashboard for production:

```env
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-token-here
ADMIN_PASSWORD=your-admin-password
```

> **Note:** If `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` are not set, the registration form will still work in dev mode (logs to console). The admin section requires a real database.

## Setting up Turso

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Create a database
turso db create pantrypoints

# Get the URL and token
turso db show pantrypoints --url
turso db tokens create pantrypoints
```

The `registrations` table is auto-created on first request.

## Cloudflare Pages Deployment

1. Push to GitHub
2. In Cloudflare Pages: **Create project** → connect your repo
3. Build settings:
   - **Framework preset:** SvelteKit
   - **Build command:** `npm run build`
   - **Build output:** `.svelte-kit/cloudflare`
4. Add environment variables in **Settings → Environment Variables**:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `ADMIN_PASSWORD`

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Nav.svelte          # Navbar with search, lang, theme
│   │   ├── Footer.svelte
│   │   ├── AppCard.svelte      # App grid card
│   │   ├── NewsCard.svelte     # News grid card
│   │   └── RegistrationForm.svelte
│   ├── data/
│   │   ├── apps.ts             # App definitions
│   │   └── news.ts             # News articles (markdown content)
│   ├── i18n/
│   │   ├── en.ts               # English strings
│   │   ├── zh.ts               # Chinese strings
│   │   └── index.ts            # i18n store
│   ├── stores/
│   │   └── theme.ts            # Dark/light theme store
│   └── db.ts                   # Turso DB helpers
├── routes/
│   ├── +layout.svelte          # Root layout (Nav + Footer)
│   ├── +page.svelte            # Home / Landing
│   ├── apps/
│   │   ├── +page.svelte        # Apps index
│   │   └── [category]/[slug]/  # App showcase pages
│   ├── news/
│   │   ├── +page.svelte        # News index
│   │   └── [slug]/             # Article detail
│   ├── admin/
│   │   ├── +page.svelte        # Admin dashboard
│   │   └── +page.server.ts     # Server-side data load
│   └── api/
│       ├── register/           # POST /api/register
│       └── admin/
│           ├── login/          # POST /api/admin/login
│           └── logout/         # POST /api/admin/logout
└── app.css                     # Global Tailwind styles
```

## Admin Access

Navigate to `/admin` and enter the password set in `ADMIN_PASSWORD` (default for dev: `admin123`).

Features:
- View all registrations in a searchable table
- See interest breakdown stats
- Export to CSV

## Adding Apps

Edit `src/lib/data/apps.ts` — add a new object to the `apps` array. The route `/apps/{category}/{slug}` is auto-generated.

## Adding News

Edit `src/lib/data/news.ts` — add a new article with Markdown in the `content` field. The route `/news/{slug}` is auto-generated.

## License

MIT
