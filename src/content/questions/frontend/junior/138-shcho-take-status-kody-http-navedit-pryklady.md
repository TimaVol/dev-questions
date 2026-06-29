---
title: "Що таке статус-коди HTTP, наведіть приклади найбільш поширених."
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 138
difficulty: easy
---

## Відповідь

Статус-код — трицифрова відповідь сервера про результат запиту. **2xx** — успіх (200 OK, 201 Created), **3xx** — перенаправлення (301, 304), **4xx** — помилка клієнта (400, 401, 403, 404, 429), **5xx** — помилка сервера (500, 502, 503).

## Приклад

```js
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'olia@example.com' }),
});

if (res.status === 201) {
  const user = await res.json();
} else if (res.status === 400) {
  const { errors } = await res.json(); // валідація не пройшла
} else if (res.status === 401) {
  redirectToLogin();
} else if (res.status >= 500) {
  showToast('Сервер тимчасово недоступний');
}
```

## Юз кейси

- 401 — сесія прострочилась, оновити токен або вийти з акаунту
- 404 — показати «Товар не знайдено» замість порожньої сторінки
- 429 — занадто багато запитів: показати «Зачекайте» і повторити пізніше

## Документація

- [HTTP overview — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [HTTP-статуси — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
