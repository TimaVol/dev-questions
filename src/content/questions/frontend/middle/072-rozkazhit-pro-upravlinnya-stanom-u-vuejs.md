---
title: "Розкажіть про управління станом у Vue.js."
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 72
difficulty: medium
---

## Відповідь

Vue 3: `ref`/`reactive` для локального стану компонента, `computed` — похідні значення, `watch` — side effects. Глобальний стан — Pinia (наступник Vuex). `provide/inject` — для глибокого дерева без prop drilling (тема, locale). Composition API дає логічне групування коду.

## Приклад

```js
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
```

## Юз кейси

- Pinia store для авторизації та профілю
- `provide/inject` для теми в глибокому дереві компонентів
- `computed` для відфільтрованого списку товарів

## Документація

- [Pinia — Docs](https://pinia.vuejs.org/introduction.html)
- [State management — Vue](https://vuejs.org/guide/scaling-up/state-management.html)
