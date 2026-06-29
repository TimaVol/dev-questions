---
title: "Як можна обробляти великі обсяги даних без негативного впливу на продуктивність?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 154
difficulty: easy
---

## Відповідь

Пагінація або infinite scroll на бекенді, віртуалізація списку (react-window), web workers для важких обчислень, debounce пошуку, не тягнути все одним запитом.

## Приклад

```jsx
import { FixedSizeList } from 'react-window';
<FixedSizeList height={400} itemCount={10000} itemSize={50}>
  {({ index, style }) => <Row style={style} data={items[index]} />}
</FixedSizeList>
```

## Юз кейси

- Таблиця на 50k рядків — віртуалізація
- API з `?page=2&limit=50` замість всіх записів

## Документація

- [Streams API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
