export interface SearchItem {
	id: string;
	title: string;
	topic: string;
	grade: string;
	category: string;
	difficulty: string;
	label: string;
	href: string;
}

let index: SearchItem[] | null = null;

export async function loadSearchIndex(): Promise<SearchItem[]> {
	if (index) return index;
	const res = await fetch('/search-index.json');
	index = (await res.json()) as SearchItem[];
	return index;
}

export function filterSearchIndex(
	items: SearchItem[],
	query: string,
	difficulty: string,
): SearchItem[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];

	return items.filter((item) => {
		if (difficulty !== 'all' && item.difficulty !== difficulty) return false;
		const haystack = `${item.title} ${item.category}`.toLowerCase();
		return haystack.includes(q);
	});
}
