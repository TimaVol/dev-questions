---
title: "Опишіть створення доступного модального вікна."
topic: frontend
grade: senior
category: "Accessibility"
order: 113
difficulty: hard
---

## Відповідь

Accessible modal — це не `position: fixed` div. Вимоги: **focus trap** (Tab циклить всередині), **focus restore** (повернути focus на trigger при close), **Escape** закриває, **aria-modal="true"**, **role="dialog"**, **aria-labelledby** на title, **scroll lock** на body, **backdrop click** (optional, з confirm якщо unsaved), **inert** на background (`inert` attribute або aria-hidden на siblings). Нативний `<dialog>` з `showModal()` дає більшість з коробки. Screen reader: announce dialog on open. Не auto-focus на destructive action.

## Приклад

```tsx
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      dialog.showModal();
    } else {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-title"
      onClose={onClose}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose}>Закрити</button>
    </dialog>
  );
}
```

Radix/shadcn Dialog — production-ready focus trap + portal.

## Юз кейси

- Delete confirmation: focus на «Скасувати», не «Видалити»
- Multi-step wizard modal: focus trap per step, aria-current step indicator
- Nested modal: рідко потрібно — краще replace content, не stack dialogs

## Документація

- [`<dialog>` — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [Dialog pattern — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
