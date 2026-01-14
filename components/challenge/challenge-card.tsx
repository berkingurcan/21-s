/**
 * Challenge Card Component
 * Displays a challenge with its progress and status
 */

import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native'
import { AppText } from '@/components/app-text'
import { Colors, TierColors } from '@/constants/colors'
import { Challenge, ChallengeProgress } from '@/types/challenges'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'

interface ChallengeCardProps {
  challenge: Challenge
  progress?: ChallengeProgress | null
  status: 'locked' | 'available' | 'active' | 'completed'
  onPress?: () => void
  style?: ViewStyle
  compact?: boolean
}

export function ChallengeCard({
  challenge,
  progress,
  status,
  onPress,
  style,
  compact = false,
}: ChallengeCardProps) {
  const colors = Colors.dark
  const tierColor = TierColors[challenge.tier]

  const completedDays = progress?.daysCompleted.length || 0
  const progressPercent = Math.round((completedDays / 21) * 100)

  const isLocked = status === 'locked'
  const isActive = status === 'active'
  const isCompleted = status === 'completed'

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: isActive ? colors.accent : colors.border,
          borderWidth: isActive ? 2 : 1,
          opacity: isLocked ? 0.5 : 1,
        },
        style,
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View
            style={[styles.tierBadge, { backgroundColor: tierColor + '20' }]}
          >
            <AppText style={[styles.tierText, { color: tierColor }]}>
              {challenge.tier.toUpperCase()}
            </AppText>
          </View>
          <AppText style={[styles.level, { color: colors.textMuted }]}>
            #{challenge.id}
          </AppText>
        </View>

        {/* Status Icon */}
        <View style={styles.statusIcon}>
          {isLocked && (
            <UiIconSymbol name="lock.fill" size={20} color={colors.textMuted} />
          )}
          {isCompleted && (
            <UiIconSymbol
              name="checkmark.circle.fill"
              size={24}
              color={colors.success}
            />
          )}
          {isActive && (
            <UiIconSymbol name="flame.fill" size={24} color={colors.accent} />
          )}
        </View>
      </View>

      {/* Title & Description */}
      <AppText type="subtitle" style={{ color: colors.text, marginTop: 8 }}>
        {challenge.title}
      </AppText>

      {!compact && (
        <AppText
          style={[styles.description, { color: colors.textMuted }]}
          numberOfLines={2}
        >
          {challenge.description}
        </AppText>
      )}

      {/* Progress Bar (for active/completed) */}
      {(isActive || isCompleted) && (
        <View style={styles.progressSection}>
          <View
            style={[styles.progressBar, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: isCompleted ? colors.success : colors.accent,
                },
              ]}
            />
          </View>
          <AppText style={[styles.progressText, { color: colors.textMuted }]}>
            {completedDays}/21 days
          </AppText>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.badgePreview}>
          <UiIconSymbol
            name="trophy.fill"
            size={16}
            color={isCompleted ? colors.success : colors.textMuted}
          />
          <AppText
            style={[
              styles.badgeName,
              { color: isCompleted ? colors.success : colors.textMuted },
            ]}
          >
            {challenge.badge.name}
          </AppText>
        </View>

        <View style={styles.mintFee}>
          <AppText style={[styles.feeText, { color: tierColor }]}>
            {challenge.mintFee} SOL
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  level: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusIcon: {},
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  progressSection: {
    marginTop: 12,
    gap: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  badgePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeName: {
    fontSize: 13,
    fontWeight: '500',
  },
  mintFee: {},
  feeText: {
    fontSize: 14,
    fontWeight: '700',
  },
})
