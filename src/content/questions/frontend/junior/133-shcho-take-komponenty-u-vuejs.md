---
title: "Що таке компоненти у Vue.js?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 133
difficulty: easy
---

## Відповідь

Компонент Vue — це `.vue`-файл з трьома секціями: `<template>` (розмітка), `<script>` (логіка) і `<style>` (стилі). Дані передають вниз через `props`, події — вгору через `emit`. Реактивність — через `ref` і `reactive` у `<script setup>`.

## Приклад

```vue
<script setup>
const props = defineProps({ title: String });
const emit = defineEmits(['close']);
</script>

<template>
  <div class="modal">
    <h2>{{ title }}</h2>
    <button @click="emit('close')">Закрити</button>
  </div>
</template>
```

## Юз кейси

- Перевикористовувана картка товару `<ProductCard :product="item" />` у каталозі
- Окремий `.vue`-файл для модалки — шаблон, логіка й стилі в одному місці

## Документація

- [Vue — Components](https://vuejs.org/guide/essentials/component-basics.html)
