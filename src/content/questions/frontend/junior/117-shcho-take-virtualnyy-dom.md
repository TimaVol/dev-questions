---
title: "Що таке віртуальний DOM?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 117
difficulty: easy
---

## Відповідь

Virtual DOM — легка JS-копія реального DOM. При зміні стану фреймворк будує нове дерево, порівнює з попереднім (diffing) і оновлює лише змінені вузли в реальному DOM.

## Приклад

```jsx
// React оновить лише текст, не перерендерює всю сторінку
function Counter() {
  const [n, setN] = useState(0);
  return <span onClick={() => setN(n + 1)}>{n}</span>;
}
```

## Юз кейси

- Лічильник кліків — оновлюється лише текст у `<span>`, не вся сторінка
- Фільтрація списку з 500 позицій — diff мінімізує перемальовування DOM

## Документація

- [Rendering — React](https://react.dev/learn/preserving-and-resetting-state)
