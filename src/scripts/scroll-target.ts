const FOCUS_CLASS = 'nav-target--focus';
const FOCUS_MS = 3000;

let focused: HTMLElement | null = null;
let focusTimer: ReturnType<typeof setTimeout> | null = null;

export function scrollOffset(): number {
	const chromeHidden = document.body.classList.contains('mobile-chrome-hidden');
	const mobileBar = document.querySelector<HTMLElement>('.mobile-bar');
	const toolbar = document.querySelector<HTMLElement>('.page-toolbar');
	let offset = 12;
	if (!chromeHidden && mobileBar && getComputedStyle(mobileBar).display !== 'none') {
		offset += mobileBar.getBoundingClientRect().height;
	}
	if (!chromeHidden && toolbar) {
		const tr = toolbar.getBoundingClientRect();
		const barBottom =
			mobileBar && getComputedStyle(mobileBar).display !== 'none'
				? mobileBar.getBoundingClientRect().bottom
				: 0;
		if (tr.top <= barBottom + 2) offset += tr.height;
	}
	return offset;
}

export function highlightTarget(el: HTMLElement): void {
	if (focused && focused !== el) {
		focused.classList.remove(FOCUS_CLASS, 'question-card--focus', 'result-card--focus');
	}
	focused = el;
	el.classList.add(FOCUS_CLASS);
	if (focusTimer) clearTimeout(focusTimer);
	focusTimer = setTimeout(() => {
		el.classList.remove(FOCUS_CLASS);
		if (focused === el) focused = null;
	}, FOCUS_MS);
}

export function scrollToTarget(el: HTMLElement): void {
	const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset();
	window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
	highlightTarget(el);
}

export function scrollToHash(hash = location.hash): void {
	const id = hash.replace(/^#/, '');
	if (!id) return;
	const el = document.getElementById(id);
	if (el) scrollToTarget(el);
}

export function initHashNavigation(): void {
	if (location.hash) {
		requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash()));
	}
	window.addEventListener('hashchange', () => scrollToHash());
}
