import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

const gradeLabels: Record<string, string> = {
	junior: 'Junior',
	middle: 'Middle',
	senior: 'Senior',
	'middle-senior': 'Middle/Senior',
};

const topicLabels: Record<string, string> = {
	frontend: 'Frontend',
	nodejs: 'Node.js',
};

export const GET: APIRoute = async () => {
	const questions = (await getCollection('questions')).sort(
		(a, b) =>
			a.data.topic.localeCompare(b.data.topic) ||
			a.data.grade.localeCompare(b.data.grade) ||
			a.data.order - b.data.order,
	);

	const index = questions.map((q) => ({
		id: q.id,
		title: q.data.title,
		topic: q.data.topic,
		grade: q.data.grade,
		category: q.data.category,
		difficulty: q.data.difficulty,
		label: `${topicLabels[q.data.topic]} · ${gradeLabels[q.data.grade]}`,
		href: `/${q.data.topic}/${q.data.grade}#${q.id}`,
	}));

	return new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json' },
	});
};
