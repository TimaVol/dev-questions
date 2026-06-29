---
title: "Що таке методологія Twelve-Factor App?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 17
difficulty: hard
---

## Відповідь

12 принципів cloud-native SaaS від Heroku: **Codebase** — один репозиторій, багато деплоїв; **Dependencies** — явні залежності (package-lock); **Config** — змінні середовища, не в коді; **Backing services** — БД/черга як підключені ресурси; **Build/release/run** — суворе розділення; **Processes** — без стану (stateless); **Port binding** — самодостатній HTTP; **Concurrency** — масштабування через процеси; **Disposability** — швидкий старт, graceful shutdown; **Dev/prod parity** — паритет dev і prod; **Logs** — потік подій у stdout; **Admin processes** — разові задачі (міграції) окремим процесом.

Для Node: `.env` не в git, `process.env.PORT`, health checks, обробка SIGTERM, `npm ci` у Docker, міграції через `node scripts/migrate.js`.

## Приклад

```js
// Config from env — 12-factor
const config = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DATABASE_URL, // backing service
  logLevel: process.env.LOG_LEVEL ?? 'info',
};

// Logs to stdout
logger.info({ event: 'server_start', port: config.port });
```

## Юз кейси

- Чеклист code review для нового Node.js-мікросервісу
- Деплой у Docker/K8s без секретів у образі
- Аудит legacy-застосунку на порушення (захардкоджений config, файлові сесії)

## Документація

- [Twelve-Factor App](https://12factor.net/)
