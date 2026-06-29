---
title: "Які переваги та недоліки використання TypeScript?"
topic: frontend
grade: junior
category: "TypeScript"
order: 94
difficulty: easy
---

## Відповідь

Плюси: менше runtime-багів, кращий DX, самодокументований код. Мінуси: крок компіляції, крива навчання, інколи боротьба з типами для складних бібліотек.

## Приклад

```ts
interface User { id: number; email: string; }
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```

## Юз кейси

- Великий командний проєкт з довгим життєвим циклом
- Маленький прототип — JS може бути швидшим стартом

## Документація

- [TypeScript intro — TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
