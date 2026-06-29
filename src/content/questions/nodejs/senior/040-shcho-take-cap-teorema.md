---
title: "Що таке CAP теорема?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 40
difficulty: hard
---

## Відповідь

CAP (Brewer): розподілена система при **network partition (P)** може гарантувати лише одне з **Consistency (C)** або **Availability (A)** одночасно.

**CP** — відмова від availability (повертає помилку) заради consistent read (etcd, Zookeeper). **AP** — доступність з eventual consistency (Cassandra, Dynamo-style). На практиці partition рідкісні; у нормальному режимі — налаштування компромісу latency/consistency.

Розширення PACELC: інакше (без partition) — вибір між Latency і Consistency. Мікросервіси: не глобальний вибір CAP — на операцію (strong consistency для платежів, eventual для аналітики).

## Приклад

```js
// AP-style read — may return stale replica data
async function getProduct(id) {
  return redisReplica.get(`product:${id}`) ?? fetchFromOrigin(id);
}

// CP-style — fail if quorum unavailable
async function deductInventory(id, qty) {
  const result = await etcdTxn.compare(someVersion).then(deduct).commit();
  if (!result.succeeded) throw new ServiceUnavailableError();
}
```

## Юз кейси

- Вибір Cassandra vs PostgreSQL для session store
- Проєктування multi-region active-active каталогу
- Пояснення, чому «exactly consistent + always available» неможливо під час partition

## Документація

- [CAP theorem — Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)
