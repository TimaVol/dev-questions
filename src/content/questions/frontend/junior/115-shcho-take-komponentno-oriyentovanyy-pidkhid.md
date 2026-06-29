---
title: "Що таке компонентно-орієнтований підхід?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 115
difficulty: easy
---

## Відповідь

UI розбивають на незалежні перевикористовувані компоненти — кожен інкапсулює розмітку, стилі й логіку. Компоненти вкладаються в дерево, дані передають через props, події — через callbacks.

## Приклад

```jsx
function Button({ label, onClick }) {
  return <button className="btn" onClick={onClick}>{label}</button>;
}
function Form() {
  return <Button label="Надіслати" onClick={handleSubmit} />;
}
```

## Юз кейси

- Дизайн-система: `Button`, `Input`, `Modal` — однакові компоненти на всіх сторінках
- Сторінка каталогу збирається з `<Header>`, `<ProductList>`, `<Footer>` без дублювання розмітки

## Документація

- [Your first component — React](https://react.dev/learn/your-first-component)
- [Composition — React](https://react.dev/learn/passing-props-to-a-component)
