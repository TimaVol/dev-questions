---
title: "Як ви робите серверний рендеринг у Next.js? Які переваги цього підходу?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 132
difficulty: medium
---

## Відповідь

У App Router — Server Components за замовчуванням, async-компоненти з fetch на сервері. Pages Router — `getServerSideProps` або `getStaticProps`. Переваги: швидший FCP, SEO, менше JS на клієнті.

## Приклад

```jsx
// app/page.tsx — Server Component
export default async function Page() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return <PostList posts={posts} />;
}
```

## Юз кейси

- Блог з SSG — статичні сторінки на build
- Динамічний каталог — SSR на кожен запит

## Документація

- [Next.js — App Router](https://nextjs.org/docs/app)
