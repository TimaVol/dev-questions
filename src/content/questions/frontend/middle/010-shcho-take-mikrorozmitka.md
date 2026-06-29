---
title: "Що таке мікророзмітка?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 10
difficulty: medium
---

## Відповідь

Structured data (schema.org) у JSON-LD — rich snippets у Google (ціна, FAQ, breadcrumbs). Доповнює, не замінює семантичний HTML.

## Приклад

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Product","name":"Навушники Pro X",
 "offers":{"@type":"Offer","price":"2999","priceCurrency":"UAH"}}
</script>
```

## Юз кейси

- Картка товару в SERP
- FAQ з розгортанням у Google
- BreadcrumbList для навігації

## Документація

- [Schema.org](https://schema.org/docs/schemas.html)
- [JSON-LD — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Add_structured_data_to_your_web_pages)
