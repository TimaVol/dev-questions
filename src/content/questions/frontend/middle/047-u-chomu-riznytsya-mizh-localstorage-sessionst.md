---
title: "У чому різниця між LocalStorage, SessionStorage та cookies?"
topic: frontend
grade: middle
category: "JavaScript"
order: 47
difficulty: medium
---

## Відповідь

**localStorage** — ~5MB, між сесіями, same-origin. **sessionStorage** — до закриття вкладки. **Cookies** — йдуть на сервер, `HttpOnly` для auth. Секрети не в storage — XSS прочитає.

## Приклад

```js
localStorage.setItem('theme', 'dark');
sessionStorage.setItem('checkout-step', '2');
// auth token — HttpOnly cookie, не localStorage
```

## Юз кейси

- Тема UI в localStorage
- Чернетка форми в sessionStorage
- JWT в HttpOnly cookie

## Документація

- [Web Storage API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Cookies — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
