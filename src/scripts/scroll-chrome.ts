const MOBILE_MQ = window.matchMedia('(max-width: 1024px)');
const DELTA = 10;
const TOP = 32;

let lastY = window.scrollY;
let ticking = false;

function pinned(): boolean {
	return (
		document.body.classList.contains('nav-open') ||
		document.body.classList.contains('toc-open') ||
		!!document.activeElement?.closest('.page-toolbar, .mobile-bar')
	);
}

function syncToolbarStuck(): void {
	const mobileBar = document.querySelector<HTMLElement>('.mobile-bar');
	const toolbar = document.querySelector<HTMLElement>('.page-toolbar');
	if (!toolbar) return;
	const barBottom =
		mobileBar && getComputedStyle(mobileBar).display !== 'none'
			? Math.max(0, mobileBar.getBoundingClientRect().bottom)
			: 0;
	document.body.classList.toggle('mobile-toolbar-stuck', toolbar.getBoundingClientRect().top <= barBottom + 2);
}

function setHidden(hidden: boolean): void {
	document.body.classList.toggle('mobile-chrome-hidden', hidden);
}

function update(): void {
	ticking = false;
	if (!MOBILE_MQ.matches) {
		setHidden(false);
		document.body.classList.remove('mobile-toolbar-stuck');
		lastY = window.scrollY;
		return;
	}

	syncToolbarStuck();
	if (pinned()) return;

	const y = window.scrollY;
	if (y <= TOP) {
		setHidden(false);
	} else if (y > lastY + DELTA) {
		setHidden(true);
	} else if (y < lastY - DELTA) {
		setHidden(false);
	}
	lastY = y;
}

function onScroll(): void {
	if (!ticking) {
		ticking = true;
		requestAnimationFrame(update);
	}
}

MOBILE_MQ.addEventListener('change', () => {
	setHidden(false);
	document.body.classList.remove('mobile-toolbar-stuck');
	lastY = window.scrollY;
});

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
update();
