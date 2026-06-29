import { getPin, pinHref, type Pin } from './pin.ts';
import { scrollToTarget } from './scroll-target.ts';

function resumeLabel(pin: Pin, short: boolean): string {
	if (short) return `Продовжити з #${pin.index}`;
	const title = pin.title.length > 48 ? `${pin.title.slice(0, 45)}…` : pin.title;
	return `Продовжити: ${pin.label} — ${title}`;
}

export function updatePinResumeUI(): void {
	const pin = getPin();

	for (const el of document.querySelectorAll<HTMLElement>('[data-pin-resume]')) {
		const link = el.matches('a') ? el : el.querySelector('a');
		if (!pin || !(link instanceof HTMLAnchorElement)) {
			el.hidden = true;
			continue;
		}
		const short = el.dataset.pinResume === 'short';
		link.href = pinHref(pin);
		link.textContent = resumeLabel(pin, short);
		el.hidden = false;
	}
}

document.addEventListener('click', (e) => {
	const link = (e.target as Element).closest<HTMLAnchorElement>('[data-pin-resume-same-page]');
	if (!link) return;
	const pin = getPin();
	if (!pin || pin.path !== window.location.pathname) return;
	e.preventDefault();
	history.pushState(null, '', `#${pin.questionId}`);
	const card = document.getElementById(pin.questionId);
	if (card) requestAnimationFrame(() => scrollToTarget(card));
});

updatePinResumeUI();
