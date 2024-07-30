import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppStore } from 'reduxToolkit/types/store.type';

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
