import { filterSearchIndex, loadSearchIndex, type SearchItem } from './search-index.ts';

const search = document.getElementById('q-search') as HTMLInputElement | null;
const resultsEl = document.getElementById('search-results');
const countEl = document.getElementById('visible-count');
const totalEl = document.getElementById('page-total');
const globalCountEl = document.getElementById('global-count');

const cards = [...document.querySelectorAll<HTMLElement>('.question-card')];
const pageTotal = cards.length;
const currentPath = window.location.pathname;

let difficulty = 'all';
let allItems: SearchItem[] = [];
let activeIdx = -1;
let navIdx = -1;

function visibleCards(): HTMLElement[] {
	return cards.filter((c) => !c.hidden);
}

function applyLocalFilters(): void {
	const q = search?.value.trim().toLowerCase() ?? '';
	for (const card of cards) {
		const title = card.querySelector('h2')?.textContent?.toLowerCase() ?? '';
		const d = card.dataset.difficulty ?? '';
		const ok = title.includes(q) && (difficulty === 'all' || d === difficulty);
		card.hidden = !ok;
		const tocLi = document.querySelector<HTMLElement>(`[data-toc-item="${card.id}"]`);
		if (tocLi) tocLi.hidden = !ok;
	}
	for (const group of document.querySelectorAll<HTMLElement>('[data-toc-group]')) {
		group.hidden = group.querySelectorAll('[data-toc-item]:not([hidden])').length === 0;
	}
	if (countEl) countEl.textContent = String(visibleCards().length);
	navIdx = -1;
}

function renderResults(items: SearchItem[]): void {
	if (!resultsEl) return;

	activeIdx = -1;
	resultsEl.innerHTML = '';

	if (!items.length) {
		resultsEl.hidden = true;
		search?.setAttribute('aria-expanded', 'false');
		return;
	}

	const slice = items.slice(0, 20);
	for (const item of slice) {
		const li = document.createElement('li');
		const btn = document.createElement('a');
		btn.className = 'search-result';
		btn.href = item.href;
		btn.dataset.searchResult = item.id;
		if (item.href.startsWith(`${currentPath}#`)) btn.dataset.samePage = '1';

		const title = document.createElement('span');
		title.className = 'search-result__title';
		title.textContent = item.title;

		const meta = document.createElement('span');
		meta.className = 'search-result__meta';
		meta.textContent = item.label;

		btn.append(title, meta);
		li.append(btn);
		resultsEl.append(li);
	}

	if (items.length > 20) {
		const more = document.createElement('li');
		more.className = 'search-result__more';
		more.textContent = `Ще ${items.length - 20}… уточніть пошук`;
		resultsEl.append(more);
	}

	resultsEl.hidden = false;
	search?.setAttribute('aria-expanded', 'true');
}

function updateMeta(globalMatches: SearchItem[]): void {
	const q = search?.value.trim() ?? '';
	if (!globalCountEl) return;

	if (!q) {
		globalCountEl.hidden = true;
		globalCountEl.textContent = '';
		return;
	}

	const onPage = globalMatches.filter((item) => item.href.startsWith(`${currentPath}#`)).length;
	globalCountEl.hidden = false;
	globalCountEl.textContent =
		globalMatches.length === onPage
			? `${globalMatches.length} знайдено`
			: `${globalMatches.length} знайдено · ${onPage} на цій сторінці`;
}

function applySearch(): void {
	const q = search?.value.trim() ?? '';
	applyLocalFilters();

	if (!q) {
		renderResults([]);
		updateMeta([]);
		search?.setAttribute('aria-expanded', 'false');
		return;
	}

	const matches = filterSearchIndex(allItems, q, difficulty);
	renderResults(matches);
	updateMeta(matches);
}

function setActive(idx: number): void {
	if (!resultsEl) return;
	const links = [...resultsEl.querySelectorAll<HTMLAnchorElement>('[data-search-result]')];
	if (!links.length) return;
	activeIdx = Math.max(0, Math.min(idx, links.length - 1));
	links.forEach((l, i) => l.classList.toggle('search-result--active', i === activeIdx));
	links[activeIdx]?.scrollIntoView({ block: 'nearest' });
}

function followActive(): void {
	if (!resultsEl || activeIdx < 0) return;
	const link = resultsEl.querySelectorAll<HTMLAnchorElement>('[data-search-result]')[activeIdx];
	link?.click();
}

search?.addEventListener('input', applySearch);

search?.addEventListener('keydown', (e) => {
	if (!resultsEl || resultsEl.hidden) return;
	const links = resultsEl.querySelectorAll('[data-search-result]');
	if (!links.length) return;

	if (e.key === 'ArrowDown') {
		e.preventDefault();
		setActive(activeIdx + 1);
	} else if (e.key === 'ArrowUp') {
		e.preventDefault();
		setActive(activeIdx <= 0 ? links.length - 1 : activeIdx - 1);
	} else if (e.key === 'Enter' && activeIdx >= 0) {
		e.preventDefault();
		followActive();
	} else if (e.key === 'Escape') {
		resultsEl.hidden = true;
		activeIdx = -1;
	}
});

resultsEl?.addEventListener('click', (e) => {
	const link = (e.target as Element).closest<HTMLAnchorElement>('[data-search-result]');
	if (!link) return;
	if (link.dataset.samePage) {
		e.preventDefault();
		const id = link.dataset.searchResult!;
		const card = document.getElementById(id);
		if (card) {
			scrollToCard(card);
			const vis = visibleCards();
			navIdx = vis.indexOf(card);
		}
		resultsEl.hidden = true;
		search?.blur();
	}
});

document.addEventListener('click', (e) => {
	if (!search || !resultsEl) return;
	if (e.target === search || resultsEl.contains(e.target as Node)) return;
	resultsEl.hidden = true;
	activeIdx = -1;
});

for (const chip of document.querySelectorAll<HTMLButtonElement>('[data-difficulty-filter]')) {
	chip.addEventListener('click', () => {
		difficulty = chip.dataset.difficultyFilter ?? 'all';
		document
			.querySelectorAll<HTMLButtonElement>('[data-difficulty-filter]')
			.forEach((c) => c.classList.toggle('chip--active', c === chip));
		applySearch();
	});
}

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
}

/** ponytail: anchor near top — cards scroll to start, not viewport center */
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
	const vis = visibleCards();
	if (!vis.length) return;
	if (navIdx < 0 || navIdx >= vis.length) navIdx = findNavIdx(vis);
	else navIdx = key === 'j' ? Math.min(navIdx + 1, vis.length - 1) : Math.max(navIdx - 1, 0);
	scrollToCard(vis[navIdx]);
}

for (const a of document.querySelectorAll<HTMLAnchorElement>('.question-body a[href^="http"]')) {
	a.target = '_blank';
	a.rel = 'noopener noreferrer';
}

loadSearchIndex().then((items) => {
	allItems = items;
	if (totalEl) totalEl.textContent = String(pageTotal);
});
