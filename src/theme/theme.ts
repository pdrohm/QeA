import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8A6FDF',
  purple: '#5A31F4',
  purpleDark: '#3F22AB',
  greenLight: '#56DCBA',
  green: '#0ECD9D',
  greenDark: '#0A906E',
  black: '#0B0B0B',
  white: '#F0F2F3',
  gray: '#8E8E93',
  grayLight: '#C7C7CC',
  grayDark: '#636366',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purple,
    textPrimary: palette.black,
    textSecondary: palette.gray,
    textOnPrimary: palette.white,
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