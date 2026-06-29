---
title: "Для чого використовують HTML5 Landmarks?"
topic: frontend
grade: middle
category: "Accessibility"
order: 101
difficulty: easy
---

## Відповідь

Landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) позначають регіони сторінки для assistive tech. Скрінрідер може стрибати між ними (список landmarks у NVDA). Один `<main>` на сторінку. Кілька `<nav>` — з `aria-label` для розрізнення. Доповнюють, але не замінюють правильну ієрархію заголовків.

## Приклад

```html
<header>...</header>
<nav aria-label="Головне меню">...</nav>
<nav aria-label="Футер">...</nav>
<main id="main">...</main>
<footer>...</footer>
```

## Юз кейси

- Швидка навігація скрінрідером до `<main>`
- Два nav: головне й юридичне — різні `aria-label`
- Audit: відсутній `<main>` — типова помилка SPA

## Документація

- [Landmark roles — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role)
- [HTML sectioning elements — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements#content_sectioning)
