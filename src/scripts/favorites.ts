const STORAGE_KEY = 'dev-questions:favorites';

// ponytail: localStorage only — no cross-device sync; upgrade path is account-backed API
export function getFavoriteIds(): Set<string> {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return new Set();
		const parsed = JSON.parse(raw);
		return new Set(Array.isArray(parsed) ? (parsed as string[]) : []);
	} catch {
		return new Set();
	}
}

function saveFavoriteIds(ids: Set<string>): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function isFavorite(id: string): boolean {
	return getFavoriteIds().has(id);
}

export function toggleFavorite(id: string): boolean {
	const ids = getFavoriteIds();
	const next = !ids.has(id);
	if (next) ids.add(id);
	else ids.delete(id);
	saveFavoriteIds(ids);
	return next;
}

export function favoriteCount(): number {
	return getFavoriteIds().size;
}
