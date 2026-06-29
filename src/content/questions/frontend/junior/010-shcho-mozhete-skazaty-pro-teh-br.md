---
title: "Що можете сказати про тег <br>?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 10
difficulty: easy
---

## Відповідь

`<br>` робить примусовий перенос рядка всередині текстового блоку. Для відступів між секціями використовуй margin/padding, а не кілька `<br>` підряд.

## Приклад

```html
<p>
  Перший рядок адреси<br>
  Другий рядок, місто
</p>
```

## Юз кейси

- Адреса або вірш, де потрібен перенос у середині абзацу
- Підпис під зображенням у `<figure>` без окремого блоку

## Документація

- [br element — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br)
