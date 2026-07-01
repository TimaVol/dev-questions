export const PRACTICE_SESSION_KEY = 'dev-questions:practice-session';

export type PracticeSession = {
	preset: string;
	targetCount: number;
	durationMs: number | null;
	startedAt: number;
	deck: string[];
	ratings: Record<string, string>;
	weakIds: string[];
	filters: { topic: string; grade: string; difficulty: string };
};

export function pluralQuestions(n: number): string {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return 'питання';
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'питання';
	return 'питань';
}

export function loadPracticeSession(): PracticeSession | null {
	try {
		const raw = sessionStorage.getItem(PRACTICE_SESSION_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as PracticeSession;
	} catch {
		return null;
	}
}

export function getPendingPracticeSession(): PracticeSession | null {
	const saved = loadPracticeSession();
	if (!saved?.deck.length) return null;
	return saved;
}

export function practiceSessionResumeMeta(session: PracticeSession): string {
	const done = Object.keys(session.ratings).length;
	return `${done} з ${session.targetCount} зроблено · ${session.deck.length} ${pluralQuestions(session.deck.length)} залишилось`;
}
