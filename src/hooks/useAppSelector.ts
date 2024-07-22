import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppStore } from 'redux/types/store.type';

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
