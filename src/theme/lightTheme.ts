import { createTheme } from '@nextui-org/react';

export const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primary: '#FFFFFF',
      primary100: '#FFFFFF',
      primary200: '#FDFCFC',
      primary300: '#EFF0F6',
      primary400: '#D9D9D9',
      primary500: '#978F8A',
      primary600: '#929191',

      secondary100: '#676767',
      secondary200: '#545454',
      secondary300: '#414141',
      secondary400: '#2F2F2F',
      secondary500: '#1D1D1D',
      secondary600: '#0A0A0A',

      accent100: '#FC5B45',
      accent200: '#FB280C',
      accent300: '#CB1A03',
      accent400: '#921302',
      accent500: '#590C01',
      accent600: '#290501',

      link: '$secondary600',
    },
    fonts: {},
    fontSizes: {
      xs: '0.75rem' /* 12px */,
      sm: '0.875rem' /* 14px */,
      base: '1rem' /* 16px */,
      md: '1rem' /* 16px */,
      lg: '1.125rem' /* 18px */,
      xl: '1.25rem' /* 20px */,
      '2xl': '1.5rem' /* 24px */,
      '3xl': '1.875rem' /* 30px */,
      '4xl': '2.25rem' /* 36px */,
      '5xl': '3rem' /* 48px */,
      '6xl': '3.75rem' /* 60px */,
      '7xl': '4.5rem' /* 72px */,
      '8xl': '6rem' /* 96px */,
      '9xl': '8rem' /* 128px */,
      '10xl': '9rem' /* 144px */,
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      xs: 1 /* 16px */,
      sm: 1.25 /* 20px */,
      base: 1.5 /* 24px */,
      md: 1.5 /* 24px */,
      lg: 1.75 /* 28px */,
      xl: 1.75 /* 28px */,
      '2xl': 2 /* 32px */,
      '3xl': 2.25 /* 36px */,
      '4xl': 2.5 /* 40px */,
      '5xl': 3 /* 48px */,
      '6xl': 3.25 /* 56px */,
      '7xl': 3.5 /* 56px */,
    },
    radii: {
      xs: '7px',
      sm: '9px',
      md: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '24px',
      '3xl': '32px',
      squared: '33%',
      rounded: '50%',
      pill: '9999px',
    },
    borderWeights: {
      light: '1px',
      normal: '2px',
      bold: '3px',
      extrabold: '4px',
      black: '5px',
    },
    space: {
      1: '0.125rem',
      2: '0.25rem',
      3: '0.375rem',
      4: '0.5rem',
      5: '0.625rem',
      6: '0.7rem',
      7: '0.75rem',
      8: '0.875rem',
      9: '1rem',
      10: '1.25rem',
      11: '1.5rem',
      12: '1.75rem',
      13: '2rem',
      14: '2.25rem',
      15: '2.5rem',
      16: '2.75rem',
      17: '3rem',
      18: '3.5rem',
      19: '3.75rem',
      20: '4rem',
      21: '5rem',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      5: '500',
      10: '1000',
      max: '9999',
    },
    shadows: {
      cardShadow: '0 2px 5px 0px rgb(128 128 128)',
    },
  },
});
