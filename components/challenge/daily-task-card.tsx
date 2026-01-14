/**
 * Daily Task Card Component
 * Sigma aesthetic - minimal, bold, confident
 */

import { AppText } from '@/components/app-text'
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
          borderColor: colors.border,
        },
      ]}
    >
      {/* Day Header - Minimal */}
      <View style={styles.header}>
        <View style={styles.dayInfo}>
          <AppText style={[styles.dayNumber, { color: colors.text }]}>
            {String(challenge.day).padStart(2, '0')}
          </AppText>
          <View style={[styles.dayDivider, { backgroundColor: colors.border }]} />
          <AppText style={[styles.dayLabel, { color: colors.textSubtle }]}>
            DAY
          </AppText>
        </View>

        {isMinted ? (
          <View style={[styles.statusBadge, { backgroundColor: colors.successMuted }]}>
            <AppText style={[styles.statusText, { color: colors.success }]}>
              MINTED
            </AppText>
          </View>
        ) : isCompleted ? (
          <View style={[styles.statusBadge, { backgroundColor: colors.successMuted }]}>
            <AppText style={[styles.statusText, { color: colors.success }]}>
              COMPLETE
            </AppText>
          </View>
        ) : (
          <View style={[styles.statusBadge, { backgroundColor: colors.accentGlow }]}>
            <AppText style={[styles.statusText, { color: colors.accent }]}>
              ACTIVE
            </AppText>
          </View>
        )}
      </View>

      {/* Title - Bold */}
      <AppText style={[styles.title, { color: colors.text }]}>
        {challenge.title}
      </AppText>

      {/* Task Content */}
      <AppText style={[styles.task, { color: colors.textMuted }]}>
        {challenge.task}
      </AppText>

      {/* Tip Section - Minimal with left accent */}
      <View style={[styles.tipSection, { borderLeftColor: colors.border }]}>
        <AppText style={[styles.tipText, { color: colors.textSubtle }]}>
          {challenge.tip}
        </AppText>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {!isCompleted ? (
          <TouchableOpacity
            onPress={onComplete}
            disabled={isCompleting}
            style={[styles.actionButton, { backgroundColor: colors.accent }]}
            activeOpacity={0.7}
          >
            <AppText style={styles.buttonText}>
              {isCompleting ? 'COMPLETING...' : 'MARK COMPLETE'}
            </AppText>
          </TouchableOpacity>
        ) : canMint && onMint ? (
          <TouchableOpacity
            onPress={onMint}
            disabled={isMinting}
            style={[styles.actionButton, { backgroundColor: colors.text }]}
            activeOpacity={0.7}
          >
            <AppText style={[styles.buttonText, { color: colors.background }]}>
              {isMinting ? 'MINTING...' : `MINT BADGE · ${formatMintFee(challenge.mintFee)}`}
            </AppText>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    borderWidth: 1,
    padding: 24,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayNumber: {
    fontSize: 36,
    fontWeight: '300',
    letterSpacing: -1,
  },
  dayDivider: {
    width: 1,
    height: 24,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  task: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  tipSection: {
    borderLeftWidth: 2,
    paddingLeft: 16,
    paddingVertical: 4,
    marginBottom: 24,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actions: {},
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
})
