---
title: "У чому різниця між Websockets і Server Send Event?"
topic: frontend
grade: senior
category: "JavaScript"
order: 45
difficulty: hard
---

## Відповідь

**WebSocket** — full-duplex, binary/text, persistent TCP after HTTP upgrade. Client і server обидва push anytime. **SSE (EventSource)** — server → client only, text over HTTP, auto-reconnect, `Last-Event-ID`. SSE простіший (plain HTTP, works through some proxies), WS — lower latency, binary, bidirectional (chat, games). SSE: live feeds, notifications, progress. WS: collaborative editing, trading, multiplayer. SSE не підтримує binary; WS складніший у load balancers (sticky sessions).

## Приклад

SSE — stock ticker:

```js
const es = new EventSource('/api/prices/stream');
es.addEventListener('price', (e) => {
  const { symbol, value } = JSON.parse(e.data);
  updateTicker(symbol, value);
});
es.onerror = () => console.warn('SSE reconnecting…');
```

WebSocket — chat:

```js
const ws = new WebSocket('wss://api.example.com/chat');
ws.onmessage = (e) => appendMessage(JSON.parse(e.data));
ws.send(JSON.stringify({ type: 'msg', text: 'Привіт' }));
```

## Юз кейси

- Notifications feed: SSE — auto reconnect, HTTP/2 friendly
- Live cursor у Figma-like app: WebSocket bidirectional
- Progress bar довгої job: SSE `event: progress\ndata: 45\n\n`

## Документація

- [WebSocket API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Server-sent events — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
