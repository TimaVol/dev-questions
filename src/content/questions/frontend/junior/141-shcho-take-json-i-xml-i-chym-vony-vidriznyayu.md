---
title: "Що таке JSON і XML і чим вони відрізняються у використанні?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 141
difficulty: medium
---

## Відповідь

JSON — компактний текстовий формат, нативно парситься в JS (`JSON.parse`/`stringify`), стандарт для сучасних REST API. XML — розмітка тегами й атрибутами, підтримує схеми (XSD); залишився в RSS, SOAP і старих enterprise-системах. Для нових API обирають JSON.

## Приклад

```json
{ "id": 1, "name": "Оля", "roles": ["admin"], "active": true }
```

```xml
<user id="1">
  <name>Оля</name>
  <role>admin</role>
</user>
```

## Юз кейси

- `fetch('/api/users')` — відповідь і запит у форматі JSON
- RSS-стрічка новин блогу — XML-файл з тегами `<item>`
- Інтеграція зі старим банківським SOAP API — обмін XML

## Документація

- [JSON — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [XML — MDN](https://developer.mozilla.org/en-US/docs/Web/XML)
