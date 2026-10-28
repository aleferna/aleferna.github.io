// Sitemap for search engines: every page of the site (listed in robots.txt).
import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { getPosts, getProjects } from '../lib/content';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const projects = await getProjects();
  const pages = [
    { path: '/' },
    { path: '/publications/' },
    { path: '/projects/' },
    { path: '/blog/' },
    { path: '/cv/' },
    ...projects.map((p) => ({ path: `/projects/${p.id}/` })),
    ...posts.map((p) => ({ path: `/blog/${p.id}/`, lastmod: (p.data.updated ?? p.data.date).toISOString().slice(0, 10) })),
  ];
  const urls = pages
    .map(({ path, lastmod }: { path: string; lastmod?: string }) =>
      `  <url><loc>${SITE.url}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
