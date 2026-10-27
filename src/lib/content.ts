import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function getPublications() {
  const pubs = await getCollection('publications');
  return pubs.sort((a, b) => b.data.year - a.data.year);
}

export async function getNews() {
  const news = await getCollection('news');
  return news.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
