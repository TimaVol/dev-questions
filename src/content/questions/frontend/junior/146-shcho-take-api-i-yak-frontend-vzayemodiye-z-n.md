---
title: "Що таке API і як фронтенд взаємодіє з ним?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 146
difficulty: easy
---

## Відповідь

API — інтерфейс для обміну даними між фронтом і беком. Фронтенд робить HTTP-запити (fetch), отримує JSON, відображає в UI. Авторизація через headers або cookies.

## Приклад

```js
async function getProducts() {
  const res = await fetch('/api/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
```

## Юз кейси

- Завантаження списку товарів при відкритті каталогу
- Відправка форми замовлення POST-запитом

## Документація

- [HTTP overview — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Fetch API — MDN](https://developer.mozilla.org/uk/docs/Web/API/Fetch_API)
