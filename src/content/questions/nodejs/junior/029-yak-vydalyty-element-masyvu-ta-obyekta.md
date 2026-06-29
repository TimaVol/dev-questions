---
title: "Як видалити елемент масиву та об’єкта?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 29
difficulty: easy
---

## Відповідь

**Масив:** `splice(i, 1)` — мутує на місці; `filter` — immutable новий масив; `delete arr[i]` залишає `empty` slot — рідко потрібно. **Об'єкт:** `delete obj.key` — видаляє властивість; destructuring `{ a, ...rest }` — immutable копія без поля. Для Map — `map.delete(key)`.

## Приклад

```js
const ids = [1, 2, 3, 4];
const without2 = ids.filter((id) => id !== 2); // [1, 3, 4]

const user = { id: 1, name: 'Ann', temp: true };
const { temp, ...clean } = user;
// clean: { id: 1, name: 'Ann' }

delete user.temp; // мутує user
```

## Юз кейси

- Видалення поля пароля перед `res.json(user)`
- Immutable update у stateless API handler
- `splice` для in-place редагування буфера подій

## Документація

- [Array.splice — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [delete — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
