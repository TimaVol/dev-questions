---
title: "Чи є випадки, коли тестування не є доцільним?"
topic: frontend
grade: middle
category: "Тести"
order: 91
difficulty: medium
---

## Відповідь

Тести не завжди окупаються: throwaway-прототип, тривіальні константи, чисто візуальні зміни без логіки. Але payment, auth, розрахунки — завжди тестую. Оцінюю ROI: вартість підтримки flaky e2e vs цінність покриття.

## Приклад

```js
// Не тестую: export const API_BASE = 'https://api.example.com';
// Тестую: calcShipping(weightKg, zone) з граничними вагами
```

## Юз кейси

- Spike на 2 дні — без тестів, з явним техборгом
- Пропуск тестів для thin wrapper над `fetch` без логіки
- Обов’язкові тести для checkout навіть у MVP
