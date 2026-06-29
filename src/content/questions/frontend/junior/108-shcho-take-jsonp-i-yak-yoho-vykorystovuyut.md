---
title: "Що таке JSONP і як його використовують?"
topic: frontend
grade: junior
category: "API браузера"
order: 108
difficulty: easy
---

## Відповідь

JSONP — обхід CORS через `<script src="api?callback=fn">`: сервер повертає `fn(data)`. Застарілий і небезпечний підхід. Сьогодні — CORS або проксі на бекенді.

## Приклад

```html
<!-- Legacy JSONP -->
<script>
function handleData(data) { console.log(data); }
</script>
<script src="https://api.example.com/data?callback=handleData"></script>
```

## Юз кейси

- Legacy API без CORS (рідко зустрічається)
- Заміна — `fetch` з правильними CORS-заголовками

## Документація

- [JSONP — MDN](https://developer.mozilla.org/en-US/docs/Glossary/JSONP)
