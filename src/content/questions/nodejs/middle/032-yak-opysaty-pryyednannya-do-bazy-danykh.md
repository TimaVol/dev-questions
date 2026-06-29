---
title: "Як описати приєднання до бази даних?"
topic: nodejs
grade: middle
category: "NestJS"
order: 32
difficulty: medium
---

## Відповідь

У NestJS підключення до БД через модуль з async factory:

- **`@nestjs/typeorm`** або **`@nestjs/mongoose`** — ORM/ODM integration
- **`ConfigModule`** — credentials з env (`DATABASE_URL`)
- **Connection pool** — max connections, idle timeout
- **Health check** — `@nestjs/terminus` перевіряє ping до БД

Патерн: `TypeOrmModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory })`.

Lifecycle: connect on bootstrap, `onModuleDestroy` → close pool.

## Приклад

```ts
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        poolSize: 10,
      }),
    }),
  ],
})
export class AppModule {}
```

## Юз кейси

- Read replica через separate TypeORM connection
- Migration через TypeORM CLI, не synchronize
- Graceful shutdown: DataSource.destroy()

## Документація

- [NestJS — Database](https://docs.nestjs.com/techniques/database)
