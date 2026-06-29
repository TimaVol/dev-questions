---
title: "Оптимізація React-компонентів: що варто робити, а що ні? Чи варто і коли варто використовувати useMemo та useCallback?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 70
difficulty: hard
---

## Відповідь

Оптимізувати після вимірювання, не за замовчуванням. **Робити:** `memo` на дорогих pure list rows; `useMemo` для важких обчислень (filter 10k items); `useCallback` при передачі в memoized child або dep useEffect; розділяти Context; virtualize lists; React Compiler (майбутнє) auto-memo. **Не робити:** обгортати кожну функцію в useCallback; useMemo для тривіальної математики; premature memo на leaf components. Спочатку профілювати — React DevTools Profiler, «why did this render?». Правило: виправити архітектуру (Context split) перед memo-пластирами.

## Приклад

```tsx
// ✅ useMemo — expensive derive
const sorted = useMemo(
  () => items.filter(m => m.active).sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// ✅ memo + stable callback for virtualized row
const Row = memo(function Row({ item, onSelect }: { item: Item; onSelect: (id: string) => void }) {
  return <div onClick={() => onSelect(item.id)}>{item.name}</div>;
});

function List({ items }) {
  const onSelect = useCallback((id: string) => { analytics.track('select', id); }, []);
  return items.map(item => <Row key={item.id} item={item} onSelect={onSelect} />);
}

// ❌ unnecessary
const doubled = useMemo(() => count * 2, [count]);
```

## Юз кейси

- Table 500 rows: memo Row — scroll 60fps vs 15fps
- Context refactor: розділити UserContext і ThemeContext — більший виграш, ніж useCallback скрізь
- React 19 Compiler: поступово зменшувати manual memo після ввімкнення

## Документація

- [memo — React](https://react.dev/reference/react/memo)
- [Profiler — React](https://react.dev/reference/react/Profiler)
