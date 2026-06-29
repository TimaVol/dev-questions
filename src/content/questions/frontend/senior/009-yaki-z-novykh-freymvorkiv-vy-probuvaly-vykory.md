---
title: "Які з нових фреймворків ви пробували використовувати?"
topic: frontend
grade: senior
category: "Загальні запитання"
order: 9
difficulty: medium
---

## Відповідь

Senior пробує нове не заради hype, а щоб зрозуміти trade-offs для конкретних задач. З останніх років варто згадати: **Astro** (islands, мінімум JS на контентних сайтах), **Qwik** (resumability, lazy hydration), **Solid** (fine-grained reactivity без VDOM), **Svelte 5** (runes замість stores), **Remix/React Router v7** (loaders/actions, progressive enhancement). На співбесіді сильна відповідь — не список назв, а «де пробував, що сподобалось, чому не взяли в production»: команда, ecosystem, hiring, migration cost.

## Приклад

Spike на Astro для docs-сайту замість Next.js:

```astro
---
// src/pages/docs/[slug].astro
import { getCollection } from 'astro:content';
const posts = await getCollection('docs');
---
<ul>
  {posts.map(p => <li><a href={`/docs/${p.slug}`}>{p.data.title}</a></li>)}
</ul>
<!-- React-віджет лише там, де потрібна інтерактивність -->
<Search client:visible />
```

Результат: 0 KB client JS на статичних сторінках проти ~80 KB у SPA-варіанті. В production лишили Next через спільний monorepo з основним продуктом.

## Юз кейси

- Маркeting landing: Astro + partial hydration замість повного React SPA
- Внутрішній admin з real-time: Solid або React — де потрібен зрілий ecosystem DevTools
- PoC нового фреймворку: 2-денний spike з метриками bundle size, TTI, DX — перед ADR
