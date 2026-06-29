---
title: "Назвіть принципи ООП."
topic: frontend
grade: middle
category: "Загальні запитання"
order: 1
difficulty: medium
---

## Відповідь

ООП організовує код навколо об'єктів, що поєднують стан і поведінку. Чотири базові принципи: **інкапсуляція**, **абстракція**, **успадкування** і **поліморфізм**. На фронтенді це частіше класи сервісів або моделі, але в UI все частіше виграє композиція замість глибоких дерев наслідування.

## Приклад

```ts
abstract class NotificationChannel {
  abstract send(message: string): Promise<void>;
}
class EmailChannel extends NotificationChannel {
  async send(message: string) {
    await fetch('/api/notify/email', { method: 'POST', body: JSON.stringify({ message }) });
  }
}
```

## Юз кейси

- Моделювання доменних сутностей (замовлення, користувач)
- Розширювані UI-компоненти зі спільною базовою поведінкою
- Рефакторинг legacy з дубльованою бізнес-логікою

## Документація

- [Object-oriented programming — MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/OOP)
- [Classes — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes)
