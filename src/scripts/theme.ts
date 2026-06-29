const STORAGE_KEY = 'theme';
type Theme = 'system' | 'light' | 'dark';

function getStored(): Theme {
	const t = localStorage.getItem(STORAGE_KEY);
	return t === 'light' || t === 'dark' ? t : 'system';
}

function applyTheme(theme: Theme): void {
	const root = document.documentElement;
	if (theme === 'system') {
		delete root.dataset.theme;
		localStorage.removeItem(STORAGE_KEY);
	} else {
		root.dataset.theme = theme;
		localStorage.setItem(STORAGE_KEY, theme);
	}
}

function syncGroup(group: HTMLElement, theme: Theme): void {
	for (const btn of group.querySelectorAll<HTMLButtonElement>('[data-theme]')) {
		const active = btn.dataset.theme === theme;
		btn.classList.toggle('theme-option--active', active);
		btn.setAttribute('aria-checked', String(active));
	}
}

export function initThemeSwitch(group: HTMLElement): void {
	let theme = getStored();
	syncGroup(group, theme);

	for (const btn of group.querySelectorAll<HTMLButtonElement>('[data-theme]')) {
		btn.addEventListener('click', () => {
			theme = btn.dataset.theme as Theme;
			applyTheme(theme);
			syncGroup(group, theme);
		});
	}
}

const group = document.getElementById('theme-switch');
if (group) initThemeSwitch(group);
