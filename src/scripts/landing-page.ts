import { getPendingPracticeSession, practiceSessionResumeMeta } from './practice-session.ts';
import { updatePinResumeUI } from './pin-resume.ts';
import { filterSearchIndex, loadSearchIndex, type SearchItem } from './search-index.ts';

const resumeWrap = document.getElementById('landing-resume');
const practiceResume = document.getElementById('landing-practice-resume');
const practiceResumeLink = document.getElementById('landing-practice-resume-link');
const search = document.getElementById('landing-search') as HTMLInputElement | null;
const resultsPanel = document.getElementById('landing-results');
const searchStatus = document.getElementById('landing-search-status');
const browseSection = document.getElementById('landing-browse');

const difficultyLabels: Record<string, string> = {
	easy: 'Легке',
	medium: 'Середнє',
	hard: 'Складне',
};

let difficulty = 'all';
let allItems: SearchItem[] = [];

function syncResumeWrap(): void {
	const pinVisible = !!document.querySelector('[data-pin-resume]:not([hidden])');
	const practiceVisible = !!practiceResume && !practiceResume.hidden;
	if (resumeWrap) resumeWrap.hidden = !pinVisible && !practiceVisible;
}

function updatePracticeResumeUI(): void {
	const session = getPendingPracticeSession();
	if (!practiceResume || !practiceResumeLink) return;
	if (!session) {
		practiceResume.hidden = true;
		syncResumeWrap();
		return;
	}
	practiceResumeLink.textContent = `Продовжити сесію · ${practiceSessionResumeMeta(session)}`;
	practiceResume.hidden = false;
	syncResumeWrap();
}

function renderResults(items: SearchItem[]): void {
	if (!resultsPanel || !searchStatus) return;

	if (!search?.value.trim() && difficulty === 'all') {
		resultsPanel.hidden = true;
		resultsPanel.replaceChildren();
		browseSection?.removeAttribute('hidden');
		searchStatus.textContent = `${allItems.length} питань`;
		return;
	}

	browseSection?.setAttribute('hidden', '');
	resultsPanel.hidden = false;

	if (!items.length) {
		resultsPanel.innerHTML = '<p class="results-empty">Нічого не знайдено. Спробуйте інший запит або фільтр.</p>';
		searchStatus.textContent = '0 знайдено';
		return;
	}

	const frag = document.createDocumentFragment();
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const link = document.createElement('a');
		link.className = 'result-card';
		link.href = item.href;

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
	searchStatus.textContent = `${items.length} знайдено`;
}

function applySearch(): void {
	const q = search?.value.trim() ?? '';
	renderResults(filterSearchIndex(allItems, q, difficulty));
}

for (const chip of document.querySelectorAll<HTMLButtonElement>('[data-landing-difficulty]')) {
	chip.addEventListener('click', () => {
		difficulty = chip.dataset.landingDifficulty ?? 'all';
		for (const c of document.querySelectorAll('[data-landing-difficulty]')) {
			c.classList.toggle('chip--active', c === chip);
		}
		applySearch();
	});
}

search?.addEventListener('input', applySearch);

updatePinResumeUI();
updatePracticeResumeUI();
syncResumeWrap();

loadSearchIndex().then((items) => {
	allItems = items;
	applySearch();
});
