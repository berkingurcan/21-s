/**
 * Home Screen
 * Shows current challenge progress and today's task
 */

import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { Colors } from '@/constants/colors'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { DailyTaskCard } from '@/components/challenge/daily-task-card'
import { ProgressRing } from '@/components/challenge/progress-ring'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'

export default function HomeScreen() {
  const router = useRouter()
  const colors = Colors.dark
  const {
    activeChallenge,
    stats,
    availableChallenges,
    completeDay,
    isLoading,
    refreshProgress,
  } = useChallenge()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshProgress()
    setIsRefreshing(false)
  }

  const handleCompleteDay = async () => {
    if (!activeChallenge || !activeChallenge.canCompleteToday) return

    setIsCompleting(true)
    try {
      const dayToComplete = activeChallenge.progress.daysCompleted.length + 1
      await completeDay(activeChallenge.challenge.id, dayToComplete)
    } finally {
      setIsCompleting(false)
    }
  }

  const handleStartChallenge = () => {
    router.push('/(tabs)/challenges')
  }

  // No active challenge - show welcome/start state
  if (!activeChallenge) {
    return (
      <AppPage>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.accent}
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <AppText type="title" style={{ color: colors.text }}>
              21-S
            </AppText>
            <AppText style={[styles.subtitle, { color: colors.textMuted }]}>
              21 Days to Social Mastery
            </AppText>
          </View>

          {/* Empty State */}
          <View
            style={[
              styles.emptyState,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <UiIconSymbol
              name="flame.fill"
              size={64}
              color={colors.accent}
            />
            <AppText
              type="subtitle"
              style={{ color: colors.text, marginTop: 20, textAlign: 'center' }}
            >
              Ready to Transform?
            </AppText>
            <AppText
              style={[
                styles.emptyText,
                { color: colors.textMuted, textAlign: 'center' },
              ]}
            >
              Start your first 21-day challenge and build unshakeable social
              confidence. One day at a time.
            </AppText>

            <TouchableOpacity
              onPress={handleStartChallenge}
              style={[styles.startButton, { backgroundColor: colors.accent }]}
              activeOpacity={0.8}
            >
              <AppText style={styles.startButtonText}>
                Browse Challenges
              </AppText>
              <UiIconSymbol
                name="chevron.right"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* Stats Preview */}
          <View style={styles.statsPreview}>
            <View
              style={[styles.statCard, { backgroundColor: colors.surface }]}
            >
              <AppText style={[styles.statValue, { color: colors.text }]}>
                {stats.currentStreak}
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                Day Streak
              </AppText>
            </View>
            <View
              style={[styles.statCard, { backgroundColor: colors.surface }]}
            >
              <AppText style={[styles.statValue, { color: colors.text }]}>
                {stats.challengesCompleted}
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                Completed
              </AppText>
            </View>
            <View
              style={[styles.statCard, { backgroundColor: colors.surface }]}
            >
              <AppText style={[styles.statValue, { color: colors.text }]}>
                {stats.badgesCollected}
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                Badges
              </AppText>
            </View>
          </View>

          {/* Available challenges hint */}
          {availableChallenges.length > 0 && (
            <View style={styles.availableHint}>
              <AppText style={{ color: colors.textMuted }}>
                {availableChallenges.length} challenge
                {availableChallenges.length > 1 ? 's' : ''} available to start
              </AppText>
            </View>
          )}
        </ScrollView>
      </AppPage>
    )
  }

  // Active challenge - show today's task
  const { challenge, progress, todayTask, progressPercentage, canCompleteToday } =
    activeChallenge
  const completedDays = progress.daysCompleted.length
  const isTodayCompleted =
    completedDays > 0 &&
    new Date(
      progress.daysCompleted[completedDays - 1].completedAt || ''
    ).toDateString() === new Date().toDateString()

  return (
    <AppPage>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <AppText style={[styles.challengeLabel, { color: colors.textMuted }]}>
              CURRENT CHALLENGE
            </AppText>
            <AppText type="title" style={{ color: colors.text }}>
              {challenge.title}
            </AppText>
          </View>
        </View>

        {/* Progress Section */}
        <View style={[styles.progressSection, { backgroundColor: colors.surface }]}>
          <ProgressRing
            progress={progressPercentage}
            size={140}
            strokeWidth={12}
            label={`${completedDays}`}
            sublabel="of 21 days"
          />

          <View style={styles.progressStats}>
            <View style={styles.progressStatItem}>
              <AppText style={[styles.progressStatValue, { color: colors.text }]}>
                {21 - completedDays}
              </AppText>
              <AppText style={[styles.progressStatLabel, { color: colors.textMuted }]}>
                Days Left
              </AppText>
            </View>
            <View style={styles.progressStatItem}>
              <AppText style={[styles.progressStatValue, { color: colors.text }]}>
                {stats.currentStreak}
              </AppText>
              <AppText style={[styles.progressStatLabel, { color: colors.textMuted }]}>
                Day Streak
              </AppText>
            </View>
            <View style={styles.progressStatItem}>
              <AppText style={[styles.progressStatValue, { color: colors.accent }]}>
                {challenge.mintFee}
              </AppText>
              <AppText style={[styles.progressStatLabel, { color: colors.textMuted }]}>
                SOL Badge
              </AppText>
            </View>
          </View>
        </View>

        {/* Today's Task */}
        {todayTask && (
          <DailyTaskCard
            day={completedDays + 1}
            task={todayTask}
            canComplete={canCompleteToday}
            isCompleted={isTodayCompleted}
            onComplete={handleCompleteDay}
            isLoading={isCompleting}
          />
        )}

        {/* Challenge Complete State */}
        {completedDays >= 21 && (
          <View
            style={[
              styles.completeState,
              { backgroundColor: colors.successMuted },
            ]}
          >
            <UiIconSymbol
              name="trophy.fill"
              size={48}
              color={colors.success}
            />
            <AppText
              type="subtitle"
              style={{ color: colors.success, marginTop: 12 }}
            >
              Challenge Complete!
            </AppText>
            <AppText
              style={{ color: colors.textMuted, textAlign: 'center', marginTop: 8 }}
            >
              You've completed all 21 days. Mint your badge in the Profile tab!
            </AppText>
          </View>
        )}

        {/* Badge Preview */}
        <View style={[styles.badgePreview, { backgroundColor: colors.surface }]}>
          <View style={styles.badgeInfo}>
            <UiIconSymbol
              name="trophy.fill"
              size={24}
              color={colors.warning}
            />
            <View style={{ flex: 1 }}>
              <AppText style={[styles.badgeName, { color: colors.text }]}>
                {challenge.badge.name}
              </AppText>
              <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                Complete this challenge to earn
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppPage>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  challengeLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 12,
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  statsPreview: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  availableHint: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    gap: 20,
  },
  progressStats: {
    flex: 1,
    gap: 16,
  },
  progressStatItem: {},
  progressStatValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  progressStatLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  completeState: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginTop: 16,
  },
  badgePreview: {
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
  },
  badgeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '700',
  },
})
