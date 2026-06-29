---
title: "Які є способи масштабувати Node.js сервер?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 14
difficulty: hard
---

## Відповідь

**Вертикальне** — більше CPU/RAM; швидко, але є стеля. **Горизонтальне** — N stateless-інстансів за load balancer; потребує зовнішнього сховища сесій (Redis), sticky sessions лише якщо без них ніяк.

**На рівні процесу**: `cluster`/PM2 fork на кожне ядро; **worker_threads** для CPU-задач в одному процесі. **На рівні застосунку**: кешування (Redis), read replicas, CDN для статики, черга для асинхронної роботи. **Інфраструктура**: K8s HPA по CPU/RPS, serverless для пікових навантажень.

Вузьке місце часто не Node, а БД або синхронні зовнішні виклики — профілюйте перед масштабуванням інстансів.

## Приклад

```yaml
# K8s HPA sketch
spec:
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

## Юз кейси

- План масштабування e-commerce API на Black Friday
- Міграція з одного інстансу на деплой у K8s
- Визначення, коли додати Redis-кеш, а коли — ще 10 pod'ів

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [cluster — Node.js](https://nodejs.org/api/cluster.html)
