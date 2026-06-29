---
title: "Що таке функції-генератори і яке їх практичне застосування?"
topic: frontend
grade: middle
category: "JavaScript"
order: 70
difficulty: medium
---

## Відповідь

Генератор (`function*`) повертає ітератор і може призупинятись на `yield`, відновлюючись через `.next()`. Корисний для lazy-послідовностей, custom iterators і потокової обробки без завантаження всього в пам’ять. Після async/await у повсякденному UI рідкісний, але добре демонструє ітерабельність ES6.

## Приклад

```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

## Юз кейси

- Генерація унікальних тимчасових id на клієнті
- Lazy pagination — `yield` наступної порції даних
- Custom async flow у legacy-коді до появи async/await

## Документація

- [Generators — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
