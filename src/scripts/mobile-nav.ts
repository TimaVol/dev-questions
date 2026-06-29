const backdrop = document.getElementById('drawer-backdrop');
const menuBtn = document.getElementById('menu-toggle');
const tocBtn = document.getElementById('toc-toggle');

function isOpen(): boolean {
	return document.body.classList.contains('nav-open') || document.body.classList.contains('toc-open');
}

function sync(): void {
	const open = isOpen();
	backdrop?.toggleAttribute('hidden', !open);
	document.body.style.overflow = open ? 'hidden' : '';
	menuBtn?.setAttribute('aria-expanded', String(document.body.classList.contains('nav-open')));
	tocBtn?.setAttribute('aria-expanded', String(document.body.classList.contains('toc-open')));
}

function close(): void {
	document.body.classList.remove('nav-open', 'toc-open');
	sync();
}

menuBtn?.addEventListener('click', () => {
	const next = !document.body.classList.contains('nav-open');
	document.body.classList.toggle('nav-open', next);
	document.body.classList.remove('toc-open');
	sync();
});

tocBtn?.addEventListener('click', () => {
	const next = !document.body.classList.contains('toc-open');
	document.body.classList.toggle('toc-open', next);
	document.body.classList.remove('nav-open');
	sync();
});

backdrop?.addEventListener('click', close);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') close();
});

document.querySelector('.sidebar')?.addEventListener('click', (e) => {
	if ((e.target as Element).closest('a')) close();
});

document.querySelector('.toc')?.addEventListener('click', (e) => {
	if ((e.target as Element).closest('a')) close();
});
