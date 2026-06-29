---
title: "Що таке Decorators у TypeScript і в яких випадках їх використовують?"
topic: frontend
grade: junior
category: "TypeScript"
order: 101
difficulty: easy
---

## Відповідь

Decorators — експериментальний синтаксис `@decorator` для метапрограмування класів, методів, властивостей. Використовують у NestJS, Angular, MobX. Потрібен `experimentalDecorators` у tsconfig.

## Приклад

```ts
function log(target: unknown, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log(`Calling ${key}`);
    return original.apply(this, args);
  };
}
```

## Юз кейси

- NestJS `@Controller()`, `@Get()` для роутів
- Логування або кешування методу через decorator

## Документація

- [Decorators — TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)
