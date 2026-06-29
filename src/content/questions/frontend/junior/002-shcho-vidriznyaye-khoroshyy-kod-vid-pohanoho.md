---
title: "Що відрізняє хороший код від поганого?"
topic: frontend
grade: junior
category: "Загальні питання"
order: 2
difficulty: medium
---

## Відповідь

Хороший код читається без коментарів: зрозумілі імена, малі функції з однією відповідальністю, передбачувана обробка помилок. Поганий — це copy-paste, magic numbers, god-компоненти на 500 рядків і тісне зв'язування модулів.

## Приклад

```js
// Погано: все в одній функції
function handleSubmit(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  if (!email.includes('@')) return alert('Помилка');
  fetch('/api', { method: 'POST', body: JSON.stringify({ email }) });
}

// Краще: валідація окремо, early return
function isValidEmail(email) {
  return email.includes('@');
}
```

## Юз кейси

- Code review — швидко знайти дублювання логіки між компонентами
- Рефакторинг legacy-модуля перед додаванням нової фічі
