---
title: "Чи можна замінити в V8 в Node.js?"
topic: nodejs
grade: senior
category: "Node.js"
order: 11
difficulty: easy
---

## Відповідь

Теоретично Node.js — це bindings до JS engine + libuv + core modules; V8 не є plug-and-play компонентом для end user. Практично замінити V8 у production Node неможливо без fork runtime (Deno використовує V8, Bun — JavaScriptCore).

Історично існували експерименти (node-chakracore), але підтримка припинена. Альтернатива «не V8» — інший runtime (Bun, Deno), не swap engine у офіційному Node.

Для senior: питання перевіряє розуміння, що Node tightly coupled з V8 API (N-API частково абстрагує), і що performance tuning йде через V8 flags (`--max-old-space-size`), не заміну engine.

## Приклад

```bash
# Тюнінг V8 heap, не заміна engine
node --max-old-space-size=4096 --expose-gc server.js
```

## Юз кейси

- Оцінка Bun/Deno vs Node для greenfield API
- Діагностика OOM через heap limits V8
- Розуміння, чому native addons прив'язані до ABI Node/V8 version

## Документація

- [V8 — Blog](https://v8.dev/blog)
