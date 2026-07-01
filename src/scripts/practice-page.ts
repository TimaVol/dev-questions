import { isFavorite, toggleFavorite } from './favorites.ts';
import { isPinned, togglePin, type Pin } from './pin.ts';
import { updatePinResumeUI } from './pin-resume.ts';
import { loadQuestion, type QuestionPayload } from './question-loader.ts';
import { clearAllReviews, dueDateLabel, getDueIds, getScheduledLater, scheduleReview, type ReviewRating } from './review.ts';
import { loadSearchIndex, type SearchItem } from './search-index.ts';

type Filters = {
	topic: string;
	grade: string;
	difficulty: string;
};

type Preset = 'quick' | 'focus' | 'review' | 'weak';

type Session = {
	preset: Preset;
	targetCount: number;
	durationMs: number | null;
	startedAt: number;
	deck: string[];
	ratings: Record<string, ReviewRating>;
	weakIds: string[];
	filters: Filters;
};

const SESSION_KEY = 'dev-questions:practice-session';
const WEAK_KEY = 'dev-questions:practice-weak';
const RECENT_KEY = 'dev-questions:practice-recent';
const RECENT_MAX = 8;

const QUICK_COUNT = 10;
const FOCUS_COUNT = 15;
const FOCUS_MS = 25 * 60 * 1000;

const SWIPE_MIN = 56;
const DRAG_START = 10;
const ANIM_MS = 340;

const setupEl = document.getElementById('practice-setup');
const sessionBar = document.getElementById('practice-session-bar');
const progressEl = document.getElementById('practice-progress');
const timerEl = document.getElementById('practice-timer');
const stopBtn = document.getElementById('practice-stop');
const stopConfirm = document.getElementById('practice-stop-confirm');
const stopYesBtn = document.getElementById('practice-stop-yes');
const stopNoBtn = document.getElementById('practice-stop-no');
const cardStage = document.getElementById('practice-card-stage');
const card = document.getElementById('practice-card');
const categoryEl = document.getElementById('practice-category');
const labelEl = document.getElementById('practice-label');
const badgeEl = document.getElementById('practice-badge');
const titleEl = document.getElementById('practice-title');
const answerEl = document.getElementById('practice-answer') as HTMLDetailsElement;
const bodyEl = document.getElementById('practice-body');
const pinBtn = document.getElementById('practice-pin') as HTMLButtonElement;
const favoriteBtn = document.getElementById('practice-favorite') as HTMLButtonElement;
const listLink = document.getElementById('practice-list-link') as HTMLAnchorElement;
const ratingEl = document.getElementById('practice-rating');
const tipsEl = document.getElementById('practice-tips');
const reviewBtn = document.getElementById('practice-review-btn') as HTMLButtonElement;
const queueLayer = document.getElementById('practice-queue-layer');
const queueEl = document.getElementById('practice-queue');
const queueBackdrop = document.getElementById('practice-queue-backdrop');
const queueOpenBtn = document.getElementById('practice-queue-open') as HTMLButtonElement;
const queueOpenSessionBtn = document.getElementById('practice-queue-open-session') as HTMLButtonElement;
const queueOpenMeta = document.getElementById('practice-queue-open-meta');
const queueCloseBtn = document.getElementById('practice-queue-close') as HTMLButtonElement;
const queueClearBtn = document.getElementById('practice-queue-clear') as HTMLButtonElement;
const queueClearConfirm = document.getElementById('practice-queue-clear-confirm');
const queueClearYesBtn = document.getElementById('practice-queue-clear-yes');
const queueClearNoBtn = document.getElementById('practice-queue-clear-no');
const queueTodayList = document.getElementById('practice-queue-today');
const queueTodayCount = document.getElementById('practice-queue-today-count');
const queueTodayEmpty = document.getElementById('practice-queue-today-empty');
const queueLaterWrap = document.getElementById('practice-queue-later');
const queueLaterCount = document.getElementById('practice-queue-later-count');
const queueLaterEmpty = document.getElementById('practice-queue-later-empty');
const topicSelect = document.getElementById('practice-topic') as HTMLSelectElement;
const gradeSelect = document.getElementById('practice-grade') as HTMLSelectElement;
const noticeEl = document.getElementById('practice-notice');
const noticeTitle = document.getElementById('practice-notice-title');
const noticeMessage = document.getElementById('practice-notice-message');
const noticeCloseBtn = document.getElementById('practice-notice-close');
const recapEl = document.getElementById('practice-recap');
const recapTitle = document.getElementById('practice-recap-title');
const recapSub = document.getElementById('practice-recap-sub');
const recapStats = document.getElementById('practice-recap-stats');
const recapWeakBtn = document.getElementById('practice-recap-weak');
const recapAgainBtn = document.getElementById('practice-recap-again');
const recapDismissBtn = document.getElementById('practice-recap-dismiss');
const reviewTitleEl = document.getElementById('practice-review-title');
const presetBtns = document.querySelectorAll<HTMLButtonElement>('[data-practice-preset]');
const resumeEl = document.getElementById('practice-resume');
const resumeMeta = document.getElementById('practice-resume-meta');
const resumeGoBtn = document.getElementById('practice-resume-go');
const resumeDiscardBtn = document.getElementById('practice-resume-discard');
const sessionLabelEl = document.getElementById('practice-session-label');
const practiceMain = document.querySelector('.practice-main');

