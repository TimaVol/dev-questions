---
title: "Чим горизонтальне масштабування відрізняється від вертикального масштабування?"
topic: nodejs
grade: middle
category: "System Design"
order: 63
difficulty: hard
---

## Відповідь

**Vertical scaling (scale up)** — більше CPU/RAM на одному сервері. Просто, але є ceiling (max instance size) і single point of failure.

**Horizontal scaling (scale out)** — більше instances за load balancer. Node.js stateless API — ideal candidate. Потребує: sticky sessions або shared state (Redis), connection pooling до DB.

Node.js horizontal: PM2 cluster / K8s replicas / auto-scaling group. DB часто scale vertically або read replicas.

## Приклад

```yaml
# Kubernetes HPA — horizontal
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

```js
// Stateless Node.js — safe to scale horizontally
// Session in Redis, not in-memory Map
const session = await redis.get(`session:${sessionId}`);
```

## Юз кейси

- Black Friday: 2 → 50 pods via HPA
- Vertical: upgrade Postgres RDS instance
- CDN для horizontal static/API cache at edge

## Документація

- [Horizontal vs vertical scaling — AWS](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/scaling.html)
