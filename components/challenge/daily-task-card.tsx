/**
 * Daily Task Card Component
 * Shows a day's challenge task with completion and mint options
 */

import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import { DailyChallenge, DayProgress } from '@/types/challenges'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { formatMintFee } from './use-mint-badge'

interface DailyTaskCardProps {
  challenge: DailyChallenge
  progress: DayProgress
  onComplete: () => void
  onMint?: () => void
  isCompleting?: boolean
  isMinting?: boolean
}

export function DailyTaskCard({
  challenge,
  progress,
  onComplete,
  onMint,
  isCompleting = false,
  isMinting = false,
}: DailyTaskCardProps) {
  const colors = Colors.dark

  const isCompleted = progress.completed
  const isMinted = progress.badgeMinted
  const canMint = isCompleted && !isMinted

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: isCompleted ? colors.success : colors.accent,
          borderWidth: 2,
        },
      ]}
    >
      {/* Day Header */}
      <View style={styles.header}>
        <View style={styles.dayInfo}>
          <AppText style={[styles.dayLabel, { color: colors.textMuted }]}>
            DAY
          </AppText>
          <AppText style={[styles.dayNumber, { color: colors.text }]}>
            {challenge.day}
          </AppText>
        </View>

        <View style={styles.headerRight}>
          {isMinted ? (
            <View style={[styles.statusBadge, { backgroundColor: colors.successMuted }]}>
              <UiIconSymbol name="trophy.fill" size={16} color={colors.warning} />
              <AppText style={[styles.statusText, { color: colors.success }]}>
                MINTED
              </AppText>
            </View>
          ) : isCompleted ? (
            <View style={[styles.statusBadge, { backgroundColor: colors.successMuted }]}>
              <UiIconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
              <AppText style={[styles.statusText, { color: colors.success }]}>
                DONE
              </AppText>
            </View>
          ) : (
            <View style={[styles.statusBadge, { backgroundColor: colors.accentGlow }]}>
              <UiIconSymbol name="flame.fill" size={16} color={colors.accent} />
              <AppText style={[styles.statusText, { color: colors.accent }]}>
                TODAY
              </AppText>
            </View>
          )}
        </View>
      </View>

      {/* Title */}
      <AppText style={[styles.title, { color: colors.text }]}>
        {challenge.title}
      </AppText>

      {/* Task Content */}
      <AppText style={[styles.task, { color: colors.text }]}>
        {challenge.task}
      </AppText>

      {/* Tip Section */}
      <View style={[styles.tipSection, { backgroundColor: colors.surfaceAlt }]}>
        <UiIconSymbol name="lightbulb.fill" size={16} color={colors.warning} />
        <AppText style={[styles.tipText, { color: colors.textMuted }]}>
          {challenge.tip}
        </AppText>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {!isCompleted ? (
          <TouchableOpacity
            onPress={onComplete}
            disabled={isCompleting}
            style={[styles.completeButton, { backgroundColor: colors.accent }]}
            activeOpacity={0.8}
          >
            <UiIconSymbol name="checkmark.circle.fill" size={22} color="#FFFFFF" />
            <AppText style={styles.buttonText}>
              {isCompleting ? 'Completing...' : 'Mark Complete'}
            </AppText>
          </TouchableOpacity>
        ) : canMint && onMint ? (
          <TouchableOpacity
            onPress={onMint}
            disabled={isMinting}
            style={[styles.mintButton, { backgroundColor: colors.accent }]}
            activeOpacity={0.8}
          >
            <UiIconSymbol name="trophy.fill" size={20} color="#FFFFFF" />
            <AppText style={styles.buttonText}>
              {isMinting ? 'Minting...' : `Mint Badge - ${formatMintFee(challenge.mintFee)}`}
            </AppText>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dayNumber: {
    fontSize: 32,
    fontWeight: '800',
  },
  headerRight: {},
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  task: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  tipSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  actions: {},
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
  },
  mintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
})
