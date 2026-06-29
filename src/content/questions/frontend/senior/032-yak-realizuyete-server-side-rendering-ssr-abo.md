---
title: "Як реалізуєте server-side rendering (SSR) або static site generation (SSG) із CSS-in-JS, перед якими викликами ви можете постати в цьому контексті?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 32
difficulty: hard
---

## Відповідь

CSS-in-JS (styled-components, Emotion) на SSR потребує **extract critical styles** під час render, інакше FOUC. Виклики: (1) **runtime cost** — JS генерує CSS на сервері; (2) **hydration mismatch** — class names різні server/client; (3) **bundle size** — CSS-in-JS runtime у client bundle; (4) **RSC incompatibility** — багато libs не працюють у Server Components. Рішення: **zero-runtime** (Linaria, Panda CSS, Vanilla Extract), **SSR APIs** (`ServerStyleSheet` у styled-components v5), або **CSS Modules/Tailwind** для SSR-first frameworks (Next.js).

## Приклад

styled-components SSR (legacy pattern):

```tsx
// pages/_document.tsx (Next.js Pages)
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
```

Modern alternative — Panda CSS (build-time):

```tsx
import { css } from '../styled-system/css';
<div className={css({ bg: 'blue.500', p: '4' })} />
// zero runtime, static CSS file
```

## Юз кейси

- Migration: styled-components → Tailwind за 2 sprints, SSR FOUC усунено
- Next App Router: уникати CSS-in-JS у RSC; CSS Modules у server components
- Perf audit: CSS-in-JS runtime +40KB — перехід на Vanilla Extract

## Документація

- [CSS-in-JS with Next.js — Next.js](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)
- [Next.js — App Router](https://nextjs.org/docs/app)
