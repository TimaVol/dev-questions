---
title: "Дизайнер наполягає на кастомізації стилів нативних елементів форм. Як ви підійдете до цього завдання?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 26
difficulty: medium
---

## Відповідь

Кастомні форми — баланс між **design fidelity** і **accessibility/platform UX**. Підхід: (1) **`accent-color`** + **`color-scheme`** — мінімальна кастомізація з native behavior; (2) **`appearance: none`** + власні стилі — повний контроль, але потрібні **focus states**, **keyboard**, **ARIA**; (3) **headless library** (Radix, React Aria) — стилі свої, логіка a11y готова. Ніколи не прибирайте native `<select>` без повної keyboard support (arrow keys, typeahead). Checkbox/radio — приховати visually (`sr-only`), не `display: none` (screen readers). Протестувати: VoiceOver, NVDA, mobile zoom 200%.

## Приклад

Кастомний checkbox з збереженням a11y:

```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input sr-only" />
  <span class="checkbox__box" aria-hidden="true"></span>
  <span class="checkbox__label">Погоджуюсь з умовами</span>
</label>
```

```css
.checkbox__box {
  width: 20px; height: 20px; border: 2px solid var(--border);
  border-radius: 4px; display: inline-flex; align-items: center;
}
.checkbox__input:focus-visible + .checkbox__box {
  outline: 2px solid var(--focus); outline-offset: 2px;
}
.checkbox__input:checked + .checkbox__box {
  background: var(--primary);
  background-image: url("data:image/svg+xml,..."); /* checkmark */
}
```

## Юз кейси

- Design system: один `<Checkbox>` component, Radix primitive + Tailwind tokens
- iOS date picker: не замінюйте `<input type="date">` на custom без mobile fallback
- Audit: custom select без `aria-expanded` — P1 a11y bug

## Документація

- [appearance — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance)
- [Styling form controls — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Styling_web_forms)
