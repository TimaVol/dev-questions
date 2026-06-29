---
title: "Node.js інтерпретує чи компілює код програми?"
topic: nodejs
grade: junior
category: "Node.js"
order: 7
difficulty: easy
---

## Відповідь

Node.js **компілює** JavaScript через рушій V8, а не інтерпретує рядок за рядком. V8 застосовує JIT-компіляцію: спочатку код парситься в AST, потім компілюється в машинний код (Ignition + TurboFan). При повторних викликах гарячі функції оптимізуються. Тому Node — це compiled runtime, хоча розробник пише JS без окремого кроку збірки.

## Приклад

```js
// V8 оптимізує цю функцію після багатьох викликів
function sum(arr) {
  let total = 0;
  for (const n of arr) total += n;
  return total;
}

console.time('sum');
for (let i = 0; i < 1e6; i++) sum([1, 2, 3, 4, 5]);
console.timeEnd('sum');
```

## Юз кейси

- Розуміння, чому «гарячі» цикли в продакшені швидші за перший запуск
- Пояснення різниці між Node і класичними інтерпретаторами (Python без PyPy)
- Вибір між CommonJS і ESM не впливає на спосіб компіляції V8

## Документація

- [V8 engine — Node.js](https://nodejs.org/en/docs/guides/getting-started-guide#the-v8-javascript-engine)
