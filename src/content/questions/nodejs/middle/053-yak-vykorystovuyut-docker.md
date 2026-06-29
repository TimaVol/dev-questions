---
title: "Як використовують Docker?"
topic: nodejs
grade: middle
category: "Деплоймент і процес розробки"
order: 53
difficulty: easy
---

## Відповідь

Docker пакує Node.js-додаток і залежності в незмінний образ для узгодженого деплою.

Найкращі практики:
- **Multi-stage build** — builder (npm ci + build) → легкий runtime (node:20-alpine)
- **Non-root user** — безпека
- **.dockerignore** — виключити node_modules, тести
- **HEALTHCHECK** — для оркестратора
- **docker-compose** — локальна розробка з Postgres, Redis

Продакшн: образ → реєстр (ECR/GCR) → Kubernetes/ECS завантажує й запускає.

## Приклад

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER app
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## Юз кейси

- Паритет середовищ: той самий образ локально й на продакшні
- CI збирає й пушить образи з тегами
- Compose-стек: api + postgres + redis для інтеграційних тестів

## Документація

- [Docker — Get started](https://docs.docker.com/get-started/)
