# Підготовка до Dev-інтерв'ю

Статичний сайт для підготовки до співбесід: **644 питання** з DOU (Frontend + Node.js) з відповідями, прикладами коду та посиланнями на документацію.

Спершу спробуй відповісти сам — потім відкрий відповідь. Є глобальний пошук, фільтр за складністю, навігація `J`/`K`.

## Джерела питань

- [Frontend — DOU](https://dou.ua/lenta/articles/front-end-developer-interview-questions/)
- [Node.js — DOU](https://dou.ua/lenta/articles/interview-node-js/)

## Команди

| Команда | Дія |
|--------|-----|
| `npm install` | Встановити залежності |
| `npm run dev` | Dev-сервер |
| `astro dev --background` | Dev у фоні (`astro dev stop` / `status` / `logs`) |
| `npm run build` | Production-збірка → `dist/` |
| `npm run preview` | Перегляд збірки локально |

## Структура контенту

```
src/content/questions/{topic}/{grade}/*.md
```

- `topic`: `frontend` | `nodejs`
- `grade`: `junior` | `middle` | `senior` | `middle-senior` (тільки nodejs)

Кожне питання: frontmatter + `## Відповідь` + `## Приклад` + `## Юз кейси` + опційно `## Документація`.

## Re-import з DOU

```bash
npm run import:dou -- --dry-run   # перегляд без запису
npm run import:dou -- --force     # повний re-import
```

**Увага:** без `--force` скрипт не запускається. З `--force` він **видаляє** `src/content/questions/` і перезаписує всі файли — збережуться лише тіла відповідей без placeholder. Не запускай після ручного редагування контенту.

## Деплой

Перед продакшеном зміни `site` у [`astro.config.mjs`](astro.config.mjs) на реальний домен (зараз placeholder `https://dev-questions.vercel.app`).

```bash
npm run build
```

Статичний output у `dist/` — підходить для Vercel, Netlify, GitHub Pages.

## Стек

- [Astro](https://astro.build) 7
- Content Collections + Markdown (Shiki)
