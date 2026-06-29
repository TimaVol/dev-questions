---
title: "Як працювати з WebSockets для реалізації двостороннього зв’язку?"
topic: frontend
grade: senior
category: "JavaScript"
order: 47
difficulty: hard
---

## Відповідь

Flow: HTTP upgrade → persistent connection. Клієнт: `WebSocket` API або бібліотека (socket.io для fallbacks). Обробляти: **open**, **message**, **error**, **close**; реалізувати **exponential backoff reconnect**; **heartbeat/ping** для виявлення мертвих з'єднань; **serialize** JSON-протокол `{ type, payload }`. Безпека: лише **wss://**, **token auth** при connect (query або перше повідомлення), валідація origin на сервері. React: connect у useEffect, cleanup close при unmount. Масштабування: sticky sessions або pub/sub backend (Redis).

## Приклад

```js
class ReconnectingWS {
  #url; #ws; #retry = 0;
  constructor(url, { onMessage }) {
    this.#url = url;
    this.onMessage = onMessage;
    this.#connect();
  }
  #connect() {
    this.#ws = new WebSocket(this.#url);
    this.#ws.onopen = () => { this.#retry = 0; };
    this.#ws.onmessage = (e) => this.onMessage(JSON.parse(e.data));
    this.#ws.onclose = () => {
      const delay = Math.min(1000 * 2 ** this.#retry++, 30000);
      setTimeout(() => this.#connect(), delay);
    };
  }
  send(data) {
    if (this.#ws.readyState === WebSocket.OPEN) this.#ws.send(JSON.stringify(data));
  }
  close() { this.#ws.close(); }
}
```

```tsx
useEffect(() => {
  const ws = new ReconnectingWS('wss://api.example.com/ws?token=…', {
    onMessage: (msg) => { if (msg.type === 'order') dispatch(updateOrder(msg.payload)); },
  });
  return () => ws.close();
}, []);
```

## Юз кейси

- Live order status: WS push замість polling кожні 3s — −90% навантаження на сервер
- Collaborative doc: operational transform messages через WS
- Обрив з'єднання на mobile: reconnect + синхронізація пропущених events через `since_id`

## Документація

- [WebSocket API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
