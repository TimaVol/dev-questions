---
title: "Чи стежите ви за новинами у світі фронтенду? Як саме?"
topic: frontend
grade: junior
category: "Загальні питання"
order: 1
difficulty: easy
---

## Відповідь

Стежу за MDN, release notes фреймворків (React, Next, Vite) і кількома newsletters на кшталт JavaScript Weekly. Раз на тиждень переглядаю changelog залежностей у проєкті — цікаве одразу пробую в pet-project.

## Приклад

```js
// Перевірка підтримки нового API перед використанням
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => prefetch('/dashboard'));
}
```

## Юз кейси

- Оцінка ризику оновлення залежностей перед мажорним апдейтом
- Швидке прототипування нової фічі (наприклад, View Transitions API) у side-project
