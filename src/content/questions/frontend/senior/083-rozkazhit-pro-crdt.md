---
title: "Розкажіть про CRDT."
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 83
difficulty: hard
---

## Відповідь

**CRDT** (Conflict-free Replicated Data Type) — структура даних, що merges без conflicts при concurrent edits offline/online. Типи: **state-based** (надсилання повного state) vs **operation-based** (надсилання ops). Приклади: **G-Counter**, **LWW-Register**, **OR-Set**, **RGA** (text), **Yjs** (document). Застосування: collaborative editors (Notion-like), Figma, альтернативи Google Docs. Властивості: commutative, associative, idempotent merge. Альтернатива OT (Operational Transform) — простіше для decentralization/P2P.

## Приклад

Yjs collaborative text (conceptual):

```js
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const ydoc = new Y.Doc();
const ytext = ydoc.getText('document');

const provider = new WebsocketProvider('wss://collab.example.com', 'room-1', ydoc);

ytext.observe(() => {
  editor.setContent(ytext.toString()); // sync local editor
});

editor.onChange = (delta) => {
  ydoc.transact(() => ytext.insert(ytext.length, delta)); // merge via CRDT
};
```

Two users edit offline — on reconnect CRDT merge без втрат ( eventual consistency ).

## Юз кейси

- Collaborative whiteboard: Yjs + WebSocket — без центрального lock
- Offline-first notes app: локальний CRDT state синхронізується при reconnect
- vs last-write-wins: CRDT зберігає char inserts обох користувачів у тексті

## Документація

- [Yjs — Documentation](https://docs.yjs.dev/)
