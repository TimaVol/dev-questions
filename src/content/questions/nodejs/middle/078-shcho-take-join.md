---
title: "Що таке JOIN?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 78
difficulty: medium
---

## Відповідь

**JOIN** — SQL операція об'єднання rows з двох+ tables за related columns (typically FK = PK).

Типи:
- **INNER JOIN** — лише matching rows з обох tables
- **LEFT JOIN** — всі з left + matching з right (NULL якщо немає match)
- **RIGHT JOIN** — mirror of LEFT
- **FULL OUTER JOIN** — всі з обох, NULL де немає match
- **CROSS JOIN** — Cartesian product

У Node.js/pg — JOIN у repository queries; уникати N+1 через JOIN або DataLoader.

## Приклад

```js
const { rows } = await pool.query(`
  SELECT u.id, u.email, o.id AS order_id, o.total
  FROM users u
  INNER JOIN orders o ON o.user_id = u.id
  WHERE u.id = $1
  ORDER BY o.created_at DESC
`, [userId]);
```

## Юз кейси

- User + orders list в одному query
- LEFT JOIN для users без orders (reporting)
- JOIN vs separate queries — performance trade-off

## Документація

- [SQL JOIN — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Join)
