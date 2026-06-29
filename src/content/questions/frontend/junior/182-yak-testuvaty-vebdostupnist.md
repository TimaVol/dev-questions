---
title: "Як тестувати вебдоступність?"
topic: frontend
grade: junior
category: "Accessibility"
order: 182
difficulty: medium
---

## Відповідь

Автоматично: axe DevTools, Lighthouse accessibility audit, eslint-plugin-jsx-a11y. Вручну: навігація тільки клавіатурою, VoiceOver/NVDA, перевірка контрасту, масштаб 200%.

## Приклад

```bash
# axe в CI
npx @axe-core/cli https://localhost:3000
```

## Юз кейси

- axe в CI — ловить відсутні alt і aria
- Ручний тест: Tab через модалку, Escape закриває

## Документація

- [Accessibility testing — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling)
- [WCAG — W3C](https://www.w3.org/WAI/standards-guidelines/wcag/)
