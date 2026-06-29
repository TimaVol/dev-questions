---
title: "Що таке Websockets? Для чого вони потрібні?"
topic: frontend
grade: middle
category: "JavaScript"
order: 51
difficulty: easy
---

## Відповідь

WebSocket — постійне двостороннє TCP-з'єднання після HTTP upgrade. Для чату, live scores, collaborative editing. На відміну від polling — мінімальний overhead.

## Приклад

```js
const ws = new WebSocket('wss://chat.example.com');
ws.onmessage = (e) => appendMessage(JSON.parse(e.data));
ws.send(JSON.stringify({ type: 'message', text: 'Привіт' }));
```

## Юз кейси

- Live chat support
- Real-time dashboard metrics
- Collaborative whiteboard

## Документація

- [WebSocket API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
