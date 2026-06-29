import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const questions = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
	schema: z.object({
		title: z.string(),
		topic: z.enum(['frontend', 'nodejs']),
		grade: z.enum(['junior', 'middle', 'senior', 'middle-senior']),
		category: z.string(),
		order: z.number(),
		difficulty: z.enum(['easy', 'medium', 'hard']),
	}),
});

export const collections = { questions };
