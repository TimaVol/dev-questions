---
title: "Які основні відмінності між Angular і React?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 123
difficulty: medium
---

## Відповідь

Angular — повноцінний фреймворк (роутинг, HTTP, forms, DI з коробки), TypeScript-first, RxJS. React — бібліотека UI, екосистема окремо (Router, state). Angular — більше boilerplate, React — гнучкіший вибір інструментів.

## Приклад

```jsx
// React — мінімалістичний компонент
function Hello({ name }) {
  return <h1>Привіт, {name}</h1>;
}
```

## Юз кейси

- Enterprise з великою командою — Angular з єдиними конвенціями
- Стартап з швидкими ітераціями — React + обраний стек

## Документація

- [Angular — Overview](https://angular.dev/overview)
- [React Learn — React](https://react.dev/learn)
