const STORAGE_KEY = 'dev-questions:pin';

export type Pin = {
	questionId: string;
	path: string;
	title: string;
	label: string;
	index: number;
};

// ponytail: localStorage only — no cross-device sync; upgrade path is account-backed API
export function getPin(): Pin | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as Pin;
		if (
			typeof parsed.questionId !== 'string' ||
			typeof parsed.path !== 'string' ||
			typeof parsed.title !== 'string'
		) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

function savePin(pin: Pin): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(pin));
}

export function clearPin(): void {
	localStorage.removeItem(STORAGE_KEY);
}

export function isPinned(id: string): boolean {
	return getPin()?.questionId === id;
}

/** Pin this question, or clear if already pinned. Returns true when pinned after toggle. */
export function togglePin(next: Pin): boolean {
	const cur = getPin();
	if (cur?.questionId === next.questionId) {
		clearPin();
		return false;
	}
	savePin(next);
	return true;
}

export function pinHref(pin: Pin): string {
	return `${pin.path}#${pin.questionId}`;
}
