---
title: "Розкажіть про захист від SQL-ін’єкцій."
topic: frontend
grade: senior
category: "Безпека"
order: 108
difficulty: easy
---

## Відповідь

SQL injection — вставка зловмисного SQL через user input у query string. **Захист — на сервері/ORM**, не на фронті: **parameterized queries** (prepared statements), ORM з binding (`prisma.user.findMany({ where: { id } })`), **ніколи** string concatenation `WHERE id = '${userId}'`. Frontend роль: не давати false sense of security — `encodeURIComponent` не захищає від SQLi. Корисно: **input validation** (Zod) як defense-in-depth, **least privilege** DB user, **WAF** rules. Senior на співбесіді каже: «фронт валідує UX, бекенд — security; SQLi fix — parameterized queries».

## Приклад

```ts
// ❌ Vulnerable (backend)
const query = `SELECT * FROM users WHERE email = '${email}'`;
// email = "' OR '1'='1" → витік усіх users

// ✅ Parameterized (Node pg)
await pool.query('SELECT * FROM users WHERE email = $1', [email]);

// ✅ Prisma ORM
await prisma.user.findUnique({ where: { email } });
```

```ts
// Frontend — validation (UX + early reject, NOT SQL protection)
const schema = z.object({ email: z.string().email().max(255) });
const parsed = schema.safeParse(formData.email);
if (!parsed.success) return showError(parsed.error);
await api.login(parsed.data); // server still uses parameterized query
```

## Юз кейси

- Search field: server uses `LIKE` з bound parameter, не template literal
- Legacy PHP app audit: знайти `mysqli_query("... $var")` → refactor to PDO prepared
- Penetration test finding: frontend додає Zod, backend — prepared statements — close ticket

## Документація

- [SQL Injection — OWASP](https://owasp.org/www-community/attacks/SQL_Injection)
- [Prepared statements — PostgreSQL](https://www.postgresql.org/docs/current/sql-prepare.html)
