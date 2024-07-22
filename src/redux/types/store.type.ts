import { store } from 'redux/store';

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
