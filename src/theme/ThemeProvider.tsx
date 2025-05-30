import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import React from 'react';
import theme from './theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RestyleThemeProvider theme={theme}>
      {children}
    </RestyleThemeProvider>
  );
}; 