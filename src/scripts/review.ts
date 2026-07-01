const STORAGE_KEY = 'dev-questions:review';
const DAY_MS = 24 * 60 * 60 * 1000;

export type ReviewRating = 'knew' | 'partial' | 'missed';

type ReviewItem = {
	due: number;
	intervalDays: number;
};

// ponytail: localStorage only — no cross-device sync; upgrade path is account-backed API
function loadAll(): Record<string, ReviewItem> {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw) as Record<string, ReviewItem>;
		return parsed && typeof parsed === 'object' ? parsed : {};
	} catch {
		return {};
	}
}

function saveAll(items: Record<string, ReviewItem>): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function dueCount(now = Date.now()): number {
	return Object.values(loadAll()).filter((item) => item.due <= now).length;
}

export function getDueIds(now = Date.now()): string[] {
	return Object.entries(loadAll())
		.filter(([, item]) => item.due <= now)
		.sort((a, b) => a[1].due - b[1].due)
		.map(([id]) => id);
}

export type ScheduledItem = { id: string; due: number; intervalDays: number };

export function getScheduledLater(now = Date.now()): ScheduledItem[] {
	return Object.entries(loadAll())
		.filter(([, item]) => item.due > now)
		.sort((a, b) => a[1].due - b[1].due)
		.map(([id, item]) => ({ id, due: item.due, intervalDays: item.intervalDays }));
}

/** Human label for a future due timestamp. */
export function dueDateLabel(due: number, now = Date.now()): string {
	const days = Math.ceil((due - now) / DAY_MS);
	if (days <= 1) return 'завтра';
	if (days < 7) return `через ${days} дн.`;
	return new Date(due).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
}

export function clearAllReviews(): void {
	localStorage.removeItem(STORAGE_KEY);
}

export function scheduleReview(id: string, rating: ReviewRating, now = Date.now()): void {
	const items = loadAll();
	const cur = items[id];
	let intervalDays: number;
	let due: number;

	switch (rating) {
		case 'knew':
			intervalDays = cur ? Math.min(cur.intervalDays * 2, 30) : 3;
			due = now + intervalDays * DAY_MS;
			break;
		case 'partial':
			intervalDays = cur ? Math.max(1, Math.floor(cur.intervalDays / 2)) : 1;
			due = now;
			break;
		case 'missed':
			intervalDays = 1;
			due = now;
			break;
	}

	items[id] = { due, intervalDays };
	saveAll(items);
}
