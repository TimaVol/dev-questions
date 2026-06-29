---
title: "Як забезпечити консистентність результатів тестування в різних середовищах (розробка, тестування, продакшн)?"
topic: frontend
grade: senior
category: "Тестування"
order: 79
difficulty: hard
---

## Відповідь

Flaky tests часто = environment drift. Виправлення: **однакова Node version** (.nvmrc), **детерміновані дані** (faker seed, fixed clocks з `@sinonjs/fake-timers`), **mock зовнішніх сервісів** (MSW, не real API в unit), **Docker** для e2e DB parity, **env vars** задокументовані в `.env.example`, **timezone UTC** у CI (`TZ=UTC`), **вимкнути анімації** в e2e (`prefers-reduced-motion` або CSS). Staging дзеркалить prod: той самий build artifact, feature flags config. Ніколи не тестувати проти prod write APIs.

## Приклад

```ts
// vitest.setup.ts
import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
});
```

Playwright consistent env:

```ts
// playwright.config.ts
export default defineConfig({
  use: {
    timezoneId: 'Europe/Kyiv',
    locale: 'uk-UA',
    extraHTTPHeaders: { 'Accept-Language': 'uk' },
  },
});
```

Docker compose for e2e:

```yaml
services:
  app:
    build: .
    environment:
      API_URL: http://mock-server:4010
  mock-server:
    image: mockserver/mockserver
```

## Юз кейси

- Date-dependent UI «закінчується через 2 дні» — fake timers у unit tests
- CI проходить, local падає: Node version mismatch — enforce engines у package.json
- E2E payment: Stripe test mode keys лише на staging, ніколи prod keys у CI

## Документація

- [Vitest — Test environments](https://vitest.dev/guide/environment.html)
- [Playwright — Test configuration](https://playwright.dev/docs/test-configuration)
