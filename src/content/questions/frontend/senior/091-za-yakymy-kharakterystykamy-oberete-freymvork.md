---
title: "За якими характеристиками оберете фреймворк для нового проєкту?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 91
difficulty: medium
---

## Відповідь

Матриця оцінки: **експертиза команди**, **ринок найму**, **тип проєкту** (SPA vs content vs hybrid), **SEO/SSR needs**, **performance**, **екосистема** (UI libs, auth, i18n), **long-term maintenance** (release cadence, breaking changes), **corporate backing**, **TypeScript DX**, **deployment target**. Оцінити 2–3 кандидати, написати ADR. React + Next — default для багатьох команд; Vue/Nuxt — швидкий CRUD; Svelte — perf-sensitive apps; Angular — enterprise regulated. Немає «best framework» — є best fit.

## Приклад

```markdown
| Criteria (weight)     | Next.js  | Remix   | Vite+React |
|-----------------------|----------|---------|------------|
| Team knows (25%)      | 9        | 5       | 8          |
| SEO/SSR (20%)         | 10       | 9       | 3          |
| Ecosystem (15%)       | 10       | 7       | 9          |
| Perf DX (15%)         | 8        | 8       | 9          |
| Hiring (15%)          | 10       | 6       | 9          |
| Ops cost (10%)        | 8        | 7       | 9          |
| **Weighted**          | **9.0**  | **6.8** | **7.2**    |

Decision: Next.js App Router — marketing SSR + dashboard SPA routes.
```

## Юз кейси

- B2B admin only: Vite SPA — простіше, без SSR cost
- Public docs + app: Next hybrid — SSG docs, auth app CSR routes
- 6-week MVP: stack, який команда вже знає, краще за «вчити Svelte на prod»

## Документація

- [HTTP-методи — MDN](https://developer.mozilla.org/uk/docs/Web/HTTP/Methods)
- [HTTP-статуси — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
