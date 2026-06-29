---
title: "Що таке new Set() і new Map()?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 38
difficulty: easy
---

## Відповідь

**Set** — колекція унікальних значень (примітиви за значенням, об'єкти за посиланням). Методи: `add`, `delete`, `has`, `size`. **Map** — пари ключ-значення; ключі будь-якого типу (на відміну від object). Методи: `set`, `get`, `has`, `delete`. Обидва ітеруються; порядок вставки зберігається.

## Приклад

```js
const seen = new Set();
for (const id of incomingIds) {
  if (seen.has(id)) continue;
  seen.add(id);
  await process(id);
}

const cache = new Map();
cache.set(userId, { fetchedAt: Date.now(), data });
const hit = cache.get(userId);
```

## Юз кейси

- Set для дедуплікації ID перед batch insert
- Map як in-memory TTL-кеш у Node-процесі
- `Map` для підрахунку частот без `Object` key coercion

## Документація

- [Map — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Set)
