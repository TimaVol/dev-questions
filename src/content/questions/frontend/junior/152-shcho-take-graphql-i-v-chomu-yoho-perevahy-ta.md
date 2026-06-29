---
title: "Що таке GraphQL і в чому його переваги та недоліки порівняно з REST?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 152
difficulty: easy
---

## Відповідь

GraphQL — один endpoint, клієнт запитує потрібні поля. Плюси: немає over/under-fetching, сильна типізація (schema). Мінуси: складніший кеш, N+1 на бекенді без DataLoader, крива навчання.

## Приклад

```graphql
query {
  user(id: "1") {
    name
    posts { title }
  }
}
```

## Юз кейси

- Мобільний клієнт — мінімум полів для економії трафіку
- REST краще для простого CRUD і CDN-кешування

## Документація

- [GraphQL — Learn](https://graphql.org/learn/)
