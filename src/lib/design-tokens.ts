export const colors = {
  primary: {
    DEFAULT: '#17365D',
    dark: '#102A48',
  },
  accent: {
    DEFAULT: '#E58A1F',
    light: '#FFF4E5',
  },
  background: '#F7F8FA',
  surface: '#FFFFFF',
  text: {
    primary: '#17202A',
    secondary: '#586575',
  },
  border: '#D9DEE5',
  success: {
    DEFAULT: '#16845B',
    bg: '#EAF7F1',
  },
  warning: {
    DEFAULT: '#B7791F',
    bg: '#FFF7E6',
  },
  error: {
    DEFAULT: '#C53030',
    bg: '#FDECEC',
  },
  info: {
    DEFAULT: '#2563EB',
    bg: '#EEF5FF',
  },
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '40px',
  8: '48px',
  9: '64px',
  10: '80px',
} as const;

export const radius = {
  input: '8px',
  button: '8px',
  card: '12px',
  dialog: '12px',
  badge: '999px',
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    desktop: {
      h1: '40px',
      h2: '30px',
      h3: '20px',
      body: '16px',
      small: '14px',
      caption: '12px',
    },
    mobile: {
      h1: '32px',
      h2: '24px',
      h3: '18px',
      body: '16px',
    },
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.1',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const;

export const shadows = {
  card: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
  dialog: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1024px',
} as const;

export type ColorPalette = typeof colors;
export type SpacingScale = typeof spacing;
export type RadiusScale = typeof radius;
export type TypographyScale = typeof typography;