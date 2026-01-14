/**
 * Day Card Component
 * Displays a day card for the grid view
 */

import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import { DailyChallenge, DayProgress } from '@/types/challenges'
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native'
import { formatMintFee } from './use-mint-badge'

interface DayCardProps {
  challenge: DailyChallenge
  progress?: DayProgress | null
  isCurrent?: boolean
  onPress?: () => void
  style?: ViewStyle
}

export function DayCard({
  challenge,
  progress,
  isCurrent = false,
  onPress,
  style,
}: DayCardProps) {
  const colors = Colors.dark

  const isCompleted = progress?.completed ?? false
  const isMinted = progress?.badgeMinted ?? false

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: isCurrent
            ? colors.accentGlow
            : isCompleted
              ? colors.successMuted
              : colors.surface,
          borderColor: isCurrent
            ? colors.accent
            : isCompleted
              ? colors.success
              : colors.border,
        },
        style,
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <AppText
          style={[
            styles.dayNumber,
            {
              color: isCurrent
                ? colors.accent
                : isCompleted
                  ? colors.success
                  : colors.text,
            },
          ]}
        >
          {challenge.day}
        </AppText>

        {/* Status Icon */}
        {isMinted ? (
          <UiIconSymbol name="trophy.fill" size={14} color={colors.warning} />
        ) : isCompleted ? (
          <UiIconSymbol name="checkmark.circle.fill" size={14} color={colors.success} />
        ) : isCurrent ? (
          <UiIconSymbol name="flame.fill" size={14} color={colors.accent} />
        ) : null}
      </View>

      {/* Title */}
      <AppText
        style={[styles.title, { color: colors.textMuted }]}
        numberOfLines={2}
      >
        {challenge.title}
      </AppText>

      {/* Mint Fee */}
      <AppText style={[styles.mintFee, { color: colors.textSubtle }]}>
        {formatMintFee(challenge.mintFee)}
      </AppText>
    </TouchableOpacity>
  )
}

// Compact version for grid display
export function DayCardCompact({
  challenge,
  progress,
  isCurrent = false,
  onPress,
}: DayCardProps) {
  const colors = Colors.dark

  const isCompleted = progress?.completed ?? false
  const isMinted = progress?.badgeMinted ?? false

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.compactContainer,
        {
          backgroundColor: isCurrent
            ? colors.accentGlow
            : isCompleted
              ? colors.successMuted
              : colors.surface,
          borderColor: isCurrent
            ? colors.accent
            : isCompleted
              ? colors.success
              : colors.border,
        },
      ]}
    >
      <View style={styles.compactHeader}>
        <AppText
          style={[
            styles.compactDayNumber,
            {
              color: isCurrent
                ? colors.accent
                : isCompleted
                  ? colors.success
                  : colors.text,
            },
          ]}
        >
          {challenge.day}
        </AppText>

        {isMinted ? (
          <UiIconSymbol name="trophy.fill" size={12} color={colors.warning} />
        ) : isCompleted ? (
          <UiIconSymbol name="checkmark.circle.fill" size={12} color={colors.success} />
        ) : null}
      </View>

      <AppText
        style={[styles.compactTitle, { color: colors.textMuted }]}
        numberOfLines={1}
      >
        {challenge.title}
      </AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: '800',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  mintFee: {
    fontSize: 11,
    fontWeight: '500',
  },
  // Compact styles
  compactContainer: {
    width: '18.5%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  compactDayNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  compactTitle: {
    fontSize: 9,
    fontWeight: '500',
  },
})
