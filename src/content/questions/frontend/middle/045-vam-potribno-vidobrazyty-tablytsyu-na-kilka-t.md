---
title: "Вам потрібно відобразити таблицю на кілька тисяч рядків. Як би ви це втілили, щоб сторінка швидко завантажувалась і швидко реагувала на дії користувача?"
topic: frontend
grade: middle
category: "Performance"
order: 45
difficulty: hard
---

## Відповідь

Віртуалізація (react-window, TanStack Virtual) — рендер лише видимих рядків. Пагінація або infinite scroll на сервері. Web Worker для сортування/фільтрації великих dataset.

## Приклад

```tsx
import { FixedSizeList } from 'react-window';
<FixedSizeList height={600} itemCount={5000} itemSize={48} width="100%">
  {({ index, style }) => <Row style={style} data={rows[index]} />}
</FixedSizeList>
```

## Юз кейси

- Таблиця 10k замовлень у адмінці
- Virtual scroll + server-side filter
- Debounce пошуку для API

## Документація

- [react-window — GitHub](https://github.com/bvaughn/react-window)
- [Virtualize long lists — web.dev](https://web.dev/articles/virtualize-long-lists-react-window)
