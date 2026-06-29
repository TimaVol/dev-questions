---
title: "Які засоби безпеки використовують під час роботи з вебзапитами?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 140
difficulty: easy
---

## Відповідь

Базовий набір: **HTTPS** для шифрування, **HttpOnly/Secure cookies** для сесій (не `localStorage` — вразливий до XSS), **CSRF-токени** для мутацій, **CORS** на сервері, **CSP** обмежує джерела скриптів. Клієнтська валідація — лише для UX; права й перевірку даних завжди робить бекенд.

## Приклад

```js
await fetch('/api/profile', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
  },
  body: JSON.stringify({ name: userInput.trim() }),
});
```

## Юз кейси

- JWT у HttpOnly-cookie замість `localStorage` — XSS не вкраде токен
- CSP `script-src 'self'` блокує ін'єкцію стороннього JavaScript
- CSRF-токен у формі зміни пароля — захист від підробленого POST

## Документація

- [CORS — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [CSP — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
