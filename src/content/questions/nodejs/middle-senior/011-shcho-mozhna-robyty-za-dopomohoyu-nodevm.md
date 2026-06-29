---
title: "Що можна робити за допомогою node:vm?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 11
difficulty: hard
---

## Відповідь

`node:vm` виконує JS у **ізольованому V8 context** з обмеженим набором globals (`vm.createContext`, `vm.runInContext`, `vm.runInNewContext`, `vm.Script`). Можна підмінити `console`, заборонити `require`, задати sandbox globals. **Не є межою безпеки** для недовіреного коду — escape через prototype pollution або host objects. Для недовіреного коду — окремий process (`child_process`), worker з `--disallow-code-generation`, або WASM/WASI. Корисно для: template engines, config DSL, plugin hooks з довіреним кодом.

## Приклад

```js
import vm from 'node:vm';

const sandbox = { result: null, Math };
vm.createContext(sandbox);

vm.runInContext(`
  result = Math.sqrt(144) + 1;
`, sandbox);

console.log(sandbox.result); // 13
```

## Юз кейси

- Користувацькі формули в admin panel (trusted tenants)
- Legacy config scripts без повного `eval` у global scope
- Benchmark/ізоляція snippets у CLI tooling

## Документація

- [vm — Node.js](https://nodejs.org/api/vm.html)
