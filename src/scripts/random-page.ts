import { isFavorite, toggleFavorite } from './favorites.ts';
import { isPinned, togglePin, type Pin } from './pin.ts';
import { updatePinResumeUI } from './pin-resume.ts';
import { loadSearchIndex, type SearchItem } from './search-index.ts';

type QuestionPayload = {
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

const RECENT_KEY = 'dev-questions:random-recent';
const AUTO_OPEN_KEY = 'dev-questions:random-auto-open';
const RECENT_MAX = 5;
const SWIPE_MIN = 56;
const DRAG_START = 10;
const ANIM_MS = 340;
const DOUBLE_TAP_MS = 400;
const DOUBLE_TAP_PX = 24;
const coarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)');

function textSelectAllowed(): boolean {
	return !coarsePointer.matches;
}

const topicSelect = document.getElementById('random-topic') as HTMLSelectElement;
const gradeSelect = document.getElementById('random-grade') as HTMLSelectElement;
const statusEl = document.getElementById('random-status');
const card = document.getElementById('random-card');
const categoryEl = document.getElementById('random-category');
const labelEl = document.getElementById('random-label');
const badgeEl = document.getElementById('random-badge');
const titleEl = document.getElementById('random-title');
const answerEl = document.getElementById('random-answer') as HTMLDetailsElement;
const bodyEl = document.getElementById('random-body');
const swapBtn = document.getElementById('random-swap');
const pinBtn = document.getElementById('random-pin') as HTMLButtonElement;
const favoriteBtn = document.getElementById('random-favorite') as HTMLButtonElement;
const listLink = document.getElementById('random-list-link') as HTMLAnchorElement;
const autoOpenBtn = document.getElementById('random-auto-open') as HTMLButtonElement;

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
let currentId: string | null = null;
let currentPayload: QuestionPayload | null = null;
let swapping = false;
let dragging = false;
let pointerId: number | null = null;
let touchStartX = 0;
let touchStartY = 0;
let dragDx = 0;
let textSwipeOnly = false;
let lastTextTapAt = 0;
let lastTextTapX = 0;
let lastTextTapY = 0;

type ExitDir = 'left' | 'right';

function getAutoOpen(): boolean {
	return localStorage.getItem(AUTO_OPEN_KEY) === '1';
}

function setAutoOpen(on: boolean): void {
	localStorage.setItem(AUTO_OPEN_KEY, on ? '1' : '0');
}

