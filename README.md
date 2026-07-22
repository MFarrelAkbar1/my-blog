# Muhammad Farrel Akbar — Personal Website & Blog

A personal branding website and blog system built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Supabase**. Dark-themed, developer-aesthetic portfolio featuring a block-based article editor and protected admin dashboard.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Backend / Database | Supabase (PostgreSQL, Auth, Storage) |
| Deployment | Vercel |
| Icons | Lucide React |
| Fonts | Sora + JetBrains Mono |

---

## Features

### Public
- **Home Page** — Hero section with typing animation, tech stack cards, portfolio projects, and latest articles
- **Blog Listing** — Server-rendered grid of published articles with excerpts
- **Single Article** — Block-based content rendering (text + image blocks with alignment support)
- **404 Page** — Custom not-found page for missing routes

### Admin (protected)
- **Login** — Supabase Auth email/password sign-in
- **Dashboard** — List all articles (draft + published) with edit and delete actions
- **Article Editor** — Block-based editor to create and edit articles:
  - Text blocks with alignment (left / center / right / justify)
  - Image blocks with Supabase Storage upload and preview
  - Drag-free reordering via up/down controls
  - Auto-slug generation from title
  - Draft / Published status toggle

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata, Navbar, Footer)
│   ├── page.tsx                      # Home page
│   ├── not-found.tsx                 # Global 404 page
│   ├── blog/
│   │   ├── page.tsx                  # Blog listing (SSR, published articles)
│   │   └── [slug]/page.tsx           # Single article page
│   └── admin/
│       ├── login/page.tsx            # Admin login form
│       └── dashboard/
│           ├── layout.tsx            # Protected layout (auth check)
│           ├── page.tsx              # Dashboard — article list
│           └── editor/
│               ├── page.tsx          # Create new article
│               └── [id]/page.tsx     # Edit existing article
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   └── LatestArticles.tsx
│   ├── blog/
│   │   ├── ArticleCard.tsx
│   │   └── BlockRenderer.tsx         # Renders text/image blocks
│   ├── admin/
│   │   ├── ArticleForm.tsx
│   │   ├── BlockEditor.tsx
│   │   ├── TextBlock.tsx
│   │   └── ImageBlock.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser Supabase client
│   │   ├── server.ts                 # Server-side Supabase client (SSR)
│   │   └── middleware.ts             # Auth middleware helper
│   └── types.ts                      # Article, ArticleBlock, ArticleWithBlocks types
└── middleware.ts                     # Protects /admin/dashboard routes
```

---

## Database Schema

### `public.articles`

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | `gen_random_uuid()` |
| title | TEXT | Required |
| slug | TEXT | Unique |
| status | TEXT | `'draft'` or `'published'` |
| published_at | TIMESTAMPTZ | Nullable |
| created_at | TIMESTAMPTZ | `now()` |
| updated_at | TIMESTAMPTZ | Auto-updated via trigger |
| author_id | UUID | References `auth.users(id)` |

### `public.article_blocks`

| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | `gen_random_uuid()` |
| article_id | UUID (FK) | `articles(id)` ON DELETE CASCADE |
| type | TEXT | `'text'` or `'image'` |
| content | TEXT | For text blocks |
| image_url | TEXT | Supabase Storage public URL |
| alignment | TEXT | `'left'`, `'center'`, `'right'`, `'justify'` |
| sort_order | INTEGER | Block ordering within an article |
| created_at | TIMESTAMPTZ | `now()` |

### Storage Bucket: `article-images`
- Public read access
- Authenticated users can upload and delete

### RLS Policies
- **Public (anon)**: Read-only access to published articles and their blocks
- **Authenticated**: Full CRUD on articles, blocks, and storage

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with the tables and storage bucket set up (see schema above)

### 1. Clone the repository

```bash
git clone https://github.com/MFarrelAkbar1/my-blog.git
cd my-blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Find these values in your Supabase project under **Settings → API**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

This project is deployed on **Vercel**.

1. Push to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings
4. Deploy

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Admin Access

The admin panel is not linked anywhere in the public navigation. Access it directly at:

```
/admin/login
```

Sign in with the email and password registered in your Supabase Auth dashboard.

---

## Design

- Dark background (`#0a0a0a`) with **emerald green** accent (`#10b981`)
- **Sora** for UI text, **JetBrains Mono** for code and headings
- Mobile-first responsive layout
- Terminal/hacker aesthetic meets clean professional design

---

## Author

**Muhammad Farrel Akbar**
TypeScript Developer | PHP Web Developer | Security Analyst

- GitHub: [github.com/MFarrelAkbar1](https://github.com/MFarrelAkbar1)
- LinkedIn: [linkedin.com/in/muhammad-farrel-akbar-96274824b](https://www.linkedin.com/in/muhammad-farrel-akbar-96274824b/)
