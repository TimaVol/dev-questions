---
title: "Є завдання передавати дані між двома різними вебсайтами. Які є способи це робити? А якщо тільки client side? Якщо ми маємо доступ до коду обох сайтів? Якщо один показується на іншому через iframe? Якщо ж ми не маємо доступу до одного з них?"
topic: frontend
grade: senior
category: "JavaScript"
order: 55
difficulty: hard
---

## Відповідь

**Same origin** (protocol+host+port): `localStorage`, `BroadcastChannel`, `SharedWorker`, shared cookie. **Cross-origin з доступом до обох кодів:** `postMessage` (iframe/window.opener), CORS API calls до shared backend, OAuth redirect flow. **iframe embed:** `parent.postMessage(data, targetOrigin)` + **strict origin check** на receive. **Без доступу до одного сайту:** лише що дозволяє той сайт — URL params, postMessage якщо він listener, redirect callbacks. **Ніколи** не довіряйте `event.origin === '*'` у production. Backend — найнадійніший міст: Site A і B ходять до common API.

## Приклад

```js
// Parent page (site-a.com)
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({ type: 'INIT', userId: '123' }, 'https://site-b.com');

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://site-b.com') return; // обов'язково!
  if (event.data.type === 'READY') console.log('Widget ready');
});
```

```js
// Child iframe (site-b.com)
window.parent.postMessage({ type: 'READY' }, 'https://site-a.com');

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://site-a.com') return;
  if (event.data.type === 'INIT') initWidget(event.data.userId);
});
```

## Юз кейси

- Payment widget у iframe: postMessage для height resize і payment status
- OAuth popup: `window.opener.postMessage` після login redirect
- Third-party chat без API: лише embed script — обмежені можливості інтеграції

## Документація

- [Window.postMessage — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [BroadcastChannel — MDN](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)