const presetLabels: Record<Preset, string> = {
	quick: '10 питань',
	focus: 'Фокус 25 хв',
	review: 'Повтор',
	weak: 'Слабкі',
};

const gradeOptions: Record<string, { value: string; label: string }[]> = {
	all: [
		{ value: 'all', label: 'Усі рівні' },
		{ value: 'junior', label: 'Junior' },
		{ value: 'middle', label: 'Middle' },
		{ value: 'middle-senior', label: 'Middle/Senior' },
		{ value: 'senior', label: 'Senior' },
	],
	frontend: [
		{ value: 'all', label: 'Усі рівні' },
		{ value: 'junior', label: 'Junior' },
		{ value: 'middle', label: 'Middle' },
		{ value: 'senior', label: 'Senior' },
	],
	nodejs: [
		{ value: 'all', label: 'Усі рівні' },
		{ value: 'junior', label: 'Junior' },
		{ value: 'middle', label: 'Middle' },
		{ value: 'middle-senior', label: 'Middle/Senior' },
		{ value: 'senior', label: 'Senior' },
	],
};

const difficultyLabels: Record<string, string> = {
	easy: 'Легко',
	medium: 'Середньо',
	hard: 'Складно',
};

let allItems: SearchItem[] = [];
let difficulty = 'all';
let session: Session | null = null;
let currentId: string | null = null;
let currentPayload: QuestionPayload | null = null;
let swapping = false;
let timerId: ReturnType<typeof setInterval> | null = null;
let lastPreset: Preset = 'quick';
let indexReady = false;
let noticeTimer: ReturnType<typeof setTimeout> | null = null;
let pendingSession: Session | null = null;

let dragging = false;
let pointerId: number | null = null;
let touchStartX = 0;
let touchStartY = 0;
let dragDx = 0;

type ExitDir = 'left' | 'right';

function readFilters(): Filters {
	return {
		topic: topicSelect?.value ?? 'all',
		grade: gradeSelect?.value ?? 'all',
		difficulty,
	};
}

function matchesFilters(item: SearchItem, filters: Filters): boolean {
	if (filters.topic !== 'all' && item.topic !== filters.topic) return false;
	if (filters.grade !== 'all' && item.grade !== filters.grade) return false;
	if (filters.difficulty !== 'all' && item.difficulty !== filters.difficulty) return false;
	return true;
}

function filteredPool(filters: Filters, exclude = new Set<string>()): SearchItem[] {
	return allItems.filter((item) => matchesFilters(item, filters) && !exclude.has(item.id));
}

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function getRecent(): string[] {
	try {
		const raw = sessionStorage.getItem(RECENT_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? (parsed as string[]) : [];
	} catch {
		return [];
	}
}

function pushRecent(id: string): void {
	const recent = getRecent().filter((x) => x !== id);
	recent.unshift(id);
	sessionStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, RECENT_MAX)));
}

