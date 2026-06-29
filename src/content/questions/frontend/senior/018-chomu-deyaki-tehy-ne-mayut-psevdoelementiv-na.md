---
title: "Чому деякі теги не мають псевдоелементів, наприклад img?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 18
difficulty: hard
---

## Відповідь

Псевдоелементи (`::before`, `::after`) працюють лише на елементах, що можуть мати **generated content** у box tree. Replaced elements (`img`, `input`, `video`, `iframe`, `canvas`) — їхній контент приходить ззовні (файл, API), браузер не може «вставити» віртуальний вузол всередину. Тому `img::before` не відображається (або ігнорується). Обхід: обгортка `<div class="thumb"><img /></div>` і псевдоелемент на wrapper; або `background-image` замість `<img>` якщо потрібен overlay. Псевдокласи (`:hover`, `:focus`) на replaced elements часто працюють — це стан, не generated content.

## Приклад

```css
/* ❌ Не працює на img */
img::after { content: '🔍'; }

/* ✅ Wrapper pattern */
.thumb {
  position: relative;
  display: inline-block;
}
.thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.4);
  opacity: 0;
  transition: opacity .2s;
}
.thumb:hover::after { opacity: 1; }
```

```html
<div class="thumb">
  <img src="photo.jpg" alt="Фото товару" />
</div>
```

## Юз кейси

- Галерея: zoom overlay на hover через wrapper, не через `img::before`
- Custom file input: приховати `<input type="file">`, стилізувати `<label>` з `::before`
- Avatar з online-індикатором: `span.avatar::after` для зеленої крапки

## Документація

- [Pseudo-elements — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
