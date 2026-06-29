import { favoriteCount, getFavoriteIds, isFavorite, toggleFavorite } from './favorites.ts';
import { filterSearchIndex, loadSearchIndex, type SearchItem } from './search-index.ts';

const search = document.getElementById('q-search') as HTMLInputElement | null;
const statusEl = document.getElementById('toolbar-status');
const pageQuestions = document.getElementById('page-questions');
const resultsPanel = document.getElementById('results-panel');
const toc = document.querySelector('.toc');
const favoritesChip = document.querySelector<HTMLButtonElement>('[data-favorites-filter]');
const favoritesCountEl = document.getElementById('favorites-count');

const pageTotal = pageQuestions?.querySelectorAll('.question-card').length ?? 0;
const currentPath = window.location.pathname;

const difficultyLabels: Record<string, string> = {
	easy: 'Легке',
	medium: 'Середнє',
	hard: 'Складне',
};

let difficulty = 'all';
let showFavoritesOnly = false;
let allItems: SearchItem[] = [];
let navIdx = -1;

function isGlobalMode(): boolean {
	const q = search?.value.trim() ?? '';
	return q.length > 0 || difficulty !== 'all' || showFavoritesOnly;
}

function navTargets(): HTMLElement[] {
	if (isGlobalMode()) {
		return [...document.querySelectorAll<HTMLElement>('.result-card')];
	}
	return [...document.querySelectorAll<HTMLElement>('#page-questions .question-card')];
}

function syncFavoriteButton(btn: HTMLButtonElement): void {
	const id = btn.dataset.favoriteId;
	if (!id) return;
	const on = isFavorite(id);
	btn.classList.toggle('favorite-btn--on', on);
	btn.setAttribute('aria-pressed', String(on));
	btn.setAttribute('aria-label', on ? 'Прибрати з обраного' : 'Додати в обране');
	btn.textContent = on ? '★' : '☆';
}

function syncAllFavoriteButtons(): void {
	for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-favorite-id]')) {
		syncFavoriteButton(btn);
	}
	updateFavoritesCount();
}

function updateFavoritesCount(): void {
	const n = favoriteCount();
	if (!favoritesCountEl) return;
	if (n > 0) {
		favoritesCountEl.hidden = false;
		favoritesCountEl.textContent = String(n);
	} else {
		favoritesCountEl.hidden = true;
		favoritesCountEl.textContent = '';
	}
}

function createFavoriteButton(id: string): HTMLButtonElement {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'favorite-btn';
	btn.dataset.favoriteId = id;
	btn.textContent = '☆';
	syncFavoriteButton(btn);
	return btn;
}

function setChipActive(chip: HTMLButtonElement): void {
	difficulty = chip.dataset.difficultyFilter ?? 'all';
	document
		.querySelectorAll<HTMLButtonElement>('[data-difficulty-filter]')
		.forEach((c) => c.classList.toggle('chip--active', c === chip));
}

function setFavoritesFilter(on: boolean): void {
	showFavoritesOnly = on;
	favoritesChip?.classList.toggle('chip--active', on);
	favoritesChip?.setAttribute('aria-pressed', String(on));
}

function resetFilters(): void {
	if (search) search.value = '';
	difficulty = 'all';
	showFavoritesOnly = false;
	document
		.querySelectorAll<HTMLButtonElement>('[data-difficulty-filter]')
		.forEach((c) => c.classList.toggle('chip--active', c.dataset.difficultyFilter === 'all'));
	setFavoritesFilter(false);
}

function showPageView(): void {
	pageQuestions?.removeAttribute('hidden');
	resultsPanel?.setAttribute('hidden', '');
	toc?.removeAttribute('hidden');
	if (statusEl) statusEl.textContent = `${pageTotal} на сторінці`;
	navIdx = -1;
}

function getFilteredItems(): SearchItem[] {
	let items = allItems;
	if (showFavoritesOnly) {
		const favs = getFavoriteIds();
		items = items.filter((item) => favs.has(item.id));
	}
	const q = search?.value.trim() ?? '';
	return filterSearchIndex(items, q, difficulty);
}

function emptyResultsMessage(): string {
	if (showFavoritesOnly && favoriteCount() === 0) {
		return 'Ще немає обраних питань. Натисніть ☆ на картці питання.';
	}
	return 'Нічого не знайдено. Спробуйте інший запит або фільтр.';
}

