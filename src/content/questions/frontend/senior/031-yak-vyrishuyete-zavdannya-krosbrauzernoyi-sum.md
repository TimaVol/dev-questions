---
title: "Як вирішуєте завдання кросбраузерної сумісності на етапі розробки та як уникнути непорозумінь між розробниками та QA-командою під час тестування на різних браузерах?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 31
difficulty: hard
---

## Відповідь

Процес: (1) **Browser support matrix** — documented (Chrome last 2, Safari last 2, Firefox ESR, no IE); (2) **Baseline** (web.dev) — перевірка нових API; (3) **Autoprefixer + @supports** — progressive enhancement; (4) **Can I Use** у ADR для нових фіч; (5) **Browserslist** у package.json — single source. З QA: shared **test matrix spreadsheet**, BrowserStack/Playwright cross-browser CI, bug template з browser/version/OS/screenshot. «Works on my Chrome» — не аргумент; reproducible env через Docker + Playwright projects.

## Приклад

```json
// package.json
"browserslist": ["> 0.5%", "last 2 versions", "not dead", "not op_mini all"]
```

```css
.grid {
  display: flex; /* fallback */
  gap: 1rem;
}
@supports (display: grid) {
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
}
```

Playwright multi-browser:

```ts
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
],
```

## Юз кейси

- Safari iOS date input: native picker fallback, не лише custom
- QA bug «не працює в Safari»: Playwright trace + `@supports` gap виявлено
- New CSS feature: `@container` з `@supports not` fallback на media query

## Документація

- [Can I use](https://caniuse.com/)
