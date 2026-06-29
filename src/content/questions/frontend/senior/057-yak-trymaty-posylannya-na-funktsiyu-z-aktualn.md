---
title: "Як тримати посилання на функцію з актуальними даними без зайвих ререндерів?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 57
difficulty: hard
---

## Відповідь

Проблема: callback у props змінює reference кожен render → дочірній `React.memo` компонент re-renderиться. Рішення за пріоритетом: (1) **`useRef` для callback** — `useEffectEvent` (React 19) або custom `useLatest(ref)` pattern; (2) **`useCallback`** з правильними deps — коли child memoized і callback передається вниз; (3) **підняти state** або **context selector** — щоб не прокидати callback. `useCallback` без memoized children — premature optimization. `useRef` для stable identity + `.current` для fresh closure — класичний патерн для subscriptions і event handlers у effects.

## Приклад

```tsx
// useEffectEvent pattern (React 19) — stable reference, fresh closure
function Chat({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState('');

  const onConnected = useEffectEvent(() => {
    sendAnalytics('connected', roomId); // завжди актуальний roomId
  });

  useEffect(() => {
    const conn = connect(roomId);
    conn.on('open', onConnected);
    return () => conn.disconnect();
  }, [roomId]); // onConnected не в deps — немає stale/re-run loop
}
```

```tsx
// Custom useLatest (React 18)
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

function Parent() {
  const [count, setCount] = useState(0);
  const countRef = useLatest(count);
  const handleClick = useCallback(() => {
    console.log(countRef.current); // завжди fresh
  }, []); // stable reference
  return <MemoChild onClick={handleClick} />;
}
```

## Юз кейси

- WebSocket handler у effect: ref для callback, не re-subscribe на кожен render
- Virtualized list: stable `onRowClick` через useCallback + row id argument
- Form submit в memoized child: `useCallback` з `[formValues]` або react-hook-form `handleSubmit`

## Документація

- [useRef — React](https://react.dev/reference/react/useRef)
- [useCallback — React](https://react.dev/reference/react/useCallback)
