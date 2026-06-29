---
title: "Наведіть приклади реалізації патерну Observer у браузері."
topic: frontend
grade: senior
category: "JavaScript"
order: 43
difficulty: hard
---

## Відповідь

**Observer** — publish/subscribe: subject сповіщає listeners при зміні. Нативні API браузера: **EventTarget** (`addEventListener`), **MutationObserver** (зміни DOM), **IntersectionObserver** (видимість), **ResizeObserver** (розмір елемента), **PerformanceObserver** (метрики), **BroadcastChannel** (між вкладками). Власна реалізація — Map подія → Set callbacks. Senior обирає platform API замість самописного pub/sub — менше багів, краща продуктивність.

## Приклад

Custom EventEmitter:

```js
class Store extends EventTarget {
  #state = { count: 0 };
  get state() { return this.#state; }
  increment() {
    this.#state = { ...this.#state, count: this.#state.count + 1 };
    this.dispatchEvent(new CustomEvent('change', { detail: this.#state }));
  }
}
const store = new Store();
store.addEventListener('change', (e) => console.log('count:', e.detail.count));
store.increment();
```

IntersectionObserver — lazy load:

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      io.unobserve(img);
    }
  });
}, { rootMargin: '200px' });
document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));
```

## Юз кейси

- ResizeObserver: перепозиціонувати dropdown при зміні розміру контейнера
- MutationObserver: синхронізувати зміни DOM стороннього віджета (крайній випадок)
- BroadcastChannel: logout в одній вкладці → очистити session у всіх вкладках

## Документація

- [IntersectionObserver — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [ResizeObserver — MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
