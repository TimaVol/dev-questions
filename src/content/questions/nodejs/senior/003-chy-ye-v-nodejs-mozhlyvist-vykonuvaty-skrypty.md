---
title: "Чи є в Node.js можливість виконувати скрипти, написані іншими мовами?"
topic: nodejs
grade: senior
category: "Node.js"
order: 3
difficulty: hard
---

## Відповідь

Так, кількома шляхами з різним trade-off. `child_process` / `spawn` — виклик зовнішніх бінарників (Python ML pipeline, ffmpeg, shell). Native addons через N-API (C/C++/Rust) — максимальна швидкість, але складність збірки та ABI-сумісність між Node versions.

WebAssembly — sandboxed, переносимий bytecode для compute-heavy логіки без повного native addon. `node-ffi-napi` — виклик існуючих `.so`/`.dll` без переписування (ризик безпеки). Edge cases: embedded Lua через bindings, gRPC до сервісів на Go/Java.

На senior-рівні питання — не «чи можна», а «де межа»: IPC overhead, serialization cost, deploy complexity vs винесення в окремий microservice.

## Приклад

```js
import { spawn } from 'node:child_process';

function runPython(script, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('python3', [script, ...args]);
    let out = '';
    proc.stdout.on('data', (d) => (out += d));
    proc.on('close', (code) => (code === 0 ? resolve(out) : reject(code)));
  });
}
```

```js
// Native addon (conceptual)
const sharp = require('sharp'); // libvips через N-API
await sharp(input).resize(800).toFile(output);
```

## Юз кейси

- Інтеграція legacy Python ETL без переписування на JS
- Image/video processing через native libs (sharp, ffmpeg)
- Винесення hot path у Rust addon замість окремого сервісу

## Документація

- [child_process — Node.js](https://nodejs.org/api/child_process.html)
- [N-API — Node.js](https://nodejs.org/api/n-api.html)
