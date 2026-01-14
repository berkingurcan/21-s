/**
 * Daily Task Card Component
 * Shows today's challenge task with completion checkbox
 */

import React from 'react'
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { AppText } from '@/components/app-text'
import { Colors } from '@/constants/colors'
import { ChallengeDay } from '@/types/challenges'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'

interface DailyTaskCardProps {
  day: number
  task: ChallengeDay
  canComplete: boolean
  isCompleted: boolean
  onComplete: () => void
  isLoading?: boolean
}

export function DailyTaskCard({
  day,
  task,
  canComplete,
  isCompleted,
  onComplete,
  isLoading = false,
}: DailyTaskCardProps) {
  const colors = Colors.dark

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
        <View style={styles.dayBadge}>
          <AppText style={[styles.dayLabel, { color: colors.textMuted }]}>
            DAY
          </AppText>
          <AppText style={[styles.dayNumber, { color: colors.text }]}>
            {day}
          </AppText>
        </View>

        {isCompleted ? (
          <View style={[styles.completedBadge, { backgroundColor: colors.successMuted }]}>
            <UiIconSymbol
              name="checkmark.circle.fill"
              size={18}
              color={colors.success}
            />
            <AppText style={[styles.completedText, { color: colors.success }]}>
              COMPLETED
            </AppText>
          </View>
        ) : (
          <View style={[styles.todayBadge, { backgroundColor: colors.accentGlow }]}>
            <UiIconSymbol name="flame.fill" size={16} color={colors.accent} />
            <AppText style={[styles.todayText, { color: colors.accent }]}>
              TODAY
            </AppText>
          </View>
        )}
      </View>

      {/* Task Content */}
      <View style={styles.taskContent}>
        <AppText type="subtitle" style={{ color: colors.text }}>
          {task.task}
        </AppText>
      </View>

      {/* Tip Section */}
      <View
        style={[styles.tipSection, { backgroundColor: colors.surfaceAlt }]}
      >
        <UiIconSymbol
          name="lightbulb.fill"
          size={16}
          color={colors.warning}
        />
        <AppText style={[styles.tipText, { color: colors.textMuted }]}>
          {task.tip}
        </AppText>
      </View>

      {/* Complete Button */}
      {!isCompleted && (
        <TouchableOpacity
          onPress={onComplete}
          disabled={!canComplete || isLoading}
          style={[
            styles.completeButton,
            {
              backgroundColor: canComplete ? colors.accent : colors.border,
              opacity: canComplete && !isLoading ? 1 : 0.5,
            },
          ]}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <AppText style={styles.buttonText}>Completing...</AppText>
          ) : (
            <>
              <UiIconSymbol
                name="checkmark.circle.fill"
                size={22}
                color="#FFFFFF"
              />
              <AppText style={styles.buttonText}>
                {canComplete ? 'Mark as Complete' : 'Already Completed Today'}
              </AppText>
            </>
          )}
        </TouchableOpacity>
      )}
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
  },
  dayBadge: {
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
  todayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  todayText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  taskContent: {
    marginTop: 20,
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
  completeButton: {
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
