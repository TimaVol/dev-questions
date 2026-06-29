---
title: "У чому різниця між оптимістичним та песимістичним блокуванням?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 46
difficulty: medium
---

## Відповідь

**Песимістичне блокування** — lock рядка/таблиці наперед (`SELECT FOR UPDATE`, `FOR SHARE`); інші TX чекають. Висока конкуренція → черги, deadlocks. Добре, коли конфлікти часті (гарячий рядок інвентарю).

**Оптимістичне блокування** — читання без lock, запис з перевіркою версії (`WHERE version = ?`); конфлікт → retry або fail. Добре, коли конфлікти рідкі, високе співвідношення read/write, розподілені системи без довготривалих DB locks.

Node ORM: Prisma `$transaction` + поле version; TypeORM `@VersionColumn`. Вибір за метриками конкуренції, не за ідеологією.

## Приклад

```js
// Optimistic — Prisma style
async function updateStock(productId, expectedVersion, delta) {
  const result = await prisma.product.updateMany({
    where: { id: productId, version: expectedVersion },
    data: { stock: { decrement: delta }, version: { increment: 1 } },
  });
  if (result.count === 0) throw new ConflictError('Retry');
}
```

```sql
-- Pessimistic
BEGIN;
SELECT * FROM products WHERE id = 1 FOR UPDATE;
UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;
```

## Юз кейси

- Flash sale в e-commerce — песимістичне на рядку SKU
- Оновлення профілю — оптимістичне з колонкою version
- Крок distributed saga — оптимістичне + ідемпотентний retry

## Документація

- [PostgreSQL — Explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html)
