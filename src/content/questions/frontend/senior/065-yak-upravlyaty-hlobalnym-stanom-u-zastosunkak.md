---
title: "Як управляти глобальним станом у застосунках на Angular через ngrx/store?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 65
difficulty: medium
---

## Відповідь

NgRx — Redux pattern для Angular: **Store** (єдине immutable state tree), **Actions** (події), **Reducers** (чисті переходи стану), **Effects** (side effects — API), **Selectors** (мемоізовані запити). Flow: component dispatch action → reducer оновлює state → selectors емітять новий slice → async pipe оновлює view. `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity` для колекцій. Senior: feature stores (`StoreModule.forFeature`), не один гігантський state; **ComponentStore** для локального складного стану; NgRx лише коли boilerplate виправданий масштабом команди.

## Приклад

```ts
// orders.actions.ts
export const loadOrders = createAction('[Orders] Load');
export const loadOrdersSuccess = createAction('[Orders] Load Success', props<{ orders: Order[] }>());

// orders.reducer.ts
export const ordersReducer = createReducer(
  initialState,
  on(loadOrdersSuccess, (state, { orders }) => ordersAdapter.setAll(orders, state))
);

// orders.effects.ts
loadOrders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadOrders),
    switchMap(() => this.api.getOrders().pipe(
      map(orders => loadOrdersSuccess({ orders })),
      catchError(err => of(loadOrdersFailure({ error: err.message })))
    ))
  )
);

// component
orders$ = this.store.select(selectAllOrders);
ngOnInit() { this.store.dispatch(loadOrders()); }
```

## Юз кейси

- Enterprise Angular: feature module `orders/` з власним store slice
- Optimistic update: dispatch update → rollback action при помилці API
- DevTools time-travel debug для відтворення production bug

## Документація

- [NgRx Store — Documentation](https://ngrx.io/guide/store)
- [Angular signals — Documentation](https://angular.dev/guide/signals)
