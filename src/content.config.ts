import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'completed', 'archived']).default('active'),
    tags: z.array(z.string()).default([]),
    repo: z.string().optional(),
    url: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: file('src/content/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    type: z.enum(['journal', 'conference', 'preprint', 'thesis', 'other']).default('journal'),
    featured: z.boolean().default(false),
    note: z.string().optional(),
    links: z
      .object({
        pdf: z.string().optional(),
        doi: z.string().optional(),
        arxiv: z.string().optional(),
        code: z.string().optional(),
        slides: z.string().optional(),
      })
      .default({}),
  }),
});

const news = defineCollection({
  loader: file('src/content/news.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
  }),
});

export const collections = { blog, projects, publications, news };
