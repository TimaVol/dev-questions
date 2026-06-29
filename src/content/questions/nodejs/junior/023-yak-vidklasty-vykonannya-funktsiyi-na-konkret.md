---
title: "Як відкласти виконання функції на конкретний час?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 23
difficulty: easy
---

## Відповідь

`setTimeout(fn, delayMs)` — один раз після затримки. `setInterval(fn, ms)` — повторно кожні N мс (не забудьте `clearInterval`). У Node для defer після I/O — `setImmediate`. Для debounce/throttle на сервері (rate limit, retry) — обгортки над таймерами або бібліотеки (`p-debounce`).

## Приклад

```js
function retry(fn, attempts, delay) {
  return new Promise((resolve, reject) => {
  const run = (left) => {
    fn().then(resolve).catch((err) => {
      if (left <= 1) return reject(err);
      setTimeout(() => run(left - 1), delay);
    });
  };
  run(attempts);
  });
}

await retry(() => fetch('https://api.example.com'), 3, 1000);
```

## Юз кейси

- Exponential backoff при помилках зовнішнього API
- TTL-кеш: `setTimeout` для інвалідації запису
- Graceful shutdown: `setTimeout` перед `process.exit`

## Документація

- [setTimeout — MDN](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Timers — Node.js](https://nodejs.org/api/timers.html)
