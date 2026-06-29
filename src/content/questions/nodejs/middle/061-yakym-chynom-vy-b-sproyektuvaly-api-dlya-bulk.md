---
title: "Яким чином ви б спроєктували API для bulk delete?"
topic: nodejs
grade: middle
category: "Networking & API"
order: 61
difficulty: medium
---

## Відповідь

Аспекти проєктування bulk delete:

- **Sync vs async** — >100 ID → 202 Accepted + job ID, асинхронна обробка через чергу
- **Ідемпотентність** — повторне видалення тих самих ID → 200/204, не шторм 404
- **Частковий успіх** — `207 Multi-Status` або `{ deleted: [], failed: [{id, reason}] }`
- **Валідація** — максимальний розмір пакета, перевірка прав на кожен ресурс
- **Soft delete** — `deleted_at` замість жорсткого видалення для аудиту
- **Обмеження частоти** — захист від зловживань

Ендпоінти:
- `DELETE /api/v1/items?ids=1,2,3` (малий пакет)
- `POST /api/v1/items/bulk-delete` body `{ ids: [] }` (великий)
- `DELETE /api/v1/items` body `{ ids: [] }` (нестандартно, але використовується)

## Приклад

```js
app.post('/api/v1/items/bulk-delete', async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length > 1000) {
    return res.status(400).json({ error: 'Max 1000 ids per request' });
  }

  if (ids.length > 100) {
    const job = await deleteQueue.add('bulk-delete', { ids, userId: req.user.id });
    return res.status(202).json({ jobId: job.id, status: 'processing' });
  }

  const result = await itemService.bulkDelete(ids, req.user.id);
  res.json(result); // { deleted: 98, failed: [{ id: 'x', reason: 'not found' }] }
});
```

## Юз кейси

- Масове видалення з адмін-панелі (multi-select)
- Масове видалення даних користувачів за GDPR
- Webhook-сповіщення після завершення асинхронного bulk-завдання

## Документація

- [HTTP-методи — MDN](https://developer.mozilla.org/uk/docs/Web/HTTP/Methods)
- [Bulk operations — REST API design](https://restfulapi.net/rest-api-design-for-bulk-operations/)
