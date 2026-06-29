---
title: "Що ви робите, щоб код було легше підтримувати?"
topic: frontend
grade: middle
category: "Загальні запитання"
order: 8
difficulty: medium
---

## Відповідь

Зрозумілі імена, малі функції, типи, тести на критичну логіку. ESLint + Prettier + CI. ADR для нетривіальних рішень. Видаляю мертвий код.

## Приклад

```ts
export function calcTotal(items: CartItem[], prices: Record<string, number>) {
  return items.reduce((sum, i) => sum + i.qty * (prices[i.id] ?? 0), 0);
}
```

## Юз кейси

- Рефакторинг legacy з тестами
- Pre-commit hooks для стилю
- `knip` для невикористаних експортів

