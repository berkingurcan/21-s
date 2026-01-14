/**
 * 21-S App Color Palette
 * Theme: "Midnight Discipline" - Dark & Sharp with Electric Blue
 * Designed for Sigma Male & Zen Aesthetic
 * Updated with 2025 UI Trends: Glassmorphism, subtle gradients
 */

// Primary accent - Electric Blue
const accentColor = '#3B82F6'

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
  warning: string
  warningMuted: string
  error: string
  errorMuted: string

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
    // Backgrounds
    background: '#0A0A0F', // Near black - main background
    surface: '#12121A', // Dark navy - cards, surfaces
    surfaceAlt: '#1A1A24', // Slightly lighter surface for contrast
    surfaceGlass: 'rgba(18, 18, 26, 0.85)', // Glassmorphism effect

    // Accent colors
    tint: accentColor,
    accent: accentColor,
    accentMuted: '#1E3A5F', // Deep steel - subtle accent
    accentGlow: 'rgba(59, 130, 246, 0.12)', // Glow effect for cards
    accentSoft: 'rgba(59, 130, 246, 0.08)', // Softer accent for backgrounds

    // Text
    text: '#F0F1F2', // Primary text - slightly brighter
    textMuted: '#9BA1A6', // Secondary text
    textSubtle: '#6B7280', // Tertiary/placeholder text

    // Borders
    border: '#1E1E28', // Subtle borders
    borderLight: 'rgba(255, 255, 255, 0.06)', // Light glass borders
    borderAccent: '#3B82F6', // Accent borders

    // Status colors
    success: '#10B981', // Emerald green - completed
    successMuted: 'rgba(16, 185, 129, 0.12)',
    warning: '#F59E0B', // Amber - badges, progress
    warningMuted: 'rgba(245, 158, 11, 0.12)',
    error: '#EF4444', // Red - errors
    errorMuted: 'rgba(239, 68, 68, 0.12)',

    // Navigation
    tabIconDefault: '#6B7280',
    tabIconSelected: accentColor,
    icon: '#9BA1A6',

    // Special
    overlay: 'rgba(10, 10, 15, 0.9)', // Modal overlays
    overlayLight: 'rgba(10, 10, 15, 0.6)', // Lighter overlay
  },

  // Light theme (fallback - same as dark for consistency)
  light: {
    background: '#0A0A0F',
    surface: '#12121A',
    surfaceAlt: '#1A1A24',
    surfaceGlass: 'rgba(18, 18, 26, 0.85)',
    tint: accentColor,
    accent: accentColor,
    accentMuted: '#1E3A5F',
    accentGlow: 'rgba(59, 130, 246, 0.12)',
    accentSoft: 'rgba(59, 130, 246, 0.08)',
    text: '#F0F1F2',
    textMuted: '#9BA1A6',
    textSubtle: '#6B7280',
    border: '#1E1E28',
    borderLight: 'rgba(255, 255, 255, 0.06)',
    borderAccent: '#3B82F6',
    success: '#10B981',
    successMuted: 'rgba(16, 185, 129, 0.12)',
    warning: '#F59E0B',
    warningMuted: 'rgba(245, 158, 11, 0.12)',
    error: '#EF4444',
    errorMuted: 'rgba(239, 68, 68, 0.12)',
    tabIconDefault: '#6B7280',
    tabIconSelected: accentColor,
    icon: '#9BA1A6',
    overlay: 'rgba(10, 10, 15, 0.9)',
    overlayLight: 'rgba(10, 10, 15, 0.6)',
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

// Day progress colors (based on week progression)
export const WeekColors = {
  week1: '#3B82F6', // Blue - Foundation (Days 1-7)
  week2: '#8B5CF6', // Purple - Building (Days 8-14)
  week3: '#F59E0B', // Amber - Mastery (Days 15-21)
}

// Kept for backwards compatibility - can be removed if not used elsewhere
export const TierColors = {
  beginner: '#3B82F6',
  intermediate: '#8B5CF6',
  advanced: '#F59E0B',
  master: '#EF4444',
}

export const BadgeColors = {
  common: '#9BA1A6',
  uncommon: '#3B82F6',
  rare: '#8B5CF6',
  epic: '#F59E0B',
  legendary: '#EF4444',
}