function loadSession(): Session | null {
	try {
		const raw = sessionStorage.getItem(SESSION_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as Session;
	} catch {
		return null;
	}
}

function saveSession(): void {
	if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
	else sessionStorage.removeItem(SESSION_KEY);
}

function loadWeakIds(): string[] {
	try {
		const raw = localStorage.getItem(WEAK_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? (parsed as string[]) : [];
	} catch {
		return [];
	}
}

function saveWeakIds(ids: string[]): void {
	if (ids.length) localStorage.setItem(WEAK_KEY, JSON.stringify(ids));
	else localStorage.removeItem(WEAK_KEY);
}

function syncGradeOptions(): void {
	const topic = topicSelect.value;
	const options = gradeOptions[topic] ?? gradeOptions.all;
	const prev = gradeSelect.value;
	gradeSelect.replaceChildren(
		...options.map((o) => {
			const opt = document.createElement('option');
			opt.value = o.value;
			opt.textContent = o.label;
			return opt;
		}),
	);
	if (options.some((o) => o.value === prev)) gradeSelect.value = prev;
	else gradeSelect.value = 'all';
}

function pluralQuestions(n: number): string {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return 'питання';
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'питання';
	return 'питань';
}

function dueInPool(): string[] {
	const ids = new Set(allItems.map((i) => i.id));
	return getDueIds().filter((id) => ids.has(id));
}

function weakInPool(weakIds: string[]): string[] {
	const ids = new Set(allItems.map((i) => i.id));
	return weakIds.filter((id) => ids.has(id));
}

function hideResumeBanner(): void {
	pendingSession = null;
	resumeEl?.setAttribute('hidden', '');
}

function showResumeBanner(saved: Session): void {
	const done = Object.keys(saved.ratings).length;
	if (saved.deck.length === 0) {
		sessionStorage.removeItem(SESSION_KEY);
		return;
	}
	pendingSession = saved;
	if (resumeMeta) {
		resumeMeta.textContent = `${done} з ${saved.targetCount} зроблено · ${saved.deck.length} ${pluralQuestions(saved.deck.length)} залишилось`;
	}
	resumeEl?.removeAttribute('hidden');
}

function discardPendingSession(): void {
	hideResumeBanner();
	sessionStorage.removeItem(SESSION_KEY);
}

function resumePendingSession(): void {
	if (!pendingSession) return;
	session = pendingSession;
	pendingSession = null;
	hideResumeBanner();
	lastPreset = session.preset;
	setUiMode('session');
	syncSessionBar();
	startTimer();
	void loadNextQuestion(false);
}

function hideStopConfirm(): void {
	stopConfirm?.setAttribute('hidden', '');
	stopBtn?.removeAttribute('hidden');
}

function showStopConfirm(): void {
	stopBtn?.setAttribute('hidden', '');
	stopConfirm?.removeAttribute('hidden');
}

function hideRecap(): void {
	recapEl?.setAttribute('hidden', '');
}

function hideNotice(): void {
	if (noticeTimer) clearTimeout(noticeTimer);
	noticeTimer = null;
	noticeEl?.setAttribute('hidden', '');
}

function showNotice(title: string, message: string): void {
	if (!noticeEl) return;
	if (noticeTitle) noticeTitle.textContent = title;
	if (noticeMessage) noticeMessage.textContent = message;
	noticeEl.removeAttribute('hidden');
	if (noticeTimer) clearTimeout(noticeTimer);
	noticeTimer = setTimeout(hideNotice, 8000);
}

function renderRecapStats(knew: number, done: number, weak: number, elapsed: string): void {
	if (!recapStats) return;
	recapStats.replaceChildren();
	const pills: [string, string][] = [
		[String(knew), 'знав'],
		[String(done), 'відповіли'],
		[elapsed, 'час'],
	];
	if (weak) pills.splice(2, 0, [String(weak), 'на повтор']);
	for (const [value, label] of pills) {
		const pill = document.createElement('div');
		pill.className = 'practice-recap__pill';
		pill.innerHTML = `<span class="practice-recap__pill-value">${value}</span><span class="practice-recap__pill-label">${label}</span>`;
		recapStats.append(pill);
	}
}

function showRecap(finished: boolean, knew: number, done: number, weak: number, elapsedMs: number): void {
	if (!recapEl || done === 0) return;
	if (recapTitle) {
		recapTitle.textContent = finished ? 'Готово' : 'Сесію зупинено';
	}
	if (recapSub) {
		recapSub.textContent = finished
			? 'Короткий підсумок — можна відпочити або продовжити.'
			: `Встигли ${done} ${pluralQuestions(done)} — повернись, коли будеш готовий.`;
	}
	renderRecapStats(knew, done, weak, formatDuration(elapsedMs));
	if (recapWeakBtn) {
		recapWeakBtn.hidden = weak === 0;
		recapWeakBtn.textContent = weak ? `Повторити слабкі (${weak})` : 'Повторити слабкі';
	}
	recapEl.removeAttribute('hidden');
	recapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setPresetsReady(ready: boolean): void {
	indexReady = ready;
	for (const btn of presetBtns) {
		if (btn.id === 'practice-review-btn' && btn.hidden) continue;
		btn.disabled = !ready;
	}
}

const QUEUE_LIST_MAX = 4;

function truncateTitle(title: string, max = 52): string {
	return title.length > max ? `${title.slice(0, max - 1)}…` : title;
}

function renderQueueList(ul: HTMLElement, ids: string[]): void {
	ul.replaceChildren();
	const shown = ids.slice(0, QUEUE_LIST_MAX);
	for (const id of shown) {
		const item = allItems.find((i) => i.id === id);
		const li = document.createElement('li');
		const link = document.createElement('a');
		link.className = 'practice-queue__link';
		link.href = item?.href ?? '#';
		link.textContent = truncateTitle(item?.title ?? id);
		li.append(link);
		ul.append(li);
	}
	if (ids.length > QUEUE_LIST_MAX) {
		const li = document.createElement('li');
		li.className = 'practice-queue__more';
		li.textContent = `+ ще ${ids.length - QUEUE_LIST_MAX}`;
		ul.append(li);
	}
}

function isQueueOpen(): boolean {
	return Boolean(queueLayer && !queueLayer.hasAttribute('hidden'));
}

function blockQueueScroll(e: Event): void {
	if (!(e.target instanceof Node) || !queueEl) {
		e.preventDefault();
		return;
	}
	if (queueEl.contains(e.target)) {
		if (e instanceof WheelEvent) {
			const { scrollTop, scrollHeight, clientHeight } = queueEl;
			const atTop = scrollTop <= 0;
			const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
			if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) e.preventDefault();
		}
		return;
	}
	e.preventDefault();
}

function openQueueModal(): void {
	if (!queueLayer || !queueLayer.hasAttribute('hidden')) return;
	queueLayer.removeAttribute('hidden');
	queueLayer.addEventListener('wheel', blockQueueScroll, { passive: false });
	queueLayer.addEventListener('touchmove', blockQueueScroll, { passive: false });
	document.querySelector('.layout')?.setAttribute('inert', '');
	queueCloseBtn?.focus();
}

function hideClearConfirm(): void {
	queueClearConfirm?.setAttribute('hidden', '');
	queueClearBtn?.removeAttribute('hidden');
}

function showClearConfirm(): void {
	queueClearBtn?.setAttribute('hidden', '');
	queueClearConfirm?.removeAttribute('hidden');
}

function closeQueueModal(): void {
	if (!queueLayer || queueLayer.hasAttribute('hidden')) return;
	queueLayer.setAttribute('hidden', '');
	queueLayer.removeEventListener('wheel', blockQueueScroll);
	queueLayer.removeEventListener('touchmove', blockQueueScroll);
	document.querySelector('.layout')?.removeAttribute('inert');
	hideClearConfirm();
}

function syncReviewQueueUI(): void {
	if (!queueEl || !indexReady) return;

	const now = Date.now();
	const dueIds = dueInPool();
	const later = getScheduledLater(now).filter((s) => allItems.some((i) => i.id === s.id));
	const total = dueIds.length + later.length;

	if (total === 0) {
		closeQueueModal();
		queueOpenBtn?.setAttribute('hidden', '');
		queueOpenSessionBtn?.setAttribute('hidden', '');
		syncDueHint();
		return;
	}

	queueOpenBtn?.removeAttribute('hidden');
	queueOpenSessionBtn?.removeAttribute('hidden');
	if (queueClearBtn) queueClearBtn.disabled = false;

	if (queueOpenMeta) {
		const parts: string[] = [];
		if (dueIds.length) parts.push(`${dueIds.length} сьогодні`);
		if (later.length) parts.push(`${later.length} пізніше`);
		queueOpenMeta.textContent = parts.length ? `· ${parts.join(', ')}` : '';
	}

	if (queueTodayCount) queueTodayCount.textContent = String(dueIds.length);
	if (queueLaterCount) queueLaterCount.textContent = String(later.length);

	if (queueTodayList && queueTodayEmpty) {
		if (dueIds.length) {
			queueTodayList.removeAttribute('hidden');
			queueTodayEmpty.setAttribute('hidden', '');
			renderQueueList(queueTodayList, dueIds);
		} else {
			queueTodayList.setAttribute('hidden', '');
			queueTodayEmpty.removeAttribute('hidden');
		}
	}

	if (queueLaterWrap && queueLaterEmpty) {
		if (later.length) {
			queueLaterWrap.removeAttribute('hidden');
			queueLaterEmpty.setAttribute('hidden', '');
			queueLaterWrap.replaceChildren();

			const buckets = new Map<string, string[]>();
			for (const entry of later) {
				const label = dueDateLabel(entry.due, now);
				const ids = buckets.get(label) ?? [];
				ids.push(entry.id);
				buckets.set(label, ids);
			}

			for (const [label, ids] of buckets) {
				const bucket = document.createElement('div');
				bucket.className = 'practice-queue__bucket';

				const head = document.createElement('div');
				head.className = 'practice-queue__bucket-head';
				const labelEl = document.createElement('span');
				labelEl.className = 'practice-queue__bucket-label';
				labelEl.textContent = label;
				const countEl = document.createElement('span');
				countEl.className = 'practice-queue__bucket-count';
				countEl.textContent = String(ids.length);
				head.append(labelEl, countEl);

				const ul = document.createElement('ul');
				ul.className = 'practice-queue__list practice-queue__list--nested';
				renderQueueList(ul, ids);

				bucket.append(head, ul);
				queueLaterWrap.append(bucket);
			}
		} else {
			queueLaterWrap.setAttribute('hidden', '');
			queueLaterEmpty.removeAttribute('hidden');
		}
	}

	syncDueHint();
}

function syncDueHint(): void {
	const due = indexReady ? dueInPool() : getDueIds();
	const n = due.length;
	if (!reviewBtn) return;
	if (n > 0) {
		reviewBtn.removeAttribute('hidden');
		reviewBtn.disabled = !indexReady;
		if (reviewTitleEl) reviewTitleEl.textContent = `Повторити (${n})`;
	} else {
		reviewBtn.setAttribute('hidden', '');
		if (reviewTitleEl) reviewTitleEl.textContent = 'Повторити';
	}
}

function buildDeck(preset: Preset, filters: Filters, weakIds: string[]): string[] {
	const exclude = new Set<string>();
	const deck: string[] = [];

	// ponytail: review/weak queues ignore filters — spaced repetition is personal, not filter-scoped
	if (preset === 'weak') {
		return shuffle(weakInPool(weakIds));
	}

	if (preset === 'review') {
		return dueInPool();
	}

	const target = preset === 'quick' ? QUICK_COUNT : FOCUS_COUNT;

	const due = getDueIds().filter((id) => {
		const item = allItems.find((i) => i.id === id);
		return item && matchesFilters(item, filters) && !exclude.has(id);
	});
	for (const id of due) {
		if (deck.length >= target) break;
		deck.push(id);
		exclude.add(id);
	}

	const recent = new Set(getRecent());
	const pool = filteredPool(filters, exclude);
	const skipRecent = pool.length > recent.size + 1;
	const candidates = skipRecent ? pool.filter((i) => !recent.has(i.id)) : pool;
	for (const item of shuffle(candidates.length ? candidates : pool)) {
		if (deck.length >= target) break;
		deck.push(item.id);
		exclude.add(item.id);
	}

	return deck;
}

function emptyDeckMessage(preset: Preset): { title: string; message: string } {
	if (preset === 'review') {
		return {
			title: 'Немає питань на повтор',
			message: 'Сьогодні нічого не заплановано. Пройди сесію і оціни відповіді — тоді зʼявиться черга на повтор.',
		};
	}
	if (preset === 'weak') {
		return {
			title: 'Немає слабких питань',
			message: 'Після сесії тут зʼявляться питання з оцінкою «Частково» або «Не знав».',
		};
	}
	return {
		title: 'Немає питань',
		message: 'За обраними фільтрами нічого не знайдено. Спробуй розширити тему, рівень або складність.',
	};
}

function sessionDoneCount(): number {
	return session ? Object.keys(session.ratings).length : 0;
}

function isTimeUp(): boolean {
	if (!session?.durationMs) return false;
	return Date.now() - session.startedAt >= session.durationMs;
}

function isSessionComplete(): boolean {
	if (!session) return true;
	if (session.deck.length === 0 && !currentId) return true;
	if (sessionDoneCount() >= session.targetCount) return true;
	if (isTimeUp()) return true;
	return false;
}

function formatTimer(ms: number): string {
	const total = Math.max(0, Math.ceil(ms / 1000));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDuration(ms: number): string {
	const mins = Math.round(ms / 60_000);
	if (mins < 1) return 'менше хвилини';
	return `${mins} хв`;
}

function syncSessionBar(): void {
	if (!session || !progressEl) return;
	if (sessionLabelEl) sessionLabelEl.textContent = presetLabels[session.preset];
	progressEl.textContent = `${sessionDoneCount()} / ${session.targetCount}`;

	if (timerEl) {
		if (session.durationMs) {
			timerEl.hidden = false;
			const left = session.durationMs - (Date.now() - session.startedAt);
			timerEl.textContent = formatTimer(left);
		} else {
			timerEl.hidden = true;
		}
	}
}

function startTimer(): void {
	stopTimer();
	if (!session?.durationMs) return;
	timerId = setInterval(() => {
		syncSessionBar();
		if (isTimeUp()) void endSession();
	}, 1000);
}

function stopTimer(): void {
	if (timerId) clearInterval(timerId);
	timerId = null;
}

function setUiMode(mode: 'setup' | 'session'): void {
	practiceMain?.classList.toggle('practice-main--session', mode === 'session');
	setupEl?.toggleAttribute('hidden', mode === 'session');
	sessionBar?.toggleAttribute('hidden', mode === 'setup');
	cardStage?.toggleAttribute('hidden', mode === 'setup');
	tipsEl?.toggleAttribute('hidden', mode === 'setup');
	if (mode === 'session') hideResumeBanner();
	syncRatingRow();
}

function syncRatingRow(): void {
	if (!ratingEl || !answerEl) return;
	const inSession = Boolean(session && currentId);
	if (!inSession) {
		ratingEl.setAttribute('hidden', '');
		ratingEl.classList.remove('practice-rating--locked');
		return;
	}

	ratingEl.removeAttribute('hidden');
	const unlocked = answerEl.open;
	ratingEl.classList.toggle('practice-rating--locked', !unlocked);

	const hint = ratingEl.querySelector<HTMLElement>('.practice-rating__hint');
	if (hint) {
		hint.textContent = unlocked
			? 'Знав — у «Пізніше»; частково / не знав — залишаться на сьогодні'
			: 'Спочатку відкрий відповідь (Space)';
	}

	for (const btn of ratingEl.querySelectorAll<HTMLButtonElement>('[data-rating]')) {
		btn.disabled = !unlocked;
	}
}

function syncFavoriteButton(): void {
	if (!favoriteBtn || !currentId) return;
	const on = isFavorite(currentId);
	favoriteBtn.classList.toggle('favorite-btn--on', on);
	favoriteBtn.setAttribute('aria-pressed', String(on));
	favoriteBtn.setAttribute('aria-label', on ? 'Прибрати з обраного' : 'Додати в обране');
	favoriteBtn.textContent = on ? '★' : '☆';
}

function syncPinButton(): void {
	if (!pinBtn || !currentId) return;
	const on = isPinned(currentId);
	pinBtn.classList.toggle('pin-btn--on', on);
	pinBtn.setAttribute('aria-pressed', String(on));
	pinBtn.setAttribute('aria-label', on ? 'Прибрати закладку' : 'Закріпити питання');
	pinBtn.textContent = on ? '📌' : '📍';
}

function readPin(): Pin | null {
	if (!currentPayload) return null;
	return {
		questionId: currentPayload.id,
		path: currentPayload.path,
		title: currentPayload.title,
		label: currentPayload.label,
		index: currentPayload.index,
	};
}

function renderPayload(data: QuestionPayload): void {
	if (!card || !categoryEl || !labelEl || !badgeEl || !titleEl || !bodyEl || !listLink) return;

	currentId = data.id;
	currentPayload = data;

	categoryEl.textContent = data.category;
	labelEl.textContent = data.label;
	badgeEl.textContent = difficultyLabels[data.difficulty] ?? data.difficulty;
	badgeEl.className = `badge badge--${data.difficulty}`;
	titleEl.textContent = data.title;
	bodyEl.innerHTML = data.html;
	listLink.href = data.href;
	answerEl.open = false;

	for (const a of bodyEl.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
		a.target = '_blank';
		a.rel = 'noopener noreferrer';
	}

	card.hidden = false;
	syncFavoriteButton();
	syncPinButton();
	syncRatingRow();
}

function resetCardMotion(): void {
	if (!card) return;
	card.classList.remove(
		'is-dragging',
		'random-card--out-left',
		'random-card--out-right',
		'random-card--from-left',
		'random-card--from-right',
	);
	card.style.removeProperty('transform');
	card.style.removeProperty('opacity');
}

function waitTransition(el: HTMLElement): Promise<void> {
	return new Promise((resolve) => {
		const finish = () => {
			el.removeEventListener('transitionend', onEnd);
			resolve();
		};
		const onEnd = (e: TransitionEvent) => {
			if (e.target === el && e.propertyName === 'transform') finish();
		};
		el.addEventListener('transitionend', onEnd);
		setTimeout(finish, ANIM_MS);
	});
}

async function playExit(dir: ExitDir): Promise<void> {
	if (!card) return;
	card.classList.remove('is-dragging');
	card.style.removeProperty('transform');
	card.style.removeProperty('opacity');
	const out = dir === 'left' ? 'random-card--out-left' : 'random-card--out-right';
	card.classList.add(out);
	await waitTransition(card);
}

async function playEnter(from: ExitDir): Promise<void> {
	if (!card) return;
	card.classList.remove('random-card--out-left', 'random-card--out-right');
	const cls = from === 'left' ? 'random-card--from-left' : 'random-card--from-right';
	card.classList.add(cls);
	void card.offsetWidth;
	card.classList.remove(cls);
	await waitTransition(card);
}

async function showQuestion(id: string, animate: boolean): Promise<boolean> {
	const motion = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (motion && card && !card.hidden) await playExit('left');

	const data = await loadQuestion(id);
	if (!data) return false;

	pushRecent(id);
	renderPayload(data);

	if (motion) await playEnter('right');
	resetCardMotion();
	return true;
}

async function loadNextQuestion(animate = true): Promise<void> {
	if (!session || swapping) return;

	currentId = null;
	currentPayload = null;

	const nextId = session.deck.shift();
	saveSession();

	if (!nextId) {
		await endSession();
		return;
	}

	swapping = true;
	try {
		const ok = await showQuestion(nextId, animate);
		if (!ok) await loadNextQuestion(false);
	} finally {
		swapping = false;
	}
}

function startSession(preset: Preset): void {
	hideRecap();
	hideNotice();
	hideStopConfirm();
	hideResumeBanner();
	closeQueueModal();

	if (!indexReady) {
		showNotice('Зачекайте', 'Питання ще завантажуються…');
		return;
	}

	const filters = readFilters();
	const weakIds = preset === 'weak' ? loadWeakIds() : [];
	const deck = buildDeck(preset, filters, weakIds);

	if (!deck.length) {
		const { title, message } = emptyDeckMessage(preset);
		showNotice(title, message);
		return;
	}

	const targetCount =
		preset === 'quick' ? QUICK_COUNT : preset === 'focus' ? FOCUS_COUNT : deck.length;

	session = {
		preset,
		targetCount,
		durationMs: preset === 'focus' ? FOCUS_MS : null,
		startedAt: Date.now(),
		deck,
		ratings: {},
		weakIds: [],
		filters,
	};

	lastPreset = preset;
	saveSession();
	setUiMode('session');
	syncSessionBar();
	startTimer();
	void loadNextQuestion(false);
}

async function rateCurrent(rating: ReviewRating): Promise<void> {
	if (!session || !currentId || swapping) return;

	scheduleReview(currentId, rating);
	session.ratings[currentId] = rating;
	if (rating === 'partial' || rating === 'missed') session.weakIds.push(currentId);
	if (rating === 'missed' && !isFavorite(currentId)) toggleFavorite(currentId);

	saveSession();
	syncSessionBar();
	syncReviewQueueUI();

	if (isSessionComplete()) {
		await endSession();
		return;
	}

	await loadNextQuestion();
}

async function endSession(stopped = false): Promise<void> {
	stopTimer();
	hideStopConfirm();
	if (!session) return;

	const done = sessionDoneCount();
	const knew = Object.values(session.ratings).filter((r) => r === 'knew').length;
	const weak = [...new Set(session.weakIds)].length;
	const elapsed = Date.now() - session.startedAt;
	const finished =
		!stopped && (session.deck.length === 0 || done >= session.targetCount || isTimeUp());

	saveWeakIds([...new Set(session.weakIds)]);

	const endedPreset = session.preset;
	session = null;
	currentId = null;
	currentPayload = null;
	saveSession();
	setUiMode('setup');
	card?.setAttribute('hidden', '');
	lastPreset = endedPreset === 'weak' ? 'quick' : endedPreset;

	if (done > 0) showRecap(finished, knew, done, weak, elapsed);
	else hideRecap();

	syncReviewQueueUI();
}

topicSelect.addEventListener('change', () => {
	syncGradeOptions();
	syncReviewQueueUI();
});

for (const chip of document.querySelectorAll<HTMLButtonElement>('[data-practice-difficulty]')) {
	chip.addEventListener('click', () => {
		for (const c of document.querySelectorAll<HTMLButtonElement>('[data-practice-difficulty]')) {
			c.classList.toggle('chip--active', c === chip);
		}
		difficulty = chip.dataset.practiceDifficulty ?? 'all';
		syncReviewQueueUI();
	});
}

for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-practice-preset]')) {
	btn.addEventListener('click', () => {
		startSession(btn.dataset.practicePreset as Preset);
	});
}

stopBtn?.addEventListener('click', () => showStopConfirm());
stopYesBtn?.addEventListener('click', () => void endSession(true));
stopNoBtn?.addEventListener('click', () => hideStopConfirm());

for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-rating]')) {
	btn.addEventListener('click', () => void rateCurrent(btn.dataset.rating as ReviewRating));
}

