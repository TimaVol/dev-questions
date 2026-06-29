---
title: "Як вирішуєте питання управління формами в React? Які підходи використовуєте для валідації та обробки форм?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 127
difficulty: easy
---

## Відповідь

Controlled components — `value` + `onChange` зі стану. Для складних форм — React Hook Form або Formik з schema-валідацією (Zod/Yup). Нативна валідація + серверна обов'язкова.

## Приклад

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
    </form>
  );
}
```

## Юз кейси

- React Hook Form — форма реєстрації з 15+ полів
- Zod schema — валідація перед відправкою на API

## Документація

- [Forms — React](https://react.dev/reference/react-dom/components/form)
