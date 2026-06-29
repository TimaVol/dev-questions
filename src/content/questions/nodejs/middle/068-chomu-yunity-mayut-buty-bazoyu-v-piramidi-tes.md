---
title: "Чому юніти мають бути базою в піраміді тестування?"
topic: nodejs
grade: middle
category: "Тестування"
order: 68
difficulty: medium
---

## Відповідь

**Піраміда тестування**: багато unit-тестів (основа) → менше інтеграційних → мало e2e (вершина).

Unit-тести:
- **Швидкі** — мілісекунди, тисячі на хвилину
- **Ізольовані** — мок DB/зовнішніх API
- **Точний збій** — конкретна функція/рядок
- **Дешеві** — без інфраструктури

E2E/інтеграційні — повільні, нестабільні, дорогі в підтримці. Якщо основа слабка — кожен баг ловиться e2e (години CI, хибні спрацювання).

Unit покриває бізнес-логіку; інтеграційні — зв'язування; e2e — критичні user journey.

## Приклад

```js
// Unit — pure function, no DB
function validateOrder(order) {
  if (order.items.length === 0) throw new Error('Empty order');
  if (order.total < 0) throw new Error('Invalid total');
  return true;
}

// Integration — real DB (testcontainer)
it('creates order in postgres', async () => {
  const order = await orderRepo.create({ userId: '1', total: 99 });
  assert.ok(order.id);
});

// E2E — full HTTP flow (few tests)
it('POST /orders returns 201', async () => {
  const res = await request(app).post('/orders').send(validPayload);
  assert.equal(res.status, 201);
});
```

## Юз кейси

- Співвідношення 70% unit / 20% integration / 10% e2e
- Мок pg pool у unit, Testcontainers у integration
- Швидкий зворотний зв'язок у pre-commit hook

## Документація

- [Testing pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)
