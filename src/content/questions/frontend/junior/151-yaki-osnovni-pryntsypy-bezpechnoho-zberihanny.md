---
title: "Які основні принципи безпечного зберігання та передачі користувацьких даних?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 151
difficulty: easy
---

## Відповідь

HTTPS завжди, токени в httpOnly cookies (не localStorage), не логувати паролі, валідація на сервері, мінімізація збору PII, CSP проти XSS, sanitization user input.

## Приклад

```js
// Не роби так
localStorage.setItem('token', jwt);

// Краще — httpOnly cookie, ставить сервер
await fetch('/api/login', { method: 'POST', credentials: 'include', body });
```

## Юз кейси

- Паролі ніколи не зберігати на клієнті
- DOMPurify для HTML від користувача

## Документація

- [TLS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
- [XSS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)