function renderMainResults(items: SearchItem[]): void {
	if (!resultsPanel) return;

	pageQuestions?.setAttribute('hidden', '');
	toc?.setAttribute('hidden', '');
	resultsPanel.removeAttribute('hidden');

	if (!items.length) {
		resultsPanel.innerHTML = `<p class="results-empty">${emptyResultsMessage()}</p>`;
		if (statusEl) statusEl.textContent = '0 знайдено';
		navIdx = -1;
		return;
	}

	const frag = document.createDocumentFragment();
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const wrap = document.createElement('div');
		wrap.className = 'result-card-wrap';

		const link = document.createElement('a');
		link.className = 'result-card';
		link.href = item.href;
		link.dataset.resultId = item.id;
		if (item.href.startsWith(`${currentPath}#`)) link.dataset.samePage = '1';

		const num = document.createElement('span');
		num.className = 'result-card__num';
		num.textContent = String(i + 1);

		const body = document.createElement('div');
		body.className = 'result-card__body';

		const title = document.createElement('span');
		title.className = 'result-card__title';
		title.textContent = item.title;

		const meta = document.createElement('span');
		meta.className = 'result-card__meta';
		meta.textContent = `${item.label} · ${item.category}`;

		body.append(title, meta);

		const badge = document.createElement('span');
		badge.className = `badge badge--${item.difficulty}`;
		badge.textContent = difficultyLabels[item.difficulty] ?? item.difficulty;

		link.append(num, body, badge);
		wrap.append(link, createFavoriteButton(item.id));
		frag.append(wrap);
	}

	resultsPanel.replaceChildren(frag);
	if (statusEl) statusEl.textContent = `${items.length} знайдено`;
	navIdx = -1;
}

function applySearch(): void {
	if (!isGlobalMode()) {
		showPageView();
		return;
	}

	renderMainResults(getFilteredItems());
}

function followSamePageResult(id: string): void {
	resetFilters();
	showPageView();
	const card = document.getElementById(id);
	if (card) scrollToCard(card);
}

resultsPanel?.addEventListener('click', (e) => {
	const link = (e.target as Element).closest<HTMLAnchorElement>('.result-card');
	if (!link?.dataset.samePage) return;
	e.preventDefault();
	followSamePageResult(link.dataset.resultId!);
});

document.addEventListener('click', (e) => {
	const btn = (e.target as Element).closest<HTMLButtonElement>('[data-favorite-id]');
	if (!btn) return;
	e.preventDefault();
	e.stopPropagation();
	toggleFavorite(btn.dataset.favoriteId!);
	syncFavoriteButton(btn);
	updateFavoritesCount();
	if (isGlobalMode()) applySearch();
});

search?.addEventListener('input', applySearch);

search?.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		resetFilters();
		showPageView();
		search?.blur();
	}
});

for (const chip of document.querySelectorAll<HTMLButtonElement>('[data-difficulty-filter]')) {
	chip.addEventListener('click', () => {
		setChipActive(chip);
		applySearch();
	});
}

favoritesChip?.addEventListener('click', () => {
	setFavoritesFilter(!showFavoritesOnly);
	applySearch();
});

document.addEventListener('keydown', (e) => {
	if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
	if (search && document.activeElement === search) return;
	if (e.key === 'j' || e.key === 'J') {
		e.preventDefault();
		navByKey('j');
	}
	if (e.key === 'k' || e.key === 'K') {
		e.preventDefault();
		navByKey('k');
	}
});

function scrollToCard(card: HTMLElement): void {
	card.scrollIntoView({ behavior: 'smooth', block: 'start' });
	card.classList.add('question-card--focus');
	setTimeout(() => card.classList.remove('question-card--focus'), 1200);
	navIdx = navTargets().indexOf(card);
}

function findNavIdx(vis: HTMLElement[]): number {
	const anchor = 100;
	let idx = 0;
	let best = Infinity;
	for (let i = 0; i < vis.length; i++) {
		const d = Math.abs(vis[i].getBoundingClientRect().top - anchor);
		if (d < best) {
			best = d;
			idx = i;
		}
	}
	return idx;
}

function navByKey(key: 'j' | 'k'): void {
	const vis = navTargets();
	if (!vis.length) return;
	if (navIdx < 0 || navIdx >= vis.length) navIdx = findNavIdx(vis);
	else navIdx = key === 'j' ? Math.min(navIdx + 1, vis.length - 1) : Math.max(navIdx - 1, 0);
	const el = vis[navIdx];
	el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	el.classList.add(isGlobalMode() ? 'result-card--focus' : 'question-card--focus');
	setTimeout(
		() => el.classList.remove(isGlobalMode() ? 'result-card--focus' : 'question-card--focus'),
		1200,
	);
}

for (const a of document.querySelectorAll<HTMLAnchorElement>('.question-body a[href^="http"]')) {
	a.target = '_blank';
	a.rel = 'noopener noreferrer';
}

loadSearchIndex().then((items) => {
	allItems = items;
	syncAllFavoriteButtons();
});
