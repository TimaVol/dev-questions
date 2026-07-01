import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';

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

export type QuestionPayload = {
	id: string;
	title: string;
	topic: string;
	grade: string;
	category: string;
	difficulty: string;
	label: string;
	href: string;
	path: string;
	index: number;
	html: string;
};

export const getStaticPaths = (async () => {
	const questions = (await getCollection('questions')).sort(
		(a, b) =>
			a.data.topic.localeCompare(b.data.topic) ||
			a.data.grade.localeCompare(b.data.grade) ||
			a.data.order - b.data.order,
	);

	const indexByPath = new Map<string, number>();
	const container = await experimental_AstroContainer.create();

	return Promise.all(
		questions.map(async (entry) => {
			const path = `/${entry.data.topic}/${entry.data.grade}`;
			const index = (indexByPath.get(path) ?? 0) + 1;
			indexByPath.set(path, index);

			const { Content } = await render(entry);
			const html = await container.renderToString(Content);

			const data: QuestionPayload = {
				id: entry.id,
				title: entry.data.title,
				topic: entry.data.topic,
				grade: entry.data.grade,
				category: entry.data.category,
				difficulty: entry.data.difficulty,
				label: `${topicLabels[entry.data.topic]} · ${gradeLabels[entry.data.grade]}`,
				href: `${path}#${entry.id}`,
				path,
				index,
				html,
			};

			return { params: { id: entry.id }, props: { data } };
		}),
	);
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
	const { data } = props as { data: QuestionPayload };
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
	});
};
