---
title: "Чи знаєте підхід chaos engineering, якщо так, то як його можна застосувати на фронтенді?"
topic: frontend
grade: senior
category: "Тестування"
order: 81
difficulty: hard
---

## Відповідь

Chaos Engineering — контрольовані експерименти зі збоями, щоб знайти слабкі місця до production incident. На фронтенді «хаос» — це не лише DevOps: симулюємо повільний API, обрив WebSocket, 500 на критичному endpoint, порожню відповідь, timeout CDN, вимкнений feature flag під час сесії. Інструменти: MSW у staging, Toxiproxy, Chrome network throttling, Gremlin для infra. Перевіряємо гіпотезу: «користувач бачить зрозумілу помилку і може retry», а не білий екран. Починати з staging, фіксувати метрики error rate і recovery time.

## Приклад

```ts
// MSW — random failures у staging
http.get('/api/cart', async () => {
  if (Math.random() < 0.2) {
    return HttpResponse.json(null, { status: 503 });
  }
  return HttpResponse.json(cartFixture);
});
```

```tsx
function Cart() {
  const { data, error, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    retry: 2,
  });
  if (error) return <Banner type="error" action={{ label: 'Повторити', onClick: refetch }} />;
  return <CartItems items={data} />;
}
```

## Юз кейси

- Перед Black Friday: 30% запитів до cart API повертають 503 — кошик не губиться
- WebSocket disconnect: UI показує «з’єднання втрачено» і reconnect
- CDN down: fallback static assets з origin domain

## Документація

- [Principles of Chaos Engineering](https://principlesofchaos.org/)
- [MSW — Getting started](https://mswjs.io/docs/getting-started)
