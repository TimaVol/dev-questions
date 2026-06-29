---
title: "Як зробити посилання, з якого можна завантажити прикріплений файл?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 32
difficulty: medium
---

## Відповідь

`<a href="/files/report.pdf" download="report-2024.pdf">` — атрибут `download`. Cross-origin може не спрацювати без `Content-Disposition: attachment` на сервері.

## Приклад

```html
<a href="/api/export/orders.csv" download="orders.csv">
  Завантажити CSV
</a>
```

## Юз кейси

- Експорт звіту з адмін-панелі
- Завантаження PDF з same-origin API
- Fallback через `window.open` для cross-origin

## Документація

- [download attribute — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download)
- [Blob — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