answerEl?.addEventListener('toggle', () => syncRatingRow());

favoriteBtn?.addEventListener('click', () => {
	if (!currentId) return;
	toggleFavorite(currentId);
	syncFavoriteButton();
});

pinBtn?.addEventListener('click', () => {
	const pin = readPin();
	if (!pin) return;
	togglePin(pin);
	syncPinButton();
	updatePinResumeUI();
});

recapWeakBtn?.addEventListener('click', () => {
	hideRecap();
	startSession('weak');
});

recapAgainBtn?.addEventListener('click', () => {
	hideRecap();
	startSession(lastPreset);
});

recapDismissBtn?.addEventListener('click', () => {
	hideRecap();
	syncReviewQueueUI();
});

queueOpenBtn?.addEventListener('click', () => openQueueModal());
queueOpenSessionBtn?.addEventListener('click', () => openQueueModal());
queueCloseBtn?.addEventListener('click', () => closeQueueModal());
queueBackdrop?.addEventListener('click', () => closeQueueModal());

queueClearBtn?.addEventListener('click', () => showClearConfirm());
queueClearYesBtn?.addEventListener('click', () => {
	clearAllReviews();
	hideClearConfirm();
	syncReviewQueueUI();
});
queueClearNoBtn?.addEventListener('click', () => hideClearConfirm());

