---
title: "Які види стримів ви знаєте?"
topic: nodejs
grade: junior
category: "Node.js"
order: 12
difficulty: medium
---

## Відповідь

У Node.js чотири види стримів:

- **Readable** — джерело даних (`fs.createReadStream`, `http.IncomingMessage`).
- **Writable** — приймач даних (`fs.createWriteStream`, `http.ServerResponse`).
- **Duplex** — одночасно читає і пише (`net.Socket`, `tls.TLSSocket`).
- **Transform** — duplex з перетворенням (`zlib.createGzip`, `crypto.createCipheriv`).

Режими: flowing (події `data`) і paused (читання через `read()`).

## Приклад

```js
import { Transform } from 'node:stream';

const upper = new Transform({
  transform(chunk, _enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});

process.stdin.pipe(upper).pipe(process.stdout);
```

## Юз кейси

- Gzip-стиснення при віддачі статики
- Парсинг JSON Lines з файлу через Transform
- WebSocket як Duplex-канал повідомлень

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
