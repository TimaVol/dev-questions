---
title: "Як підходите до менторства та розвитку менш досвідчених розробників?"
topic: frontend
grade: senior
category: "Загальні запитання"
order: 5
difficulty: hard
---

## Відповідь

Менторство — не «роблю за нього», а «роблю разом, потім відпускаю». Pair programming на складних задачах: я веду, пояснюю чому, потім міняємось ролями. Code review — з питаннями «що ти хотів досягти?» і пропозиціями, а не rewrite всього PR. Делегую задачі з чітким scope і safety net: тести, feature flag, можливість rollback. Regular 1:1 — не про статус задач, а про зростання: що цікавить, де застряг, який наступний крок. Створюю safe space: «дурне питання» краще за мовчазний merge з багом. Фіксую прогрес: через квартал людина сама веде design review або реліз.

## Приклад

Замість «перепиши цей useEffect» у review:

```markdown
**Питання:** чому effect залежить від `user` цілого об'єкта, а не від `user.id`?
**Контекст:** при кожному re-render батька цей effect перезапускає fetch.
**Пропозиція:** винеси fetch у React Query з `queryKey: ['user', id]`.
**Ресурс:** https://react.dev/reference/react/useEffect#fetching-data-with-effects
```

Людина вчиться патерну, а не копіює фікс.

## Юз кейси

- Junior перший місяць: buddy system, shadowing на prod deploy, перший PR — дрібний bugfix з детальним review
- Middle → senior track: делегую ownership модуля (наприклад, auth flow) з щотижневим sync
- Команда без formal lead: rotating «review captain» — кожен тиждень один senior тримає якість PR
