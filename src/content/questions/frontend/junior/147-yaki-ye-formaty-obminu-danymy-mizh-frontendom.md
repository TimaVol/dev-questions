---
title: "Які є формати обміну даними між фронтендом і бекендом?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 147
difficulty: easy
---

## Відповідь

JSON — 99% сучасних API. XML — legacy. FormData — завантаження файлів. Protocol Buffers/MessagePack — рідко на фронті. GraphQL — один endpoint, клієнт вибирає поля.

## Приклад

```js
// JSON
await fetch('/api/user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Оля' }),
});

// FormData для файлів
const form = new FormData();
form.append('avatar', file);
await fetch('/api/upload', { method: 'POST', body: form });
```

## Юз кейси

- JSON для CRUD API
- FormData для upload аватара

## Документація

- [JSON — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [Fetch API — MDN](https://developer.mozilla.org/uk/docs/Web/API/Fetch_API)