document.addEventListener('keydown', (e) => {
	if (e.key !== 'Escape' || !isQueueOpen()) return;
	if (queueClearConfirm && !queueClearConfirm.hasAttribute('hidden')) {
		hideClearConfirm();
		return;
	}
	closeQueueModal();
});

resumeGoBtn?.addEventListener('click', () => resumePendingSession());
resumeDiscardBtn?.addEventListener('click', () => discardPendingSession());

noticeCloseBtn?.addEventListener('click', () => hideNotice());

document.addEventListener('keydown', (e) => {
	if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
	if (e.target instanceof HTMLSelectElement) return;
	if (!session) return;

	if (e.code === 'Space' && card && !card.hidden) {
		e.preventDefault();
		answerEl.open = !answerEl.open;
		syncRatingRow();
	}
	if (answerEl.open) {
		if (e.code === 'Digit1') {
			e.preventDefault();
			void rateCurrent('knew');
		}
		if (e.code === 'Digit2') {
			e.preventDefault();
			void rateCurrent('partial');
		}
		if (e.code === 'Digit3') {
			e.preventDefault();
			void rateCurrent('missed');
		}
	}
});

// ponytail: swipe only advances when answer is open; left=knew, right=partial
card?.addEventListener('pointerdown', (e: PointerEvent) => {
	if (!session || swapping || card.hidden || e.button !== 0) return;
	if ((e.target as Element).closest('button, a, summary')) return;
	pointerId = e.pointerId;
	touchStartX = e.clientX;
	touchStartY = e.clientY;
	dragDx = 0;
	dragging = false;
	card.setPointerCapture(e.pointerId);
});

