'use client';
import { DarkModeProvider } from 'kifanga-ui-state';

export function ThemeProvider({ children }) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
