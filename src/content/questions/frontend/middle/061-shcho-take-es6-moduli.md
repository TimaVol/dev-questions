---
title: "Що таке ES6-модулі?"
topic: frontend
grade: middle
category: "JavaScript"
order: 61
difficulty: medium
---

## Відповідь

ES modules (`import`/`export`) — стандартна модульна система JS зі статичним аналізом, що дозволяє tree-shaking. Кожен модуль у strict mode з власним scope. `import()` — динамічне завантаження для code splitting. CommonJS (`require`) — legacy Node, синхронний і гірше оптимізується bundler’ом.

## Приклад

```js
import { formatDate } from './utils.js';
export { formatDate };

const { HeavyChart } = await import('./HeavyChart.js');
```

## Юз кейси

- Tree-shaking невикористаного коду в prod-білді
- Lazy route через dynamic import
- Нативні ESM у Vite без додаткової конфігурації

## Документація

- [Modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