card?.addEventListener('pointermove', (e: PointerEvent) => {
	if (pointerId !== e.pointerId || !session) return;
	const dx = e.clientX - touchStartX;
	const dy = e.clientY - touchStartY;
	if (!dragging) {
		if (Math.abs(dx) < DRAG_START || Math.abs(dx) < Math.abs(dy)) return;
		dragging = true;
		card?.classList.add('is-dragging');
	}
	dragDx = dx;
	if (dragging && card) {
		const rotate = dx * 0.045;
		const fade = 1 - Math.min(Math.abs(dx) / 280, 0.4);
		card.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
		card.style.opacity = String(fade);
		e.preventDefault();
	}
});

card?.addEventListener('pointerup', (e: PointerEvent) => {
	if (pointerId !== e.pointerId) return;
	card?.releasePointerCapture(e.pointerId);
	pointerId = null;
	if (!dragging) return;
	card?.classList.remove('is-dragging');
	if (Math.abs(dragDx) >= SWIPE_MIN && answerEl.open) {
		const rating: ReviewRating = dragDx < 0 ? 'knew' : 'partial';
		dragDx = 0;
		resetCardMotion();
		void rateCurrent(rating);
		return;
	}
	resetCardMotion();
	dragging = false;
	dragDx = 0;
});

syncGradeOptions();
syncDueHint();

loadSearchIndex().then((items) => {
	allItems = items;
	setPresetsReady(true);
	syncReviewQueueUI();
	const saved = loadSession();
	if (saved?.deck.length) showResumeBanner(saved);
});
