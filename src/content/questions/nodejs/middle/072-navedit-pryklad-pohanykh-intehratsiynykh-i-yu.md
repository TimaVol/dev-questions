---
title: "Наведіть приклад поганих інтеграційних і юніт-тестів."
topic: nodejs
grade: middle
category: "Тестування"
order: 72
difficulty: medium
---

## Відповідь

**Поганий unit test:**
- Тестує implementation, не behavior (`expect(mock).toHaveBeenCalled()` без assert result)
- Залежить від порядку виконання інших tests
- Тестує framework (перевіряє що Express працює)
- Немає assertion — лише «не throw»

**Поганий integration test:**
- Залежить від production DB
- Shared state між tests без cleanup
- Flaky через `setTimeout` без await
- Test too broad — entire app одним test без isolation
- Mock everything — тоді це unit, не integration

## Приклад

```js
// Поганий unit — тестує mock, не logic
it('calls repository', async () => {
  await service.getUser('1');
  assert.equal(repo.findById.mock.calls.length, 1); // meaningless
});

// Поганий integration — no cleanup, depends on existing data
it('gets users', async () => {
  const res = await request(app).get('/users');
  assert.ok(res.body.length > 0); // fails on empty test DB
});

// Поганий — flaky timing
it('sends email', (done) => {
  service.register(user);
  setTimeout(() => {
    assert.ok(emailSent); // race condition
    done();
  }, 100);
});
```

## Юз кейси

- Code review red flags для test quality
- Refactor: assert on return value, not call count
- TRUNCATE tables in beforeEach for integration

## Документація

- [Testing pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)
