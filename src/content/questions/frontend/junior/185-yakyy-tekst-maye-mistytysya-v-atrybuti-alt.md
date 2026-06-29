---
title: "Який текст має міститися в атрибуті alt?"
topic: frontend
grade: junior
category: "Accessibility"
order: 185
difficulty: easy
---

## Відповідь

Alt — текстовий опис змісту зображення для скрінрідерів і коли img не завантажився. Описуй суть, не «картинка» чи ім'я файлу. Декоративні img — `alt=""`.

## Приклад

```html
<img src="team.jpg" alt="Команда з п'яти людей на офісній зустрічі">
<img src="divider.svg" alt="" role="presentation">
```

## Юз кейси

- Фото товару — «Червоні кросівки Nike Air Max»
- Декоративний фон — порожній alt

## Документація

- [alt — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt)
- [img — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
