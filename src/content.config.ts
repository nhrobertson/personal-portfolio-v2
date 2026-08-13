import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.string(),
    dateEnd: z.string().default('present'),
    stack: z.array(z.string()),
    summary: z.string(),
    outcomes: z.array(z.string()),
    order: z.number(),
    link: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'complete', 'archived']),
    dateStart: z.string(),
    dateEnd: z.string().optional(),
    stack: z.array(z.string()),
    summary: z.string(),
    github: z.string().url(),
    order: z.number(),
  }),
});

export const collections = { work, projects };
