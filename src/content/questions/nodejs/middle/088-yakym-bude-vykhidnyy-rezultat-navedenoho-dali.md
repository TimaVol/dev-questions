---
title: "Яким буде вихідний результат наведеного далі коду і чому? Поясніть, яким чином цей код виконується."
topic: nodejs
grade: middle
category: "Практичні завдання"
order: 88
difficulty: medium
---

## Відповідь

Класичне питання про **порядок виконання в event loop**: синхронний код → `process.nextTick` → microtasks (Promises) → macrotasks (таймери, I/O).

Для коду нижче вивід: **`A, C, E, D, B, F`**

- `A` — синхронний код
- `C` — nextTick (найвищий пріоритет після синхронного коду)
- `E` — microtask Promise
- `D` — nextTick всередині callback Promise
- `B` — macrotask setTimeout (фаза таймерів)
- `F` — setImmediate (фаза check, після poll; у головному модулі може бути перед/після timeout залежно від контексту)

На співбесіді: пояснити фази libuv і чому microtasks «з'їдають» цикл при нескінченному ланцюзі Promise.

## Приклад

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => {
  console.log('E');
  process.nextTick(() => console.log('D'));
});

process.nextTick(() => console.log('C'));

setImmediate(() => console.log('F'));

// Output: A, C, E, D, B, F
```

## Юз кейси

- Дебаг «неочікуваного» порядку async у middleware
- Чому `await` не гарантує негайне виконання наступного рядка в конкурентних обробниках
- Уникати рекурсії `process.nextTick` — блокує I/O

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
