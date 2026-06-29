---
title: "Навіщо потрібен WASI та які можливості він дає?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 17
difficulty: hard
---

## Відповідь

WASI (WebAssembly System Interface) — стандартизований **sandbox ABI** для WASM: файли, clocks, random, sockets (WASI Preview 2) через imports від host. Портативність: один `.wasm` модуль на Node, Wasmtime, browser (обмежено). Node: `node:wasi` + `--experimental-wasi-unstable-preview1`. Переваги над native addon: memory-safe sandbox, крос-платформенний binary, без recompile на кожну версію Node. Обмеження: мапінг filesystem через preopen dirs, без довільних syscalls.

## Приклад

```js
import { readFile } from 'node:fs/promises';
import { WASI } from 'node:wasi';

const wasi = new WASI({
  version: 'preview1',
  args: [],
  env: {},
  preopens: { '/sandbox': '/tmp/wasi-workspace' },
});

const wasm = await WebAssembly.compile(await readFile('plugin.wasm'));
const instance = await WebAssembly.instantiate(wasm, wasi.getImportObject());
wasi.start(instance);
```

## Юз кейси

- Untrusted plugins (WASM sandbox vs vm)
- Портативні compute modules (edge, serverless)
- Polyglot tooling — Rust/Go скомпільовані в WASM

## Документація

- [WASI — WebAssembly](https://webassembly.org/docs/WASI/)
- [ES modules — Node.js](https://nodejs.org/api/esm.html)
