/**
 * 21-S App Color Palette
 * Theme: "Midnight Discipline" - Dark & Sharp
 * Sigma Male Aesthetic - Minimal, Bold, Confident
 */

// Primary accent - Cold Steel Blue
const accentColor = '#4A90E2'

// Color palette type
interface ColorPalette {
  // Backgrounds
  background: string
  surface: string
  surfaceAlt: string
  surfaceGlass: string

  // Accent colors
  tint: string
  accent: string
  accentMuted: string
  accentGlow: string
  accentSoft: string

  // Text
  text: string
  textMuted: string
  textSubtle: string

  // Borders
  border: string
  borderLight: string
  borderAccent: string

  // Status colors
  success: string
  successMuted: string
  gold: string
  goldMuted: string
  warning: string
  warningMuted: string
  error: string
  errorMuted: string
  tip: string
  tipMuted: string

  // Navigation
  tabIconDefault: string
  tabIconSelected: string
  icon: string

  // Special
  overlay: string
  overlayLight: string
}

// Separate gradient type (not used as direct colors)
interface GradientConfig {
  start: string
  end: string
}

interface ShimmerConfig {
  start: string
  middle: string
  end: string
}

interface ThemeConfig {
  colors: ColorPalette
  gradient: GradientConfig
  shimmer: ShimmerConfig
}

// Midnight Discipline Palette
export const Colors: { dark: ColorPalette; light: ColorPalette } = {
  // Dark theme (primary - app is dark-first)
  dark: {
    // Backgrounds - Deep, minimal
    background: '#08080C', // True dark
    surface: '#101014', // Card surfaces
    surfaceAlt: '#18181E', // Elevated surfaces
    surfaceGlass: 'rgba(16, 16, 20, 0.92)',

    // Accent colors - Cold, confident
    tint: accentColor,
    accent: accentColor,
    accentMuted: '#1A2D4A',
    accentGlow: 'rgba(74, 144, 226, 0.10)',
    accentSoft: 'rgba(74, 144, 226, 0.06)',

    // Text - High contrast hierarchy
    text: '#FFFFFF',
    textMuted: '#8A8F98',
    textSubtle: '#5C6370',

    // Borders - Subtle, sharp
    border: '#1C1C24',
    borderLight: 'rgba(255, 255, 255, 0.04)',
    borderAccent: accentColor,

    // Status colors - Muted, sophisticated
    success: '#22C55E',
    successMuted: 'rgba(34, 197, 94, 0.10)',
    gold: '#C084FC', // Purple for badges
    goldMuted: 'rgba(192, 132, 252, 0.10)',
    warning: '#F59E0B',
    warningMuted: 'rgba(245, 158, 11, 0.10)',
    error: '#EF4444',
    errorMuted: 'rgba(239, 68, 68, 0.10)',
    tip: '#8A8F98', // Muted - tips blend in
    tipMuted: 'rgba(138, 143, 152, 0.08)',

    // Navigation
    tabIconDefault: '#5C6370',
    tabIconSelected: accentColor,
    icon: '#8A8F98',

    // Special
    overlay: 'rgba(8, 8, 12, 0.95)',
    overlayLight: 'rgba(8, 8, 12, 0.7)',
  },

  // Light theme (same as dark - dark-first design)
  light: {
    background: '#08080C',
    surface: '#101014',
    surfaceAlt: '#18181E',
    surfaceGlass: 'rgba(16, 16, 20, 0.92)',
    tint: accentColor,
    accent: accentColor,
    accentMuted: '#1A2D4A',
    accentGlow: 'rgba(74, 144, 226, 0.10)',
    accentSoft: 'rgba(74, 144, 226, 0.06)',
    text: '#FFFFFF',
    textMuted: '#8A8F98',
    textSubtle: '#5C6370',
    border: '#1C1C24',
    borderLight: 'rgba(255, 255, 255, 0.04)',
    borderAccent: accentColor,
    success: '#22C55E',
    successMuted: 'rgba(34, 197, 94, 0.10)',
    gold: '#C084FC',
    goldMuted: 'rgba(192, 132, 252, 0.10)',
    warning: '#F59E0B',
    warningMuted: 'rgba(245, 158, 11, 0.10)',
    error: '#EF4444',
    errorMuted: 'rgba(239, 68, 68, 0.10)',
    tip: '#8A8F98',
    tipMuted: 'rgba(138, 143, 152, 0.08)',
    tabIconDefault: '#5C6370',
    tabIconSelected: accentColor,
    icon: '#8A8F98',
    overlay: 'rgba(8, 8, 12, 0.95)',
    overlayLight: 'rgba(8, 8, 12, 0.7)',
  },
}

// Gradient configurations (separate from colors for proper typing)
export const Gradients = {
  dark: {
    background: {
      start: '#12121A',
      end: '#0A0A0F',
    },
    shimmer: {
      start: 'rgba(255, 255, 255, 0)',
      middle: 'rgba(255, 255, 255, 0.05)',
      end: 'rgba(255, 255, 255, 0)',
    },
  },
  light: {
    background: {
      start: '#12121A',
      end: '#0A0A0F',
    },
    shimmer: {
      start: 'rgba(255, 255, 255, 0)',
      middle: 'rgba(255, 255, 255, 0.05)',
      end: 'rgba(255, 255, 255, 0)',
    },
  },
}

// Week progression - Monochromatic with intensity shift
export const WeekColors = {
  week1: '#4A90E2', // Steel Blue - Foundation
  week2: '#7C3AED', // Violet - Building
  week3: '#FFFFFF', // White - Mastery
}

export const TierColors = {
  beginner: '#4A90E2',
  intermediate: '#7C3AED',
  advanced: '#A855F7',
  master: '#FFFFFF',
}

export const BadgeColors = {
  common: '#5C6370',
  uncommon: '#4A90E2',
  rare: '#7C3AED',
  epic: '#A855F7',
  legendary: '#FFFFFF',
}
