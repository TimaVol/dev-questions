---
title: "Дизайнер консультується з вами щодо дизайну майбутнього проєкту. Які поради в контексті доступності ви йому дасте?"
topic: frontend
grade: middle
category: "Accessibility"
order: 103
difficulty: medium
---

## Відповідь

Порадив би дизайнеру: контраст мінімум 4.5:1 (AA), touch targets від 44×44px, стани не лише кольором (додати іконку/текст), видимий focus ring, alt для зображень, субтитри для відео, базовий розмір шрифту 16px+. Краще закласти a11y на етапі макету, ніж латати в коді.

## Приклад

```text
Чеклист для дизайну:
• Кнопки мін. 44×44 px
• Помилки форми — текст + іконка, не лише червона рамка
• Focus ring на всіх інтерактивних елементах
• Ієрархія h1 → h2 → h3 без пропусків рівнів
```

## Юз кейси

- Design review перед handoff у розробку
- Figma plugin для перевірки контрасту (Stark, Contrast)
- Палітра кольорів, що проходить AA з самого початку

## Документація

- [Contrast minimum — WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Target size — WCAG](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
