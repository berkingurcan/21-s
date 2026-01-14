/**
 * 21-S App Color Palette
 * Theme: "Midnight Discipline" - Dark & Sharp with Electric Blue
 * Designed for Sigma Male & Zen Aesthetic
 */

// Primary accent - Electric Blue
const accentColor = '#3B82F6'

// Midnight Discipline Palette
export const Colors = {
  // Dark theme (primary - app is dark-first)
  dark: {
    // Backgrounds
    background: '#0A0A0F', // Near black - main background
    surface: '#12121A', // Dark navy - cards, surfaces
    surfaceAlt: '#1A1A24', // Slightly lighter surface for contrast

    // Accent colors
    tint: accentColor,
    accent: accentColor,
    accentMuted: '#1E3A5F', // Deep steel - subtle accent
    accentGlow: 'rgba(59, 130, 246, 0.15)', // Glow effect for cards

    // Text
    text: '#ECEDEE', // Primary text
    textMuted: '#9BA1A6', // Secondary text
    textSubtle: '#6B7280', // Tertiary/placeholder text

    // Borders
    border: '#1E1E28', // Subtle borders
    borderAccent: '#3B82F6', // Accent borders

    // Status colors
    success: '#10B981', // Emerald green - completed
    successMuted: 'rgba(16, 185, 129, 0.15)',
    warning: '#F59E0B', // Amber - in progress
    warningMuted: 'rgba(245, 158, 11, 0.15)',
    error: '#EF4444', // Red - errors
    errorMuted: 'rgba(239, 68, 68, 0.15)',

    // Navigation
    tabIconDefault: '#6B7280',
    tabIconSelected: accentColor,
    icon: '#9BA1A6',

    // Special
    overlay: 'rgba(10, 10, 15, 0.9)', // Modal overlays
    gradient: {
      start: '#12121A',
      end: '#0A0A0F',
    },
  },

  // Light theme (fallback - same as dark for consistency)
  light: {
    background: '#0A0A0F',
    surface: '#12121A',
    surfaceAlt: '#1A1A24',
    tint: accentColor,
    accent: accentColor,
    accentMuted: '#1E3A5F',
    accentGlow: 'rgba(59, 130, 246, 0.15)',
    text: '#ECEDEE',
    textMuted: '#9BA1A6',
    textSubtle: '#6B7280',
    border: '#1E1E28',
    borderAccent: '#3B82F6',
    success: '#10B981',
    successMuted: 'rgba(16, 185, 129, 0.15)',
    warning: '#F59E0B',
    warningMuted: 'rgba(245, 158, 11, 0.15)',
    error: '#EF4444',
    errorMuted: 'rgba(239, 68, 68, 0.15)',
    tabIconDefault: '#6B7280',
    tabIconSelected: accentColor,
    icon: '#9BA1A6',
    overlay: 'rgba(10, 10, 15, 0.9)',
    gradient: {
      start: '#12121A',
      end: '#0A0A0F',
    },
  },
}

// Challenge tier colors (based on mint fee progression)
export const TierColors = {
  beginner: '#3B82F6', // Blue - 0.02 SOL
  intermediate: '#8B5CF6', // Purple - 0.03-0.04 SOL
  advanced: '#F59E0B', // Amber - 0.05-0.06 SOL
  master: '#EF4444', // Red/Gold - 0.07 SOL
}

// Badge rarity colors
export const BadgeColors = {
  common: '#9BA1A6',
  uncommon: '#3B82F6',
  rare: '#8B5CF6',
  epic: '#F59E0B',
  legendary: '#EF4444',
}
