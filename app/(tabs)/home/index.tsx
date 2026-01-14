/**
 * Home Screen
 * Linear challenge progression - shows current challenge or welcome
 */

import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { DailyTaskCard } from '@/components/challenge/daily-task-card'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { getChallengeById, getTotalChallenges } from '@/constants/challenges'
import { Colors, TierColors } from '@/constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

export default function HomeScreen() {
  const router = useRouter()
  const colors = Colors.dark
  const {
    activeChallenge,
    stats,
    completedChallenges,
    startChallenge,
    completeDay,
    isLoading,
    refreshProgress,
  } = useChallenge()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

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

  const handleStartChallenge = async () => {
    // Determine which challenge to start (next available)
    const nextChallengeId = completedChallenges.length + 1
    if (nextChallengeId > getTotalChallenges()) return

    setIsStarting(true)
    try {
      await startChallenge(nextChallengeId)
    } finally {
      setIsStarting(false)
    }
  }

  const nextChallenge = getChallengeById(completedChallenges.length + 1)
  const totalChallenges = getTotalChallenges()
  const overallProgress = Math.round((completedChallenges.length / totalChallenges) * 100)

  // ============================================
  // NO ACTIVE CHALLENGE - Welcome/Start Screen
  // ============================================
  if (!activeChallenge) {
    const isFirstTime = completedChallenges.length === 0
    const isAllComplete = completedChallenges.length >= totalChallenges

    return (
      <AppPage>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.accent}
            />
          }
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <LinearGradient
              colors={[colors.accentGlow, 'transparent']}
              style={styles.heroGradient}
            />

            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <AppText style={styles.heroTitle}>
              {isAllComplete ? 'Journey Complete' : isFirstTime ? '21-S' : 'Ready for More?'}
            </AppText>

            <AppText style={[styles.heroSubtitle, { color: colors.textMuted }]}>
              {isAllComplete
                ? 'You have completed all challenges'
                : isFirstTime
                  ? '21 Days to Social Mastery'
                  : `${completedChallenges.length} of ${totalChallenges} challenges complete`}
            </AppText>
          </View>

          {/* Progress Overview */}
          {!isFirstTime && (
            <View style={[styles.progressOverview, { backgroundColor: colors.surface }]}>
              <View style={styles.progressHeader}>
                <AppText style={[styles.progressLabel, { color: colors.textMuted }]}>
                  OVERALL PROGRESS
                </AppText>
                <AppText style={[styles.progressPercent, { color: colors.accent }]}>
                  {overallProgress}%
                </AppText>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${overallProgress}%`, backgroundColor: colors.accent },
                  ]}
                />
              </View>
              <View style={styles.progressStats}>
                <View style={styles.progressStatItem}>
                  <AppText style={[styles.statNumber, { color: colors.text }]}>
                    {completedChallenges.length}
                  </AppText>
                  <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                    Completed
                  </AppText>
                </View>
                <View style={styles.progressStatItem}>
                  <AppText style={[styles.statNumber, { color: colors.text }]}>
                    {stats.totalDaysCompleted}
                  </AppText>
                  <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                    Days Done
                  </AppText>
                </View>
                <View style={styles.progressStatItem}>
                  <AppText style={[styles.statNumber, { color: colors.warning }]}>
                    {stats.currentStreak}
                  </AppText>
                  <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                    Streak
                  </AppText>
                </View>
              </View>
            </View>
          )}

          {/* Next Challenge Card */}
          {nextChallenge && !isAllComplete && (
            <View style={[styles.nextChallengeCard, { backgroundColor: colors.surface }]}>
              <View style={styles.nextChallengeHeader}>
                <View
                  style={[
                    styles.tierBadge,
                    { backgroundColor: TierColors[nextChallenge.tier] + '20' },
                  ]}
                >
                  <AppText
                    style={[styles.tierText, { color: TierColors[nextChallenge.tier] }]}
                  >
                    {nextChallenge.tier.toUpperCase()}
                  </AppText>
                </View>
                <AppText style={[styles.challengeNumber, { color: colors.textMuted }]}>
                  Challenge {nextChallenge.id}/{totalChallenges}
                </AppText>
              </View>

              <AppText style={[styles.challengeTitle, { color: colors.text }]}>
                {nextChallenge.title}
              </AppText>

              <AppText style={[styles.challengeDesc, { color: colors.textMuted }]}>
                {nextChallenge.description}
              </AppText>

              <View style={[styles.challengeInfo, { backgroundColor: colors.surfaceAlt }]}>
                <View style={styles.infoItem}>
                  <UiIconSymbol name="calendar" size={18} color={colors.textMuted} />
                  <AppText style={{ color: colors.textMuted }}>21 Days</AppText>
                </View>
                <View style={styles.infoItem}>
                  <UiIconSymbol name="clock.fill" size={18} color={colors.textMuted} />
                  <AppText style={{ color: colors.textMuted }}>~30 min/day</AppText>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleStartChallenge}
                disabled={isStarting}
                style={[styles.startButton, { backgroundColor: colors.accent }]}
                activeOpacity={0.8}
              >
                {isStarting ? (
                  <AppText style={styles.startButtonText}>Starting...</AppText>
                ) : (
                  <>
                    <UiIconSymbol name="play.fill" size={20} color="#FFFFFF" />
                    <AppText style={styles.startButtonText}>
                      {isFirstTime ? 'Begin Your Journey' : 'Start Challenge'}
                    </AppText>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* All Complete Message */}
          {isAllComplete && (
            <View style={[styles.completeCard, { backgroundColor: colors.successMuted }]}>
              <UiIconSymbol name="trophy.fill" size={48} color={colors.success} />
              <AppText style={[styles.completeTitle, { color: colors.success }]}>
                Sigma Ascended
              </AppText>
              <AppText style={{ color: colors.textMuted, textAlign: 'center' }}>
                You have completed all 21 challenges. You are the master of your social destiny.
              </AppText>
            </View>
          )}

          {/* Features (first time only) */}
          {isFirstTime && (
            <View style={styles.featuresSection}>
              <FeatureItem
                icon="list.bullet.rectangle.fill"
                title="21 Progressive Challenges"
                description="From basic eye contact to complete social mastery"
                colors={colors}
              />
              <FeatureItem
                icon="trophy.fill"
                title="NFT Achievement Badges"
                description="Earn collectible badges as you progress"
                colors={colors}
              />
              <FeatureItem
                icon="flame.fill"
                title="Daily Micro-Tasks"
                description="Just 30 minutes per day to transform"
                colors={colors}
              />
            </View>
          )}
        </ScrollView>
      </AppPage>
    )
  }

  // ============================================
  // ACTIVE CHALLENGE - Daily Task View
  // ============================================
  const { challenge, progress, todayTask, progressPercentage, canCompleteToday } =
    activeChallenge
  const completedDays = progress.daysCompleted.length
  const tierColor = TierColors[challenge.tier]

  const isTodayCompleted =
    completedDays > 0 &&
    new Date(
      progress.daysCompleted[completedDays - 1].completedAt || ''
    ).toDateString() === new Date().toDateString()

  const isChallengeComplete = completedDays >= 21

  return (
    <AppPage>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {/* Challenge Header */}
        <View style={styles.challengeHeader}>
          <View style={styles.challengeHeaderTop}>
            <View style={[styles.tierBadge, { backgroundColor: tierColor + '20' }]}>
              <AppText style={[styles.tierText, { color: tierColor }]}>
                {challenge.tier.toUpperCase()}
              </AppText>
            </View>
            <AppText style={[styles.challengeNumber, { color: colors.textMuted }]}>
              {completedChallenges.length + 1}/{totalChallenges}
            </AppText>
          </View>

          <AppText style={[styles.activeTitle, { color: colors.text }]}>
            {challenge.title}
          </AppText>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/home/challenge-detail')}
            style={styles.viewDetailsButton}
            activeOpacity={0.6}
          >
            <AppText style={[styles.viewDetailsText, { color: colors.textMuted }]}>
              View All Tasks
            </AppText>
            <UiIconSymbol
              name="chevron.right"
              size={14}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Progress Ring Section */}
        <View style={[styles.progressRingSection, { backgroundColor: colors.surface }]}>
          <View style={styles.progressRingContainer}>
            {/* Custom Progress Ring */}
            <View style={styles.ringOuter}>
              <View
                style={[
                  styles.ringProgress,
                  {
                    borderColor: isChallengeComplete ? colors.success : colors.accent,
                    transform: [{ rotate: `${(progressPercentage / 100) * 360}deg` }],
                  },
                ]}
              />
              <View style={[styles.ringInner, { backgroundColor: colors.surface }]}>
                <AppText style={[styles.ringNumber, { color: colors.text }]}>
                  {completedDays}
                </AppText>
                <AppText style={[styles.ringLabel, { color: colors.textMuted }]}>
                  of 21
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.progressRingStats}>
            <View style={styles.ringStatItem}>
              <AppText style={[styles.ringStatNumber, { color: colors.text }]}>
                {21 - completedDays}
              </AppText>
              <AppText style={[styles.ringStatLabel, { color: colors.textMuted }]}>
                Days Left
              </AppText>
            </View>
            <View style={styles.ringStatItem}>
              <AppText style={[styles.ringStatNumber, { color: colors.warning }]}>
                {stats.currentStreak}
              </AppText>
              <AppText style={[styles.ringStatLabel, { color: colors.textMuted }]}>
                Streak
              </AppText>
            </View>
          </View>
        </View>

        {/* Today's Task */}
        {todayTask && !isChallengeComplete && (
          <DailyTaskCard
            day={completedDays + 1}
            task={todayTask}
            canComplete={canCompleteToday}
            isCompleted={isTodayCompleted}
            onComplete={handleCompleteDay}
            isLoading={isCompleting}
          />
        )}

        {/* Challenge Complete */}
        {isChallengeComplete && (
          <View style={[styles.challengeCompleteCard, { backgroundColor: colors.successMuted }]}>
            <UiIconSymbol name="checkmark.circle.fill" size={48} color={colors.success} />
            <AppText style={[styles.challengeCompleteTitle, { color: colors.success }]}>
              Challenge Complete!
            </AppText>
            <AppText style={{ color: colors.textMuted, textAlign: 'center' }}>
              You've completed all 21 days of {challenge.title}.
              Mint your badge in Profile to claim your NFT!
            </AppText>
          </View>
        )}

        {/* Badge Preview */}
        <View style={[styles.badgePreviewCard, { backgroundColor: colors.surface }]}>
          <UiIconSymbol name="trophy.fill" size={28} color={colors.warning} />
          <View style={styles.badgePreviewInfo}>
            <AppText style={[styles.badgePreviewName, { color: colors.text }]}>
              {challenge.badge.name}
            </AppText>
            <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
              {isChallengeComplete ? 'Ready to mint!' : 'Complete challenge to earn'}
            </AppText>
          </View>
          {isChallengeComplete && (
            <View style={[styles.mintReadyBadge, { backgroundColor: colors.successMuted }]}>
              <AppText style={{ color: colors.success, fontSize: 11, fontWeight: '700' }}>
                READY
              </AppText>
            </View>
          )}
        </View>
      </ScrollView>
    </AppPage>
  )
}

// Feature Item Component
function FeatureItem({
  icon,
  title,
  description,
  colors,
}: {
  icon: string
  title: string
  description: string
  colors: typeof Colors.dark
}) {
  return (
    <View style={[styles.featureItem, { backgroundColor: colors.surface }]}>
      <View style={[styles.featureIcon, { backgroundColor: colors.accentGlow }]}>
        <UiIconSymbol name={icon as any} size={24} color={colors.accent} />
      </View>
      <View style={styles.featureContent}>
        <AppText style={[styles.featureTitle, { color: colors.text }]}>{title}</AppText>
        <AppText style={{ color: colors.textMuted, fontSize: 13 }}>{description}</AppText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
    position: 'relative',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderRadius: 100,
  },
  logoContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ECEDEE',
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  // Progress Overview
  progressOverview: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  progressStatItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  // Next Challenge Card
  nextChallengeCard: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  nextChallengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tierText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  challengeNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  challengeTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  challengeDesc: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  challengeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  // Complete Card
  completeCard: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },
  // Features Section
  featuresSection: {
    gap: 12,
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  // Active Challenge Styles
  challengeHeader: {
    marginBottom: 16,
  },
  challengeHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeTitle: {
    fontSize: 32,
    fontWeight: '800',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressRingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
    gap: 24,
  },
  progressRingContainer: {
    alignItems: 'center',
  },
  ringOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: '#1E1E28',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ringProgress: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  ringInner: {
    alignItems: 'center',
  },
  ringNumber: {
    fontSize: 36,
    fontWeight: '800',
  },
  ringLabel: {
    fontSize: 13,
  },
  progressRingStats: {
    flex: 1,
    gap: 20,
  },
  ringStatItem: {},
  ringStatNumber: {
    fontSize: 28,
    fontWeight: '800',
  },
  ringStatLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  challengeCompleteCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeCompleteTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
  },
  badgePreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 16,
  },
  badgePreviewInfo: {
    flex: 1,
  },
  badgePreviewName: {
    fontSize: 16,
    fontWeight: '700',
  },
  mintReadyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
})
