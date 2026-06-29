---
title: "Які проблеми з вебдоступністю трапляються в SPA-застосунках найчастіше?"
topic: frontend
grade: middle
category: "Accessibility"
order: 102
difficulty: medium
---

## Відповідь

У SPA часті проблеми: фокус губиться при зміні маршруту, динамічний контент без `aria-live`, не оновлюється `document.title`, `div` замість `<button>`, модалки без focus trap, зображення без `alt`, низький контраст. Client-only рендер без SSR — порожня сторінка для краулерів і повільний first paint.

## Приклад

```tsx
useEffect(() => {
  document.getElementById('main')?.focus();
  document.title = `${pageTitle} — MyApp`;
}, [pageTitle]);
```

## Юз кейси

- Перенос фокусу на `<main>` після client-side navigate
- `aria-live="polite"` для toast-повідомлень
- Оновлення title при зміні маршруту для скрінрідерів

## Документація

- [ARIA Authoring Practices — W3C](https://www.w3.org/WAI/ARIA/apg/)
- [Keyboard-navigable JavaScript widgets — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Keyboard-navigable_JavaScript_widgets)
