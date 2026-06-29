---
title: "Які патерни з React ви знаєте?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 60
difficulty: medium
---

## Відповідь

React patterns, які senior має знати: **Compound Components** (Tabs, Select — неявний спільний state); **Render Props / children as function**; **Higher-Order Component** (legacy, краще hooks); **Custom Hooks** (reuse логіки); **Container/Presentational**; **Provider** (Context); **Controlled vs Uncontrolled**; **Lifting State Up**; **Composition over inheritance**; **Slot pattern**; **Error Boundary**; **Portal**; **Ref forwarding**; **Memoization** (`memo`, `useMemo`, `useCallback` — точково). Anti-patterns: prop drilling 5+ рівнів, гігантський Context, premature memo скрізь.

## Приклад

Compound Components:

```tsx
const TabsContext = createContext<{ active: string; setActive: (id: string) => void } | null>(null);

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}
Tabs.List = function List({ children }) { return <div role="tablist">{children}</div>; };
Tabs.Tab = function Tab({ id, children }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button role="tab" aria-selected={ctx.active === id} onClick={() => ctx.setActive(id)}>
      {children}
    </button>
  );
};
Tabs.Panel = function Panel({ id, children }) {
  const ctx = useContext(TabsContext)!;
  return ctx.active === id ? <div role="tabpanel">{children}</div> : null;
};
```

## Юз кейси

- Design system Select: compound API `<Select><Select.Trigger/><Select.Content/></Select>`
- Modal: Portal + focus trap pattern
- Data fetching: custom hook `useUser(id)` обгортає React Query

## Документація

- [Passing data deeply with context — React](https://react.dev/learn/passing-data-deeply-with-context)
- [Render props — React (legacy)](https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop)