function syncAutoOpenBtn(): void {
	if (!autoOpenBtn) return;
	const on = getAutoOpen();
	autoOpenBtn.classList.toggle('chip--active', on);
	autoOpenBtn.setAttribute('aria-pressed', String(on));
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

function countFiltered(): number {
	const topic = topicSelect.value;
	const grade = gradeSelect.value;
	return allItems.filter((item) => {
		if (topic !== 'all' && item.topic !== topic) return false;
		if (grade !== 'all' && item.grade !== grade) return false;
		if (difficulty !== 'all' && item.difficulty !== difficulty) return false;
		return true;
	}).length;
}

function filteredPool(): SearchItem[] {
	const topic = topicSelect.value;
	const grade = gradeSelect.value;
	const recent = new Set(getRecent());
	const total = countFiltered();
	const skipRecent = total > recent.size + 1;

	return allItems.filter((item) => {
		if (topic !== 'all' && item.topic !== topic) return false;
		if (grade !== 'all' && item.grade !== grade) return false;
		if (difficulty !== 'all' && item.difficulty !== difficulty) return false;
		if (item.id === currentId) return false;
		if (skipRecent && recent.has(item.id)) return false;
		return true;
	});
}

function pickRandom(pool: SearchItem[]): SearchItem | null {
	if (!pool.length) {
		const topic = topicSelect.value;
		const grade = gradeSelect.value;
		const fallback = allItems.filter((item) => {
			if (topic !== 'all' && item.topic !== topic) return false;
			if (grade !== 'all' && item.grade !== grade) return false;
			if (difficulty !== 'all' && item.difficulty !== difficulty) return false;
			return item.id !== currentId;
		});
		if (!fallback.length) return null;
		return fallback[Math.floor(Math.random() * fallback.length)];
	}
	return pool[Math.floor(Math.random() * pool.length)];
}

function enterFrom(exit: ExitDir): ExitDir {
	return exit === 'left' ? 'right' : 'left';
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

function setDragTransform(dx: number): void {
	if (!card) return;
	const rotate = dx * 0.045;
	const fade = 1 - Math.min(Math.abs(dx) / 280, 0.4);
	card.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
	card.style.opacity = String(fade);
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

async function playExitFromDrag(dir: ExitDir, dx: number): Promise<void> {
	if (!card) return;
	card.classList.remove('is-dragging');
	const fade = 1 - Math.min(Math.abs(dx) / 280, 0.4);
	const sign = dir === 'left' ? -1 : 1;
	const anim = card.animate(
		[
			{ transform: `translateX(${dx}px) rotate(${dx * 0.045}deg)`, opacity: String(fade) },
			{ transform: `translateX(${sign * 115}%) rotate(${sign * 5}deg)`, opacity: '0' },
		],
		{ duration: 280, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' },
	);
	await anim.finished;
	anim.cancel();
	card.style.removeProperty('transform');
	card.style.removeProperty('opacity');
	card.classList.add(dir === 'left' ? 'random-card--out-left' : 'random-card--out-right');
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

function isInteractiveTarget(target: EventTarget | null): boolean {
	return Boolean((target as Element | null)?.closest('button, a, summary, select, input, textarea'));
}

function isTextTarget(target: EventTarget | null): boolean {
	return Boolean((target as Element | null)?.closest('.random-card__title, .question-body'));
}

function horizontalScrollBlock(target: EventTarget | null): HTMLElement | null {
	const pre = (target as Element | null)?.closest('.question-body pre');
	if (!(pre instanceof HTMLElement) || !card?.contains(pre)) return null;
	if (pre.scrollWidth > pre.clientWidth + 1) return pre;
	return null;
}

function clearSelectTextMode(): void {
	card?.classList.remove('random-card--select-text');
	window.getSelection()?.removeAllRanges();
	lastTextTapAt = 0;
}

function enableSelectTextAt(x: number, y: number): void {
	if (!textSelectAllowed() || !card || card.classList.contains('random-card--select-text')) return;
	card.classList.add('random-card--select-text');
	selectWordAt(x, y);
	lastTextTapAt = 0;
}

function tryDoubleTapSelect(e: PointerEvent): void {
	if (!textSelectAllowed()) return;
	if (!isTextTarget(e.target) || isInteractiveTarget(e.target)) return;
	if (card?.classList.contains('random-card--select-text')) return;
	const now = e.timeStamp;
	const near = Math.hypot(e.clientX - lastTextTapX, e.clientY - lastTextTapY) < DOUBLE_TAP_PX;
	if (near && now - lastTextTapAt < DOUBLE_TAP_MS) {
		enableSelectTextAt(e.clientX, e.clientY);
		return;
	}
	lastTextTapAt = now;
	lastTextTapX = e.clientX;
	lastTextTapY = e.clientY;
}

function selectWordAt(x: number, y: number): void {
	const sel = window.getSelection();
	if (!sel) return;
	const range =
		document.caretRangeFromPoint?.(x, y) ??
		(() => {
			const pos = document.caretPositionFromPoint?.(x, y);
			if (!pos) return null;
			const r = document.createRange();
			r.setStart(pos.offsetNode, pos.offset);
			r.collapse(true);
			return r;
		})();
	if (!range) return;
	sel.removeAllRanges();
	sel.addRange(range);
	try {
		sel.modify('extend', 'forward', 'word');
		sel.modify('extend', 'backward', 'word');
	} catch {
		/* ponytail: caret only if modify unsupported */
	}
}

function selectionInCard(): boolean {
	const sel = window.getSelection();
	if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return false;
	const node = sel.anchorNode;
	return Boolean(node && card?.contains(node));
}

function cancelSwipeGesture(): void {
	if (pointerId == null) return;
	const id = pointerId;
	dragging = false;
	dragDx = 0;
	pointerId = null;
	card?.classList.remove('is-dragging');
	resetCardMotion();
	try {
		card?.releasePointerCapture(id);
	} catch {
		/* already released */
	}
}

function setStatus(msg: string, show = true): void {
	if (!statusEl) return;
	statusEl.textContent = msg;
	statusEl.hidden = !show;
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
	answerEl.open = getAutoOpen();

	for (const a of bodyEl.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
		a.target = '_blank';
		a.rel = 'noopener noreferrer';
	}

	card.hidden = false;
	clearSelectTextMode();
	setStatus('', false);
	syncFavoriteButton();
	syncPinButton();
}

async function loadQuestion(id: string): Promise<QuestionPayload | null> {
	const res = await fetch(`/question/${id}.json`);
	if (!res.ok) return null;
	return (await res.json()) as QuestionPayload;
}

async function swapQuestion(exitDir: ExitDir = 'left', animate = true, fromDragDx?: number): Promise<void> {
	if (swapping) return;
	const pool = filteredPool();
	const item = pickRandom(pool);
	if (!item) {
		resetCardMotion();
		if (card) card.hidden = true;
		setStatus('Немає питань за цими фільтрами', true);
		currentId = null;
		currentPayload = null;
		return;
	}

	const motion = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	swapping = true;
	swapBtn?.setAttribute('disabled', '');

	const dataPromise = loadQuestion(item.id);

	try {
		if (motion && card && !card.hidden) {
			if (fromDragDx != null) await playExitFromDrag(exitDir, fromDragDx);
			else await playExit(exitDir);
		}

		const data = await dataPromise;
		if (!data) {
			resetCardMotion();
			setStatus('Не вдалося завантажити питання', true);
			return;
		}
		pushRecent(item.id);
		renderPayload(data);

		if (motion) await playEnter(enterFrom(exitDir));
		resetCardMotion();
	} finally {
		swapBtn?.removeAttribute('disabled');
		swapping = false;
		dragging = false;
		pointerId = null;
	}
}

function setDifficultyChip(active: HTMLButtonElement): void {
	for (const chip of document.querySelectorAll<HTMLButtonElement>('[data-random-difficulty]')) {
		chip.classList.toggle('chip--active', chip === active);
	}
	difficulty = active.dataset.randomDifficulty ?? 'all';
}

topicSelect.addEventListener('change', () => {
	syncGradeOptions();
	void swapQuestion();
});

gradeSelect.addEventListener('change', () => void swapQuestion());

for (const chip of document.querySelectorAll<HTMLButtonElement>('[data-random-difficulty]')) {
	chip.addEventListener('click', () => {
		setDifficultyChip(chip);
		void swapQuestion();
	});
}

swapBtn?.addEventListener('click', () => void swapQuestion('left'));

autoOpenBtn?.addEventListener('click', () => {
	const on = !getAutoOpen();
	setAutoOpen(on);
	syncAutoOpenBtn();
	if (card && !card.hidden) answerEl.open = on;
});

function onPointerDown(e: PointerEvent): void {
	if (swapping || card?.hidden || e.button !== 0 || isInteractiveTarget(e.target)) return;
	if (horizontalScrollBlock(e.target)) return;
	if (card?.classList.contains('random-card--select-text')) {
		if (isTextTarget(e.target)) return;
		clearSelectTextMode();
	}
	textSwipeOnly =
		textSelectAllowed() &&
		!card!.classList.contains('random-card--select-text') &&
		isTextTarget(e.target);
	pointerId = e.pointerId;
	touchStartX = e.clientX;
	touchStartY = e.clientY;
	dragDx = 0;
	dragging = false;
	if (!textSwipeOnly) card?.setPointerCapture(e.pointerId);
}

function onPointerMove(e: PointerEvent): void {
	if (swapping || card?.hidden || pointerId !== e.pointerId) return;

	if (card?.classList.contains('random-card--select-text') && selectionInCard()) {
		cancelSwipeGesture();
		return;
	}

	const dx = e.clientX - touchStartX;
	const dy = e.clientY - touchStartY;

	if (!dragging) {
		if (Math.abs(dx) < DRAG_START || Math.abs(dx) < Math.abs(dy)) return;
		if (textSwipeOnly) card?.setPointerCapture(e.pointerId);
		textSwipeOnly = false;
		dragging = true;
		card?.classList.add('is-dragging');
		if (!card?.classList.contains('random-card--select-text')) {
			window.getSelection()?.removeAllRanges();
		}
	}

	dragDx = dx;
	if (!dragging) return;
	setDragTransform(dx);
	e.preventDefault();
}

async function onPointerUp(e: PointerEvent): Promise<void> {
	if (pointerId !== e.pointerId) return;
	const wasDragging = dragging;
	const smallMove = Math.abs(dragDx) < DRAG_START;
	card?.releasePointerCapture(e.pointerId);
	pointerId = null;
	textSwipeOnly = false;

	if (!wasDragging && smallMove) tryDoubleTapSelect(e);

	if (!dragging || swapping || card?.hidden) {
		dragging = false;
		return;
	}

	card?.classList.remove('is-dragging');

	if (Math.abs(dragDx) >= SWIPE_MIN) {
		const exitDir: ExitDir = dragDx < 0 ? 'left' : 'right';
		const dx = dragDx;
		dragging = false;
		dragDx = 0;
		await swapQuestion(exitDir, true, dx);
		return;
	}

	resetCardMotion();
	dragging = false;
	dragDx = 0;
}

card?.addEventListener('pointerdown', onPointerDown);
card?.addEventListener('pointermove', onPointerMove, { passive: false });
card?.addEventListener('pointerup', onPointerUp);
card?.addEventListener('pointercancel', onPointerUp);

card?.addEventListener('dblclick', (e) => {
	if (!textSelectAllowed()) return;
	if (isInteractiveTarget(e.target)) return;
	if (!isTextTarget(e.target)) return;
	e.preventDefault();
	enableSelectTextAt(e.clientX, e.clientY);
});

card?.addEventListener('selectstart', (e) => {
	if (dragging || !card.classList.contains('random-card--select-text')) e.preventDefault();
});

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

document.addEventListener('keydown', (e) => {
	if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
	if (e.target instanceof HTMLSelectElement) return;
	if (e.code === 'Escape') {
		clearSelectTextMode();
	}
	if (e.code === 'KeyR') {
		e.preventDefault();
		void swapQuestion('left');
	}
	if (e.code === 'Space' && card && !card.hidden) {
		e.preventDefault();
		answerEl.open = !answerEl.open;
	}
	if (e.code === 'KeyO') {
		e.preventDefault();
		const on = !getAutoOpen();
		setAutoOpen(on);
		syncAutoOpenBtn();
		if (card && !card.hidden) answerEl.open = on;
	}
	if (e.code === 'KeyP') {
		e.preventDefault();
		const pin = readPin();
		if (!pin) return;
		togglePin(pin);
		syncPinButton();
		updatePinResumeUI();
	}
});

syncGradeOptions();
syncAutoOpenBtn();

loadSearchIndex().then((items) => {
	allItems = items;
	void swapQuestion('left', false);
});
