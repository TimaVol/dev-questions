---
title: "Як звернутися до всіх посилань, у яких в атрибуті в кінці посилання href є «.com»? Як приховати такі посилання?"
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 51
difficulty: easy
---

## Відповідь

У DOM: **`document.querySelectorAll('a[href$=".com"]')`** — селектор атрибута з суфіксом `$=`. Для приховування: `el.style.display = 'none'` або CSS-клас `.hidden { display: none }`. У Node (cheerio/jsdom) — той самий селектор для SSR-скрапінгу або тестів.

## Приклад

```js
// Браузер або jsdom
const links = document.querySelectorAll('a[href$=".com"]');
links.forEach((a) => a.classList.add('hidden'));
```

```css
a[href$=".com"] {
  display: none;
}
```

```js
// Cheerio у Node
import * as cheerio from 'cheerio';
const $ = cheerio.load(html);
$('a[href$=".com"]').remove();
```

## Юз кейси

- Фільтрація зовнішніх .com посилань у адмін-панелі
- E2E-тест: перевірити кількість видимих посилань
- Санітизація HTML перед збереженням у БД

## Документація

- [Attribute selectors — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
