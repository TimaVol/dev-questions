---
title: "Чи відомі принципи DRY, KISS, YAGNI ?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 73
difficulty: easy
---

## Відповідь

DRY — не дублюй логіку, винось у функції/модулі. KISS — найпростіше рішення, що працює. YAGNI — не пиши код «на майбутнє», поки реальної потреби немає.

## Приклад

```js
// DRY — одна функція замість copy-paste
function formatPrice(cents) {
  return (cents / 100).toFixed(2) + ' ₴';
}
```

## Юз кейси

- Винести повторювану валідацію email у shared util
- Не будувати абстракцію «на всі випадки» до другого реального use case
