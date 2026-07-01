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

export async function loadQuestion(id: string): Promise<QuestionPayload | null> {
	const res = await fetch(`/question/${id}.json`);
	if (!res.ok) return null;
	return (await res.json()) as QuestionPayload;
}
