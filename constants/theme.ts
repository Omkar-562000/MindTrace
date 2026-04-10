import { MD3LightTheme } from 'react-native-paper';
import { AffectiveState } from '@/constants/DummyData';

export const palette = {
  navy: '#0A1F12',
  ink: '#1A3324',
  slate: '#4A7A5C',
  mist: '#F0FAF5',
  surface: '#FFFFFF',
  border: '#C8EDD8',
  primary: '#2D9B5A',
  primaryMuted: '#D6F5E6',
  secondary: '#4CAF7D',
  secondaryMuted: '#E0F7EC',
  forest: '#0D2818',
  forestMid: '#1A5C38',
  mint: '#B8F0D0',
  mintSoft: '#E8F8EE',
  sage: '#8FC9A9',
  warning: '#2D9B5A',
  warningMuted: '#D6F5E6',
  danger: '#E05252',
  dangerMuted: '#FDEAEA',
  accent: '#34A853',
  accentMuted: '#D8F5E2',
  sky: '#6FCF97',
  glow: '#B8F0D0',
};

export const gradients = {
  hero: ['#0D2818', '#1A5C38', '#2D9B5A'] as const,
  calm: ['#F0FAF5', '#E8F8EE'] as const,
  alert: ['#E8F8EE', '#D6F5E6'] as const,
};

export const appTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    secondary: palette.secondary,
    tertiary: palette.accent,
    background: palette.mist,
    surface: palette.surface,
    surfaceVariant: palette.mintSoft,
    outline: palette.border,
    error: palette.danger,
    onPrimary: '#FFFFFF',
    onSurface: palette.navy,
    onSurfaceVariant: palette.slate,
    primaryContainer: palette.primaryMuted,
    onPrimaryContainer: palette.forestMid,
    secondaryContainer: palette.secondaryMuted,
  },
  roundness: 18,
};

export const Colors = {
  light: {
    text: palette.navy,
    background: palette.mist,
    tint: palette.primary,
    icon: palette.slate,
    tabIconDefault: '#8C96A8',
    tabIconSelected: palette.primary,
  },
  dark: {
    text: palette.surface,
    background: palette.navy,
    tint: palette.surface,
    icon: '#C0C7D4',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: palette.surface,
  },
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
};

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const shadows = {
  card: {
    elevation: 3,
    shadowColor: '#0D2818',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
};

export const emotionThemes: Record<
  AffectiveState,
  {
    gradient: [string, string, string];
    surfaceTint: string;
    accent: string;
    soft: string;
  }
> = {
  curiosity: {
    gradient: ['#0D2818', '#1A5C38', '#2D9B5A'],
    surfaceTint: '#E8F8EE',
    accent: '#2D9B5A',
    soft: '#B8F0D0',
  },
  confusion: {
    gradient: ['#0D2818', '#1A4030', '#2D7A50'],
    surfaceTint: '#EAF5EE',
    accent: '#2D7A50',
    soft: '#C8EDD8',
  },
  frustration: {
    gradient: ['#1A0A0A', '#5A2020', '#E05252'],
    surfaceTint: '#FDEAEA',
    accent: '#E05252',
    soft: '#FFE0E0',
  },
  boredom: {
    gradient: ['#0D1F18', '#1A4535', '#34A853'],
    surfaceTint: '#E0F5E8',
    accent: '#34A853',
    soft: '#C8EDD8',
  },
};

export const getEmotionTheme = (state: AffectiveState) => emotionThemes[state];
