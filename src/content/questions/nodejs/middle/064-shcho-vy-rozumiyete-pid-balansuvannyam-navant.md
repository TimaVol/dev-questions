---
title: "Що ви розумієте під балансуванням навантаження? Чому це важливо при проєктуванні системи?"
topic: nodejs
grade: middle
category: "System Design"
order: 64
difficulty: medium
---

## Відповідь

**Load balancing** — розподіл traffic між кількома server instances для availability, throughput, fault tolerance.

Алгоритми:
- **Round robin** — по черзі
- **Least connections** — до найменш завантаженого
- **IP hash** — sticky sessions
- **Weighted** — більше потужні nodes отримують більше

Рівні: DNS → L4 (TCP) → L7 (HTTP path routing). Tools: nginx, HAProxy, AWS ALB, K8s Service.

Без LB: single instance bottleneck, downtime при deploy/crash.

## Приклад

```nginx
upstream node_api {
    least_conn;
    server 10.0.1.1:3000;
    server 10.0.1.2:3000;
    server 10.0.1.3:3000;
}

server {
    location /api/ {
        proxy_pass http://node_api;
        proxy_set_header X-Request-Id $request_id;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Юз кейси

- Health check removes unhealthy pods from rotation
- Session affinity для WebSocket (sticky)
- Global LB + multi-region failover

## Документація

- [Load balancing — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Load_balancer)
