# aleferna.github.io

Personal academic website built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Editing content

| What | Where |
| :--- | :--- |
| Name, role, affiliation, email, social links | `src/config.ts` |
| Home page bio | `src/pages/index.astro` |
| Publications | `src/content/publications.yaml` |
| Projects (one Markdown file each) | `src/content/projects/` |
| Blog posts (one Markdown file each) | `src/content/blog/` |
| CV | replace `public/CV.pdf` (the CV page embeds it and links a download) |
| Profile photo | put it in `public/` and set `avatar` in `src/config.ts` |
| Colours and fonts | `src/styles/global.css` |

Blog posts with `draft: true` show up locally but are not published.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the site to `./dist/` |
| `npm run preview` | Preview the build locally |

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to
<https://aleferna.github.io>. In the repository settings, under **Settings → Pages → Build and deployment**,
set **Source** to **GitHub Actions** (one-time setup).
