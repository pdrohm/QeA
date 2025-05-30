import { createTheme } from '@shopify/restyle';
import { palette } from './palette';



const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purple,
    textPrimary: palette.black,
    textSecondary: palette.gray,
    textOnPrimary: palette.white,
    cardBackground: palette.lightGray,
    primary: palette.purple,
    white: palette.white,
    black: palette.black,
    gray: palette.gray,
    lightGray: palette.lightGray,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  textVariants: {
    header: {
      fontSize: 34,
      fontWeight: 'bold',
    },
    subheader: {
      fontSize: 28,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
      color: 'textSecondary',
    },
  },
});

export type Theme = typeof theme;

export default theme;