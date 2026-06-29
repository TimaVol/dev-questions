---
title: "Що таке WebSocket і в чому його особливості порівняно з традиційними HTTP-запитами?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 143
difficulty: medium
---

## Відповідь

HTTP працює за схемою «запит → відповідь»: клієнт ініціює, сервер відповідає. WebSocket після handshake (`101 Switching Protocols`) тримає постійний канал — сервер може надсилати дані без polling. Підходить для чатів, live-стрічок і спільного редагування.

## Приклад

```js
const ws = new WebSocket('wss://chat.example.com/room/7');

ws.onopen = () => ws.send(JSON.stringify({ type: 'join', user: 'Оля' }));
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  appendMessage(msg.text, msg.author);
};
ws.onclose = () => showReconnectBanner();
```

## Юз кейси

- Чат підтримки — повідомлення з'являються миттєво без `setInterval` polling
- Торговий термінал — live-оновлення котирувань акцій
- Спільне редагування документа — зміни від інших користувачів у реальному часі

## Документація

- [WebSocket API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
