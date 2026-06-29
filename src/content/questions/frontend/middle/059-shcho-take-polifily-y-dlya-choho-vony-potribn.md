---
title: "Що таке поліфіли й для чого вони потрібні?"
topic: frontend
grade: middle
category: "JavaScript"
order: 59
difficulty: easy
---

## Відповідь

Поліфіл — код, що імітує сучасне API в браузерах, де його ще немає (`Promise`, `fetch`, `Array.at`). На відміну від транспіляції (новий синтаксис → старий), поліфіл додає поведінку. Підключають через core-js або `@babel/preset-env` за `browserslist` — лише потрібні поліфіли, щоб не роздувати bundle.

## Приклад

```js
if (!Array.prototype.at) {
  Array.prototype.at = function (n) {
    n = n < 0 ? this.length + n : n;
    return this[n];
  };
}
```

## Юз кейси

- Підтримка корпоративних браузерів без native `fetch`
- Babel preset-env + core-js для legacy-клієнтів
- Перевірка caniuse перед використанням нового API

## Документація

- [Polyfill — MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)
- [Can I use](https://caniuse.com/)
