---
title: "Як можна реалізувати Virtual DOM аналогічно реалізації в React?"
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 90
difficulty: hard
---

## Відповідь

Virtual DOM — легке JS-дерево, що віддзеркалює UI. Flow: **render** vdom з state → **diff** old vs new (reconciliation) → **patch** real DOM мінімальними ops. VNode shape: `{ type, props, children }`. Diff heuristics: той самий type → update props; інший type → replace; lists з `key` для O(n) reorder. React Fiber додає incremental work. Спрощена реалізація пояснює core concepts — production використовує React/Preact.

## Приклад

```js
function h(type, props, ...children) {
  return { type, props: props || {}, children: children.flat() };
}

function diff(oldVNode, newVNode) {
  if (!oldVNode) return { type: 'CREATE', newVNode };
  if (!newVNode) return { type: 'REMOVE' };
  if (typeof newVNode === 'string') {
    return oldVNode !== newVNode ? { type: 'TEXT', value: newVNode } : null;
  }
  if (oldVNode.type !== newVNode.type) return { type: 'REPLACE', newVNode };
  return { type: 'UPDATE', props: newVNode.props, children: newVNode.children };
}

function patch(parent, patchObj, domNode) {
  if (patchObj.type === 'CREATE') {
    parent.appendChild(createDom(patchObj.newVNode));
  } else if (patchObj.type === 'TEXT') {
    domNode.textContent = patchObj.value;
  }
  // ... UPDATE props, reconcile children with keys
}
```

## Юз кейси

- Live-coding на співбесіді: implement h() + patch для counter
- Зрозуміти React keys: неправильний key → full re-mount, втрата state
- Preact/React internals debug: чому reconciliation пропустив subtree

## Документація

- [Rendering trees — React](https://react.dev/learn/understanding-your-ui-as-a-tree)
