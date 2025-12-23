import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const photos = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    category: z.string().optional(),
  }),
});

const videos = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    youtubeId: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    thumbnail: z.string().optional(),
  }),
});

const music = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    artist: z.string().default('Aurelian Epuraș'),
    album: z.string().optional(),
    audioUrl: z.string(),
    coverArt: z.string().optional(),
    duration: z.string().optional(),
    year: z.number().optional(),
  }),
});

export const collections = { blog, photos, videos, music };
