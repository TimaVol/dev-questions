---
title: "Чи ознайомлені ви з архітектурою мікрофронтендів? Можливо, знаєте конкретні реалізації?"
topic: frontend
grade: senior
category: "Архітектура"
order: 103
difficulty: hard
---

## Відповідь

Microfrontends — незалежно deployable frontend apps, зібрані в shell. Інтеграція: **Module Federation** (Webpack/Rspack/Vite federation), **iframe** (сильна ізоляція, незручний UX), **Web Components**, **single-spa**. Виклики: **shared dependencies** (React singleton), **routing**, **CSS conflicts**, **consistent UX**, **version skew**. Tools: **Nx Module Federation**, **Bit**, **Luigi** (SAP). Коли: кілька автономних команд, legacy coexistence. Уникати для малих команд — operational tax високий.

## Приклад

Module Federation (host + remote):

```js
// host webpack.config
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    checkout: 'checkout@https://checkout.example.com/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});

// shell App.tsx
const Checkout = lazy(() => import('checkout/CheckoutApp'));
```

iframe isolation (quick integration):

```html
<iframe src="https://legacy-admin.example.com/users" title="User admin" />
```

## Юз кейси

- Bank: legacy Angular admin в iframe + новий React shell
- Дві команди: checkout remote deploy у п'ятницю без shell redeploy
- Pitfall fixed: shared react@18 singleton — запобіг duplicate hook errors

## Документація

- [Micro-frontends — martinfowler.com](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation — webpack](https://webpack.js.org/concepts/module-federation/)
