---
title: "У чому різниця між useLayoutEffect та useEffect, у яких випадках що використовуєте?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 58
difficulty: medium
---

## Відповідь

**useEffect** — async після paint, non-blocking, вибір за замовчуванням. **useLayoutEffect** — sync після DOM mutations, до browser paint — блокує visual update. Layout effect коли: вимір DOM (`getBoundingClientRect`), синхронізація scroll position, запобігання flash (позиція tooltip, стартовий стан анімації), focus management до того, як користувач побачить кадр. SSR: useLayoutEffect не працює на сервері — `useEffect` або патерн `useIsomorphicLayoutEffect`. 99% effects — `useEffect`.

## Приклад

```tsx
// useLayoutEffect — prevent tooltip flash at (0,0)
function Tooltip({ anchorRef, children }) {
  const tipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const tip = tipRef.current;
    if (!anchor || !tip) return;
    const a = anchor.getBoundingClientRect();
    setPos({ top: a.bottom + 8, left: a.left + a.width / 2 - tip.offsetWidth / 2 });
  }, [anchorRef]);

  return createPortal(<div ref={tipRef} style={pos}>{children}</div>, document.body);
}

// useEffect — fetch data, subscriptions
useEffect(() => {
  const ctrl = new AbortController();
  fetch('/api/data', { signal: ctrl.signal }).then(/*…*/);
  return () => ctrl.abort();
}, []);
```

## Юз кейси

- Autosize textarea: layout effect вимірює scrollHeight до paint
- Route scroll restore: layout effect `window.scrollTo(0, saved)`
- Data fetch: завжди useEffect — не блокувати paint

## Документація

- [useLayoutEffect — React](https://react.dev/reference/react/useLayoutEffect)
- [useEffect — React](https://react.dev/reference/react/useEffect)
