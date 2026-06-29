---
title: "Що таке DNS?"
topic: nodejs
grade: junior
category: "WEB"
order: 49
difficulty: easy
---

## Відповідь

DNS (Domain Name System) перетворює доменні імена (`api.example.com`) на IP-адреси для TCP-з'єднань. Записи: **A/AAAA** (IPv4/IPv6), **CNAME** (аліас), **MX** (пошта), **TXT** (верифікація). Resolver кешує відповіді за TTL. У Node: `dns.promises.lookup()`, `resolve4()` — або ОС резолвить при `http.request`.

## Приклад

```js
import dns from 'node:dns/promises';

const [{ address }] = await dns.lookup('nodejs.org');
console.log(address);

const records = await dns.resolve4('example.com');
```

```bash
dig api.example.com
nslookup api.example.com
```

## Юз кейси

- Деплой Node API за load balancer з CNAME
- Діагностика «ENOTFOUND» при з'єднанні з БД
- Service discovery у Kubernetes через DNS імена сервісів

## Документація

- [DNS — MDN](https://developer.mozilla.org/en-US/docs/Glossary/DNS)
