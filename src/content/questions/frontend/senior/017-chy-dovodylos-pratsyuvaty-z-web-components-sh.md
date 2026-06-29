---
title: "Чи доводилось працювати з Web Components? Що таке Shadow DOM?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 17
difficulty: hard
---

## Відповідь

**Web Components** — стандартні браузерні API: Custom Elements (власні теги), Shadow DOM (інкапсуляція), HTML Templates, ES Modules. **Shadow DOM** — ізольоване піддерево DOM з власними стилями: зовнішній CSS не проникає всередину (і навпаки), що ідеально для widget library без конфліктів з host page. Режими: `open` (доступ через `element.shadowRoot`) і `closed`. Interop з React обмежений: React не повністю підтримує custom events і slot composition як Vue/Svelte. Типові кейси: design system для кількох фреймворків, embeddable widgets (чат, плеєр), поступова міграція legacy jQuery → WC.

## Приклад

```js
class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { display: block; border: 1px solid #ccc; padding: 1rem; }
        .name { font-weight: bold; }
      </style>
      <span class="name"></span>
      <slot name="actions"></slot>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.name').textContent = this.getAttribute('name');
  }
}
customElements.define('user-card', UserCard);
```

```html
<user-card name="Олена">
  <button slot="actions">Написати</button>
</user-card>
```

## Юз кейси

- Widget для клієнтів на різних CMS: один WC, embed через `<script>` + custom tag
- Design system (Lit/Shoelace): shared components між React і Angular apps
- Shadow DOM для ізоляції third-party стилів на white-label платформі

## Документація

- [Web Components — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Custom elements — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
