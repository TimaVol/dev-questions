---
title: "Назвіть об’єкти першого класу."
topic: nodejs
grade: senior
category: "JavaScript"
order: 30
difficulty: hard
---

## Відповідь

Об'єкти першого класу — сутності, що підтримують усі операції як значення: присвоєння змінній, передача аргументом, повернення з функції, зберігання в структурах даних.

У JS першого класу: **функції**, **класи** (синтаксичний цукор над функціями), **літерали/об'єкти**, **arrow functions**, навіть **модулі** (import/export). Це дозволяє callbacks, middleware, strategy injection, функціональний стиль без спеціального синтаксису.

На контрасті: Java до 8 — функції не першого класу (обхід через anonymous classes). SQL — функції часто другого класу.

## Приклад

```js
const handlers = {
  GET: (req, res) => res.json({ ok: true }),
  POST: (req, res) => res.status(201).end(),
};

function createRouter(methodHandler) {
  return (req, res) => methodHandler[req.method]?.(req, res) ?? res.status(405).end();
}

app.use(createRouter(handlers));
```

## Юз кейси

- Plugin-системи з передачею setup-функцій
- Реєстрація обробників подій як значень
- Factory, що повертає налаштовані middleware-функції

## Документація

- [First-class functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
