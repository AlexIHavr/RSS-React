import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/types/store.type';

export function useAppDispatch(): AppDispatch {
  return useDispatch<AppDispatch>();
}
