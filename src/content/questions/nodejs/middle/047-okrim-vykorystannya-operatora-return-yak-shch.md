---
title: "Окрім використання оператора 'return', як ще можна повернути результат виконання з функції (процедури)?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 47
difficulty: easy
---

## Відповідь

Способи «повернути» результат без `return`:

- **Callback** — `fn(err, result)` error-first pattern
- **Promise resolve/reject** — async result channel
- **EventEmitter** — `emitter.emit('done', result)`
- **Mutable argument** — mutate passed object/array (anti-pattern, але існує)
- **Throw** — для error path (не success result)
- **Generator yield / AsyncGenerator** — lazy stream of values
- **Global/module state** — side effect (avoid in services)

У сучасному backend — Promises/async-await primary; callbacks для streams/events.

## Приклад

```js
// Callback
function fetchUser(id, cb) {
  db.query('SELECT * FROM users WHERE id = $1', [id], (err, rows) => {
    cb(err, rows[0]);
  });
}

// EventEmitter
import { EventEmitter } from 'node:events';
const jobs = new EventEmitter();
jobs.on('completed', (result) => console.log(result));
jobs.emit('completed', { id: 1, status: 'done' });

// Async generator
async function* paginateUsers(pageSize = 100) {
  let offset = 0;
  while (true) {
    const batch = await db.query('SELECT * FROM users LIMIT $1 OFFSET $2', [pageSize, offset]);
    if (!batch.length) return;
    yield batch;
    offset += pageSize;
  }
}
```

## Юз кейси

- Stream large dataset via async generator
- Job queue events: progress → done
- Legacy DB driver callbacks → promisify wrapper

## Документація

- [Functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
