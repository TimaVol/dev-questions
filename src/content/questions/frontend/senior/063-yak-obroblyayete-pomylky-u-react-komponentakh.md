---
title: "Як обробляєте помилки у React-компонентах?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 63
difficulty: hard
---

## Відповідь

Шари: **Error Boundary** — ловить render/lifecycle errors, fallback UI, лог у Sentry; **async errors** — try/catch у event handlers, React Query `isError`/`error`, boundaries їх не ловлять; **route errors** — React Router errorElement / Next.js error.tsx; **global** — `window.onerror`, `unhandledrejection`. UX: зрозуміле повідомлення, кнопка retry, без білого екрану. Reset boundary при навігації (`key={location.pathname}`). Ніколи не ковтати помилки мовчки.

## Приклад

```tsx
class ErrorBoundary extends Component<{ fallback: ReactNode; onError?: (e: Error) => void }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error);
    Sentry.captureException(error, { extra: info });
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorPage onRetry={() => window.location.reload()} />}>
  <Dashboard />
</ErrorBoundary>

// Async — Query
const { data, error, isError, refetch } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });
if (isError) return <Alert message={error.message} action={<Button onClick={() => refetch()}>Retry</Button>} />;
```

## Юз кейси

- Ізоляція віджетів: boundary на кожну dashboard card — один зламаний chart не ламає всю сторінку
- Payment form: inline error від API + boundary для неочікуваного render crash
- SSR: error.tsx в Next.js App Router для recovery на рівні segment

## Документація

- [Error boundaries — React](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
