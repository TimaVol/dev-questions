---
title: "Як реалізувати свій декоратор валідації?"
topic: nodejs
grade: middle
category: "NestJS"
order: 33
difficulty: medium
---

## Відповідь

У NestJS custom validation decorator будується на **`class-validator`** + **`registerDecorator`**:

- Створити decorator function з `registerDecorator`
- Реалізувати `ValidatorConstraint` class з `validate()` method
- Застосувати на DTO property: `@IsStrongPassword()`
- **`ValidationPipe`** глобально трансформує і валідує body/query

Чому decorator, а не manual check у controller: declarative, reusable, auto 400 response, OpenAPI integration.

## Приклад

```ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isSlug' })
export class IsSlugConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return typeof value === 'string' && /^[a-z0-9-]+$/.test(value);
  }
}

export function IsSlug(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({ target: object.constructor, propertyName, options, validator: IsSlugConstraint });
  };
}

export class CreatePostDto {
  @IsSlug()
  slug: string;
}
```

## Юз кейси

- @IsFutureDate() для booking API
- Cross-field validation: password === confirmPassword
- Custom @IsUniqueEmail() з DB lookup через DI

## Документація

- [NestJS — Overview](https://docs.nestjs.com/first-steps)
- [Decorators — TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)
