import { Dispatch, SetStateAction, createContext } from 'react';

export enum Theme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export interface ThemeDefaultState {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeDefaultState>({
  theme: Theme.LIGHT,
  setTheme: () => {},
});
