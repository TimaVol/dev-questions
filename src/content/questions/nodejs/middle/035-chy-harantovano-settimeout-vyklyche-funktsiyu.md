---
title: "Чи гарантовано setTimeout викличе функцію через заданий час? Від чого це залежить?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 35
difficulty: medium
---

## Відповідь

**Ні, не гарантовано.** `setTimeout(fn, 100)` означає «викликати fn не раніше ніж через 100ms», а не «точно через 100ms».

Затримка залежить від:
- **Blocked event loop** — sync CPU work відкладає timers
- **Timer phase order** — інші macrotasks/microtasks в черзі
- **System load** — OS scheduling
- **Nested timers** — minimum delay 1ms (4ms у browsers, у Node — 0 для >=1ms після Node 14)
- **Process suspended** — laptop sleep, container freeze

Для точного timing — не покладатись на setTimeout; для deadlines — `AbortSignal.timeout()`.

## Приклад

```js
const start = Date.now();
setTimeout(() => {
  console.log(`Actual delay: ${Date.now() - start}ms`); // часто > 100ms
}, 100);

// Блокує loop на 500ms — timer чекає
const deadline = Date.now() + 500;
while (Date.now() < deadline) {}
```

## Юз кейси

- Debounce search input — OK для UX, не для SLA
- Retry backoff — додавати jitter
- Health check timeout через AbortController, не setTimeout alone

## Документація

- [setTimeout — MDN](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
