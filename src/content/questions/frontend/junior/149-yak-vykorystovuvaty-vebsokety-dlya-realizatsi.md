---
title: "Як використовувати вебсокети для реалізації реального часу комунікацій?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 149
difficulty: medium
---

## Відповідь

Підключись через `new WebSocket(url)`, слухай `onmessage`, відправляй через `send()`. Обробляй `onopen`, `onclose`, `onerror`. Reconnect при обриві. Альтернатива — SSE для одностороннього потоку.

## Приклад

```js
const ws = new WebSocket('wss://chat.example.com');
ws.onopen = () => ws.send(JSON.stringify({ join: roomId }));
ws.onmessage = (e) => appendMessage(JSON.parse(e.data));
```

## Юз кейси

- Чат з миттєвою доставкою повідомлень
- Live-нотифікації про нове замовлення

## Документація

- [WebSocket API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
