---
title: "Яким умовам має відповідати функція, щоб бути хуком?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 131
difficulty: medium
---

## Відповідь

Хук — функція, ім'я якої починається з `use`. Викликати можна лише на верхньому рівні React-компонента або іншого хука — не всередині `if`, циклів чи вкладених функцій. Це гарантує стабільний порядок хуків між рендерами.

## Приклад

```jsx
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// У компоненті
const query = useDebounce(searchInput, 400);
```

## Юз кейси

- `useLocalStorage('theme')` — зберегти тему між перезавантаженнями
- `useDebounce` для поля пошуку — менше запитів до API під час набору тексту

## Документація

- [Hooks — React](https://react.dev/reference/react/hooks)
