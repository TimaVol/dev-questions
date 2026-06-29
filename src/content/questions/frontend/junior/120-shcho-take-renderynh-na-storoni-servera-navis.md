---
title: "Що таке рендеринг на стороні сервера? Навіщо він потрібен, які є підходи?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 120
difficulty: medium
---

## Відповідь

SSR — HTML генерується на сервері, браузер одразу бачить контент. Краще SEO і FCP. Підходи: SSR (кожен запит), SSG (build time), ISR (регенерація), CSR (клієнтський рендер).

## Приклад

```jsx
// Next.js — серверний компонент
export default async function Page() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

## Юз кейси

- Блог/маркетплейс — SSG або SSR для SEO
- Admin dashboard — CSR достатньо

## Документація

- [Next.js — App Router](https://nextjs.org/docs/app)
- [Rendering on the Web — web.dev](https://web.dev/articles/rendering-on-the-web)
