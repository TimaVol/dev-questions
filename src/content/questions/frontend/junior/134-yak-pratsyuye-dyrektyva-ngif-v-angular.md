---
title: "Як працює директива ngIf в Angular?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 134
difficulty: easy
---

## Відповідь

`*ngIf` — structural directive: додає або видаляє елемент з DOM за умовою. `*ngIf="condition; else elseBlock"` — з альтернативним шаблоном. На відміну від `hidden`, елемент не існує в DOM.

## Приклад

```html
<div *ngIf="isLoggedIn; else login">
  <p>Вітаємо, {{ user.name }}</p>
</div>
<ng-template #login>
  <button>Увійти</button>
</ng-template>
```

## Юз кейси

- Показати admin-панель лише авторизованим
- Умовний рендер замість CSS `display: none`

## Документація

- [Angular — Built-in directives](https://angular.dev/guide/directives)
