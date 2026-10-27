## Project

Personal academic website (Astro, static output, deployed to GitHub Pages via `.github/workflows/deploy.yml`).

- Site-wide settings: `src/config.ts`
- Content collections: `src/content.config.ts` (blog, projects as Markdown; publications and news as YAML)
- Layout and shared styles: `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- No UI framework or CSS framework; keep it dependency-free unless there is a clear need.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles](https://docs.astro.build/en/guides/styling/)
