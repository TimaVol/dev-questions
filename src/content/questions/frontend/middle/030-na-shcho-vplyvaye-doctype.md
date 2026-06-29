---
title: "На що впливає doctype?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 30
difficulty: easy
---

## Відповідь

`<!DOCTYPE html>` вмикає standards mode. Без DOCTYPE — quirks mode з емуляцією старих багів IE, що ламає box model і CSS layout.

## Приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><title>App</title></head>
<body>...</body>
</html>
```

## Юз кейси

- HTML5 boilerplate для нового проєкту
- Fix layout bugs у legacy без DOCTYPE
- Email HTML з transitional DOCTYPE

## Документація

- [DOCTYPE — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Doctype)
