import { useDispatch } from 'react-redux';
import { AppDispatch } from 'reduxToolkit/types/store.type';

export function useAppDispatch(): AppDispatch {
  return useDispatch<AppDispatch>();
}
