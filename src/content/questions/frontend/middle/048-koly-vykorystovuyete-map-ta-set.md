---
title: "Коли використовуєте Map та Set?"
topic: frontend
grade: middle
category: "JavaScript"
order: 48
difficulty: medium
---

## Відповідь

**Map** — ключ будь-якого типу, O(1) get/set, порядок вставки. **Set** — унікальні значення. Краще за object/array для частого lookup і дедуплікації.

## Приклад

```js
const priceById = new Map(products.map((p) => [p.id, p.price]));
const uniqueTags = new Set(posts.flatMap((p) => p.tags));
```

## Юз кейси

- Map для кешу API-відповідей по id
- Set для унікальних user ids
- Map замість `{}` з не-string ключами

## Документація

- [Map — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Set)
