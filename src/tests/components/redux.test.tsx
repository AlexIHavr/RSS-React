import { set } from 'reduxToolkit/reducers/page/page.reducer';
import { add, remove, removeAll } from 'reduxToolkit/reducers/select/select.reducer';
import { store } from 'reduxToolkit/store';
import { describe, expect, test } from 'vitest';

describe('redux reducers tests', () => {
  test('change page reducer', () => {
    const testValue = 5;

    store.dispatch(set(testValue));

    expect(store.getState().page.currentPage).toBe(testValue);
  });

  test('change select reducer', () => {
    const testValue = 'test';

    store.dispatch(add(testValue));

    expect(store.getState().select.selectedNames).toContain(testValue);

    store.dispatch(remove(testValue));

    expect(store.getState().select.selectedNames).not.toContain(testValue);

    store.dispatch(add(testValue));
    store.dispatch(add(testValue));
    store.dispatch(add(testValue));

    expect(store.getState().select.selectedNames.length).toBe(3);

    store.dispatch(removeAll());

    expect(store.getState().select.selectedNames.length).toBe(0);
  });
});
