import { initHashNavigation, scrollToTarget } from './scroll-target.ts';

const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];

if (links.length) {
	const headings = links
		.map((l) => document.getElementById(l.dataset.tocLink!))
		.filter(Boolean) as HTMLElement[];

	for (const link of links) {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const id = link.dataset.tocLink;
			if (!id) return;
			const el = document.getElementById(id);
			if (!el) return;
			history.pushState(null, '', `#${id}`);
			scrollToTarget(el);
		});
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					const id = e.target.id;
					links.forEach((l) => l.classList.toggle('active', l.dataset.tocLink === id));
				}
			}
		},
		{ rootMargin: '0px 0px -70% 0px' },
	);

	headings.forEach((h) => observer.observe(h));
}

initHashNavigation();
