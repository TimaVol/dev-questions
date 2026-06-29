---
title: "У чому різниця між типами та інтерфейсами?"
topic: frontend
grade: middle
category: "JavaScript"
order: 54
difficulty: medium
---

## Відповідь

**interface** — merge, extends, краще для опису об'єктів. **type** — unions, intersections, mapped types, примітиви. Для API-моделей — interface; для union станів — type.

## Приклад

```ts
type Status = 'idle' | 'loading' | 'error';
interface User { id: string; name: string; }
type ApiResponse<T> = { data: T } | { error: string };
```

## Юз кейси

- Union для скінченного автомата станів
- interface для моделей сутностей
- Mapped types для Partial/Readonly

## Документація

- [Interfaces — TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces)
- [Type aliases — TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
