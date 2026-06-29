const STORAGE_KEY = 'theme';
type Theme = 'system' | 'light' | 'dark';

function getStored(): Theme {
	const t = localStorage.getItem(STORAGE_KEY);
	return t === 'light' || t === 'dark' ? t : 'system';
}

function isDark(theme: Theme): boolean {
	return theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
}

function syncFavicon(theme: Theme): void {
	let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		link.type = 'image/svg+xml';
		document.head.appendChild(link);
	}
	link.href = isDark(theme) ? '/favicon-dark.svg' : '/favicon-light.svg';
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
	syncFavicon(theme);
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

syncFavicon(getStored());
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
	if (getStored() === 'system') syncFavicon('system');
});
