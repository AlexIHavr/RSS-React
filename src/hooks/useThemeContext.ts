import { useContext } from 'react';
import { ThemeContext, ThemeDefaultState } from 'utils/context';

export function useThemeContext(): ThemeDefaultState {
  return useContext(ThemeContext);
}
