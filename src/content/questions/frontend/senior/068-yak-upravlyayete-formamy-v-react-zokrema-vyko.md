---
title: "Як управляєте формами в React, зокрема використовуючи бібліотеки для форм, такі як Formik чи React Hook Form? Як обробляєте валідацію, маскування та інші аспекти форм?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 68
difficulty: medium
---

## Відповідь

**React Hook Form** (переважно) — uncontrolled, мінімум re-renders, Zod resolver. **Formik** — старіший, більше re-renders, все ще валідний. Валідація: **Zod/Yup schema** спільна front+back. Маски: `react-imask` або `@react-input/mask`. Async validation: debounced server check (унікальний email). UX: inline errors на blur, `aria-invalid`, `aria-describedby`, focus на першу помилку при submit. Multi-step: RHF `FormProvider` + draft у sessionStorage.

## Приклад

RHF + Zod:

```tsx
const schema = z.object({
  email: z.string().email('Невірний email'),
  phone: z.string().regex(/^\+380\d{9}$/, 'Формат +380XXXXXXXXX'),
});

function ProfileForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" aria-invalid={!!errors.email} aria-describedby="email-err" {...register('email')} />
      {errors.email && <span id="email-err" role="alert">{errors.email.message}</span>}
    </form>
  );
}
```

Phone mask with IMask:

```tsx
const { ref } = useIMask({ mask: '+{380}000000000' });
<input ref={ref} name="phone" />
```

## Юз кейси

- Checkout 4 кроки: FormProvider, валідація на крок, Zod superRefine для cross-field
- IBAN field: mask + async validation через bank API
- a11y: submit fails → programmatic focus на перше `aria-invalid` поле

## Документація

- [React Hook Form — Get started](https://react-hook-form.com/get-started)
- [Forms — React](https://react.dev/reference/react-dom/components/form)
