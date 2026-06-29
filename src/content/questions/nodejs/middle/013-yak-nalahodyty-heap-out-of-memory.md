---
title: "Як налагодити heap out of memory?"
topic: nodejs
grade: middle
category: "Node.js"
order: 13
difficulty: medium
---

## Відповідь

`FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory` означає, що V8 heap перевищив ліміт (default ~2 GB на 64-bit). Кроки діагностики:

- **Heap snapshot** — `node --inspect`, Chrome DevTools → Memory → Take snapshot
- **Clinic.js / 0x** — flamegraph allocation hotspots
- **`process.memoryUsage()`** — відстежити зростання heapUsed
- **Тимчасово** — `--max-old-space-size=4096` (не fix, лише respite)
- Шукати: завантаження великих файлів у пам'ять, нескінченні масиви, sync JSON.parse великих payload

## Приклад

```js
// Погано: 300 MB файл у пам'ять
const data = await fs.readFile('huge.log'); // OOM

// Добре: stream + line-by-line
import { createReadStream } from 'node:fs';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: createReadStream('huge.log'),
});
for await (const line of rl) {
  if (line.includes('ERROR')) console.log(line);
}
```

## Юз кейси

- Import CSV 500 MB+ через streams замість readFile
- Batch processing з pagination замість `SELECT *`
- Kubernetes memory limits + heap size alignment

## Документація

- [Memory diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics/memory)
