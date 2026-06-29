---
title: "Чи є місце для CSS-властивості float у сучасному вебі?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 19
difficulty: easy
---

## Відповідь

`float` зародився для обтікання текстом навколо зображень у статичній вёрстці. Для **layout** він застарів — Flexbox і Grid покривають 99% кейсів без clearfix-хаків. Але `float` досі доречний для **типографічного обтікання**: фото в статті, pull quote збоку від тексту, drop cap ефекти. Для layout — ні: медіа-об'єкти, навбар, сітка — це `display: flex/grid`. Якщо бачите float у legacy — мігруйте при дотику, не масовим rewrite. `clear`, `overflow: hidden` clearfix — знати треба для читання старого коду.

## Приклад

```css
/* ✅ Доречно: обтікання в статті */
.article img {
  float: left;
  margin: 0 1.5rem 1rem 0;
  max-width: 40%;
}

/* ❌ Застаріло: колонки через float */
.col { float: left; width: 33.33%; }
.row::after { content: ''; display: table; clear: both; }

/* ✅ Сучасна альтернатива */
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
```

## Юз кейси

- Блог/CMS: зображення в тексті з float left/right
- Legacy підтримка: читання і поступова заміна float-layout на grid
- Print styles: float інколи стабільніший для друку довгих статей

## Документація

- [float — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/float)
