---
title: "Як збираєте React-застосунок?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 71
difficulty: medium
---

## Відповідь

Сучасний default: **Vite** (`@vitejs/plugin-react`) — швидкий HMR, Rollup production build. Альтернативи: **Next.js** (SSR/RSC, вбудований routing), **Remix**, **CRA** (legacy). Pipeline: TypeScript compile → bundle (tree-shake, code split) → minify (esbuild/swc) → hash assets → source maps (hidden у prod). Env: `import.meta.env.VITE_*`. CI: `tsc --noEmit`, `vitest`, `vite build`, upload на CDN. Аналіз: `rollup-plugin-visualizer`.

## Приклад

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: { vendor: ['react', 'react-dom'], query: ['@tanstack/react-query'] },
      },
    },
  },
});
```

```json
// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "analyze": "vite build --mode analyze"
  }
}
```

## Юз кейси

- SPA deploy: `dist/` → S3 + CloudFront, `index.html` no-cache, assets immutable
- Next.js: `next build` → Vercel, автоматична image/font optimization
- Library package: tsup/vite lib mode — ESM + CJS dual publish

## Документація

- [Vite — Guide](https://vite.dev/guide/)
- [Creating a React app — React](https://react.dev/learn/creating-a-react-app)
