---
title: "Що таке функції вищого порядку?"
topic: nodejs
grade: senior
category: "JavaScript"
order: 29
difficulty: hard
---

## Відповідь

Функція вищого порядку (HOF) — функція, що приймає іншу функцію як аргумент і/або повертає функцію. Основа композиційності в JS і екосистемі Node.

Вбудовані: `map`, `filter`, `reduce`. Node/Express: middleware `(req, res, next) =>`. Декоратори/обгортки: `withRetry(fn)`, `withTimeout(fn, ms)`, `compose(f, g)`.

HOF дозволяють dependency injection без класів, cross-cutting concerns (логування, auth), функціональні пайплайни. У TypeScript — generic HOF для type-safe обгорток.

## Приклад

```js
function withRetry(fn, { attempts = 3, delayMs = 100 } = {}) {
  return async (...args) => {
    for (let i = 1; i <= attempts; i++) {
      try {
        return await fn(...args);
      } catch (err) {
        if (i === attempts) throw err;
        await new Promise((r) => setTimeout(r, delayMs * i));
      }
    }
  };
}

const fetchUser = withRetry((id) => httpClient.get(`/users/${id}`));
```

## Юз кейси

- Композиція ланцюжка Express middleware
- Обгортка методів repository кешуючим HOF
- Test doubles: ін'єкція mock fetch через параметр HOF

## Документація

- [Higher-order functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
