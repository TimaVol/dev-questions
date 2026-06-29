---
title: "Наведіть приклад React-патерну Compound components."
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 61
difficulty: hard
---

## Відповідь

Compound Components — група компонентів що **спільно працюють**, ділять implicit state через Context, дають **flexible API** без prop explosion. Приклади в wild: `<select>` + `<option>`, Radix UI, Reach UI. Переваги: encapsulation, a11y в одному місці, consumer контролює markup order. Реалізація: Context + static properties (`Accordion.Item`, `Accordion.Panel`).

## Приклад

Accordion compound component:

```tsx
const AccordionCtx = createContext<{
  openId: string | null;
  toggle: (id: string) => void;
} | null>(null);

export function Accordion({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));
  return <AccordionCtx.Provider value={{ openId, toggle }}>{children}</AccordionCtx.Provider>;
}

Accordion.Item = function Item({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const ctx = useContext(AccordionCtx)!;
  const isOpen = ctx.openId === id;
  return (
    <div className="accordion-item">
      <button aria-expanded={isOpen} onClick={() => ctx.toggle(id)}>{title}</button>
      {isOpen && <div role="region">{children}</div>}
    </div>
  );
};

// Usage
<Accordion>
  <Accordion.Item id="shipping" title="Доставка">Доставка 1–3 дні</Accordion.Item>
  <Accordion.Item id="returns" title="Повернення">14 днів на повернення</Accordion.Item>
</Accordion>
```

## Юз кейси

- FAQ section: consumer додає/прибирає items без змін Accordion internals
- Dropdown: Trigger + Content + Item — keyboard nav централізовано
- Замість prop mess: `<Select label="Країна" options={[...]} />` → composable API

## Документація

- [Passing data deeply with context — React](https://react.dev/learn/passing-data-deeply-with-context)
