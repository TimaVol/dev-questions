---
title: "Як у проєктах на Node.js можуть з'явитися вразливості з (на вибір): XSS, Path traversal, SQLI, CSRF? Як від них захищатися?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 29
difficulty: hard
---

## Відповідь

**XSS** — `res.send(userInput)` без екранування в HTML/JSONP; захист: auto-escape шаблонів, CSP, `Content-Type: application/json`, санітизація HTML (DOMPurify server-side для rich text). **Path traversal** — `fs.readFile('./uploads/' + req.params.file)` → `../../etc/passwd`; захист: `path.resolve` + перевірка prefix, whitelist імен файлів, `path.basename`. **SQLi** — конкатенація рядків у query; захист: параметризовані запити (pg `$1`, knex bindings). **CSRF** — cookie auth без token на state-changing POST; захист: SameSite=Strict/Lax, CSRF token, double-submit cookie.

## Приклад

```js
import path from 'node:path';

// Path traversal fix
const safeDir = path.resolve('./uploads');
const requested = path.resolve(safeDir, path.basename(req.params.file));
if (!requested.startsWith(safeDir)) return res.status(400).end('invalid path');

// SQLi fix
await db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

## Юз кейси

- Аудит endpoint завантаження файлів
- Admin panel з user-generated content
- Cookie-based session API без CSRF token

## Документація

- [XSS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss)
- [innerHTML — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
