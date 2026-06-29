---
title: "Які є плюси та мінуси розділення коду на .js та окремо тайпінги .d.ts?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 31
difficulty: medium
---

## Відповідь

**Плюси `.js` + `.d.ts`:** публікація JS без TS compile step для consumers; типи optional; швидший runtime deploy; патерн екосистеми `@types/*`. **Мінуси:** drift між impl і types; подвійне обслуговування; немає compile-time check у `.js` файлі; refactor не автоматичний. **Inline `.ts`:** single source of truth, compiler ловить баги, але consumers потребують types у package або declaration emit. Для libraries — `declaration: true` + ship `.d.ts`; для apps — монолітний `.ts` зазвичай краще.

## Приклад

```js
// index.js — runtime
export function createPool(options) {
  return new Pool(options);
}

// index.d.ts — types only
export interface PoolOptions { max: number; url: string; }
export declare function createPool(options: PoolOptions): Pool;
```

## Юз кейси

- npm library з JS runtime + TypeScript DX
- Поступова міграція TS (JSDoc → .d.ts → .ts)
- Community typings у стилі `@types/node`

## Документація

- [TypeScript intro — TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
