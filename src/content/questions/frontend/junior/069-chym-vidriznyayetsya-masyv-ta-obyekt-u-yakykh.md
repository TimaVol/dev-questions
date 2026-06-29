---
title: "Чим відрізняється масив та обʼєкт? У яких випадках що використовуєте?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 69
difficulty: easy
---

## Відповідь

Масив — впорядкований список з числовими індексами, методи `map`/`filter`. Об'єкт — колекція ключ-значення з іменованими полями. Масив для списків, об'єкт для сутностей з полями.

## Приклад

```js
const users = [{ id: 1, name: 'Оля' }, { id: 2, name: 'Петро' }];
const user = { id: 1, name: 'Оля', role: 'admin' };
```

## Юз кейси

- Масив — список товарів у кошику
- Об'єкт — конфіг API з полями `baseUrl`, `timeout`

## Документація

- [Array — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Object — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Object)
