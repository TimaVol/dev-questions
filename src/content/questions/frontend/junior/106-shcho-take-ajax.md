---
title: "Що таке AJAX?"
topic: frontend
grade: junior
category: "API браузера"
order: 106
difficulty: easy
---

## Відповідь

AJAX (Asynchronous JavaScript And XML) — запит до сервера у фоні без перезавантаження сторінки. Сьогодні — `fetch` або `XMLHttpRequest`, дані зазвичай JSON, не XML.

## Приклад

```js
async function search(query) {
  const res = await fetch(`/api/search?q=${query}`);
  return res.json();
}
```

## Юз кейси

- Live search з debounce
- Підвантаження наступної сторінки пагінації

## Документація

- [XMLHttpRequest — MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [Fetch API — MDN](https://developer.mozilla.org/uk/docs/Web/API/Fetch_API)
