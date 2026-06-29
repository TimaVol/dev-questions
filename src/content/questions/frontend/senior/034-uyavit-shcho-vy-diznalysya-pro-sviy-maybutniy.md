---
title: "Уявіть, що ви дізналися про свій майбутній проєкт. Це великий публічний мультимовний сайт з арабською та японською мовами включно. На проєкті вам будуть допомагати два джуніор-фронтендери. Опишіть, як ви сплануєте CSS-архітектуру та підготуєте своїх джунів для такого проєкту."
topic: frontend
grade: senior
category: "HTML/CSS"
order: 34
difficulty: hard
---

## Відповідь

i18n CSS architecture: **`dir="rtl"`** для Arabic — logical properties (`margin-inline-start` замість `margin-left`); **`:lang(ja)`** для CJK typography (line-break, font-family fallback); **no hardcoded widths** для text; **flex/grid** з logical properties. Tokens: font stacks per script (`--font-latin`, `--font-arabic`, `--font-japanese`). Junior onboarding: checklist (logical props, `dir` on `<html>`, test RTL mirror), Storybook stories для ar/ja, **Percy/Chromatic** visual regression per locale. Tooling: **i18next**, **crowdin**, **eslint-plugin-logical-assignment**.

## Приклад

```css
:root { --font-body: system-ui, sans-serif; }
:lang(ar) { --font-body: 'Noto Naskh Arabic', serif; }
:lang(ja) { --font-body: 'Noto Sans JP', sans-serif; line-break: strict; }

.card {
  margin-inline-start: 1rem; /* not margin-left */
  padding-inline: 1.5rem;
  border-inline-start: 3px solid var(--accent);
}

[dir="rtl"] .icon-arrow { transform: scaleX(-1); }
```

```html
<html lang="ar" dir="rtl">
```

Junior task template:

```markdown
- [ ] All spacing uses logical properties
- [ ] Screenshot test: ar, ja, en
- [ ] No fixed height on text containers
- [ ] Focus order correct in RTL
```

## Юз кейси

- Arabic checkout: RTL layout flip, numbers залишаються LTR у `<bdi>`
- Japanese legal text: `:lang(ja)` менший line-height, без orphan punctuation
- Junior PR review: catch `text-align: left` → `text-align: start`

## Документація

- [Arrays as structures — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
