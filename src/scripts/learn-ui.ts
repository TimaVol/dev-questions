import { filterSearchIndex, loadSearchIndex, type SearchItem } from './search-index.ts';

const search = document.getElementById('q-search') as HTMLInputElement | null;
const statusEl = document.getElementById('toolbar-status');
const pageQuestions = document.getElementById('page-questions');
const resultsPanel = document.getElementById('results-panel');
const toc = document.querySelector('.toc');

const pageTotal = pageQuestions?.querySelectorAll('.question-card').length ?? 0;
const currentPath = window.location.pathname;

const difficultyLabels: Record<string, string> = {
	easy: 'Легке',
	medium: 'Середнє',
	hard: 'Складне',
};

let difficulty = 'all';
let allItems: SearchItem[] = [];
let navIdx = -1;

function isGlobalMode(): boolean {
	const q = search?.value.trim() ?? '';
	return q.length > 0 || difficulty !== 'all';
}

function navTargets(): HTMLElement[] {
	if (isGlobalMode()) {
		return [...document.querySelectorAll<HTMLElement>('.result-card')];
	}
	return [...document.querySelectorAll<HTMLElement>('#page-questions .question-card')];
}

function setChipActive(chip: HTMLButtonElement): void {
	difficulty = chip.dataset.difficultyFilter ?? 'all';
	document
		.querySelectorAll<HTMLButtonElement>('[data-difficulty-filter]')
		.forEach((c) => c.classList.toggle('chip--active', c === chip));
}

function resetFilters(): void {
	if (search) search.value = '';
	difficulty = 'all';
	document
		.querySelectorAll<HTMLButtonElement>('[data-difficulty-filter]')
		.forEach((c) => c.classList.toggle('chip--active', c.dataset.difficultyFilter === 'all'));
}

function showPageView(): void {
	pageQuestions?.removeAttribute('hidden');
	resultsPanel?.setAttribute('hidden', '');
	toc?.removeAttribute('hidden');
	if (statusEl) statusEl.textContent = `${pageTotal} на сторінці`;
	navIdx = -1;
}

function renderMainResults(items: SearchItem[]): void {
	if (!resultsPanel) return;

	pageQuestions?.setAttribute('hidden', '');
	toc?.setAttribute('hidden', '');
	resultsPanel.removeAttribute('hidden');

	if (!items.length) {
		resultsPanel.innerHTML =
			'<p class="results-empty">Нічого не знайдено. Спробуйте інший запит або фільтр.</p>';
		if (statusEl) statusEl.textContent = '0 знайдено';
		navIdx = -1;
		return;
	}

	const frag = document.createDocumentFragment();
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
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
		frag.append(link);
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

	const q = search?.value.trim() ?? '';
	const matches = filterSearchIndex(allItems, q, difficulty);
	renderMainResults(matches);
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
});
