---
title: "Яка відмінність між var, let і const? Чому варто використовувати const, якщо змінна не буде змінюватися далі в коді?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 22
difficulty: easy
---

## Відповідь

`var` — function scope, hoisting з `undefined`, можна redeclare. `let` і `const` — block scope, Temporal Dead Zone до оголошення, redeclare заборонено. `const` забороняє переприсвоєння, але вміст об'єкта/масиву можна мутувати. `const` за замовчуванням сигналізує «не переприсвоювати» — менше багів і краще для рефакторингу.

## Приклад

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}

const config = { port: 3000 };
config.port = 8080; // OK — мутуємо властивість
// config = {} — SyntaxError
```

## Юз кейси

- `const` для імпортів, конфігів, результатів `await`
- `let` для лічильників у циклах і reassign
- Уникати `var` у сучасному Node/TS-коді

## Документація

- [let/const — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/let)
- [const — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/const)
