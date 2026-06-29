---
title: "Як би ви реалізовували відсотковий прелоадер на сайті, де треба завантажувати картинки, 3D-об’єкти та додаткові JSON-файли?"
topic: frontend
grade: middle
category: "JavaScript"
order: 68
difficulty: hard
---

## Відповідь

Збираю прогрес із зважених ресурсів: зображення 40%, 3D-моделі 30%, JSON 30%. Кожен asset повертає Promise; `onload`/`onerror` інкрементують лічильник. UI показує відсоток і не блокує взаємодію — можна скасувати або перейти далі після мінімального порогу.

## Приклад

```js
async function loadAssets(assets, onProgress) {
  let loaded = 0;
  const total = assets.reduce((s, a) => s + a.weight, 0);
  await Promise.all(assets.map((a) =>
    loadOne(a.url).then(() => onProgress((loaded += a.weight) / total))
  ));
}
```

## Юз кейси

- Прелоадер 3D-сцени з текстурами перед стартом гри
- Лендінг із важкими assets — прогрес-бар замість білого екрану
- Паралельне завантаження JSON-конфігів і прев’ю-зображень

## Документація

- [Fetch API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Progress events — MDN](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)
