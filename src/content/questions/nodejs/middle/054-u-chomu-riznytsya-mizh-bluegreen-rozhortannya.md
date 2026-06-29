---
title: "У чому різниця між blue/green розгортанням і rolling розгортанням."
topic: nodejs
grade: middle
category: "Деплоймент і процес розробки"
order: 54
difficulty: medium
---

## Відповідь

**Rolling deployment** — поступова заміна instances: K8s `RollingUpdate` піднімає нові pods, гасить старі по одному/групами. Короткий період двох версій одночасно. Downtime мінімальний, rollback повільніший.

**Blue/Green** — два повні environments: blue (live), green (new). Переключення traffic одразу (load balancer / K8s Service switch). Instant rollback — повернути traffic на blue. Потребує 2x resources під час deploy.

**Canary** — bonus: % traffic на new version, поступове збільшення.

## Приклад

```yaml
# Kubernetes rolling update
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
        - name: api
          image: my-api:v2.0.0
          readinessProbe:
            httpGet: { path: /health, port: 3000 }
```

## Юз кейси

- Rolling: default K8s, zero-downtime для stateless API
- Blue/green: critical payment service, instant rollback
- Canary: validate v2 on 5% traffic before full rollout

## Документація

- [Blue/green deployments — Martin Fowler](https://martinfowler.com/bliki/BlueGreenDeployment.html)
