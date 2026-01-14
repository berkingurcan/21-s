/**
 * Challenge Detail Screen
 * Shows full challenge details and allows starting
 */

import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { Colors, TierColors, BadgeColors } from '@/constants/colors'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { getChallengeById } from '@/constants/challenges'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { ProgressRing } from '@/components/challenge/progress-ring'

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const colors = Colors.dark

  const {
    getChallengeStatus,
    getChallengeProgress,
    startChallenge,
    activeChallenge,
  } = useChallenge()

  const [isStarting, setIsStarting] = useState(false)

  const challengeId = parseInt(id || '1', 10)
  const challenge = getChallengeById(challengeId)

  if (!challenge) {
    return (
      <AppPage>
        <AppText style={{ color: colors.text }}>Challenge not found</AppText>
      </AppPage>
    )
  }

  const status = getChallengeStatus(challengeId)
  const progress = getChallengeProgress(challengeId)
  const tierColor = TierColors[challenge.tier]
  const badgeColor = BadgeColors[challenge.badge.rarity]

  const completedDays = progress?.daysCompleted.length || 0
  const progressPercent = Math.round((completedDays / 21) * 100)

  const isLocked = status === 'locked'
  const isActive = status === 'active'
  const isCompleted = status === 'completed'
  const hasActiveChallenge = !!activeChallenge

  const handleStartChallenge = async () => {
    if (hasActiveChallenge && !isActive) {
      Alert.alert(
        'Active Challenge',
        'You already have an active challenge. Complete or abandon it before starting a new one.',
        [{ text: 'OK' }]
      )
      return
    }

    setIsStarting(true)
    try {
      await startChallenge(challengeId)
      router.replace('/(tabs)/home')
    } catch (error) {
      Alert.alert('Error', 'Failed to start challenge. Please try again.')
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: challenge.title,
        }}
      />
      <AppPage>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Card */}
          <View style={[styles.headerCard, { backgroundColor: colors.surface }]}>
            <View style={styles.headerTop}>
              <View
                style={[styles.tierBadge, { backgroundColor: tierColor + '20' }]}
              >
                <AppText style={[styles.tierText, { color: tierColor }]}>
                  {challenge.tier.toUpperCase()}
                </AppText>
              </View>
              <AppText style={[styles.levelText, { color: colors.textMuted }]}>
                Challenge #{challenge.id}
              </AppText>
            </View>

            <AppText type="title" style={{ color: colors.text, marginTop: 12 }}>
              {challenge.title}
            </AppText>

            <AppText
              style={[styles.description, { color: colors.textMuted }]}
            >
              {challenge.description}
            </AppText>

            {/* Progress (if active/completed) */}
            {(isActive || isCompleted) && (
              <View style={styles.progressContainer}>
                <ProgressRing
                  progress={progressPercent}
                  size={100}
                  strokeWidth={10}
                  label={`${completedDays}`}
                  sublabel="of 21"
                />
                <View style={styles.progressInfo}>
                  <AppText style={{ color: colors.textMuted, fontSize: 14 }}>
                    {isCompleted ? 'Challenge Completed!' : `Day ${completedDays + 1} of 21`}
                  </AppText>
                  <AppText style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>
                    {progressPercent}% Complete
                  </AppText>
                </View>
              </View>
            )}
          </View>

          {/* Badge Reward */}
          <View style={[styles.badgeCard, { backgroundColor: colors.surface }]}>
            <View style={styles.badgeHeader}>
              <UiIconSymbol name="trophy.fill" size={28} color={badgeColor} />
              <View style={{ flex: 1 }}>
                <AppText type="subtitle" style={{ color: colors.text }}>
                  {challenge.badge.name}
                </AppText>
                <View style={styles.rarityRow}>
                  <View
                    style={[
                      styles.rarityBadge,
                      { backgroundColor: badgeColor + '20' },
                    ]}
                  >
                    <AppText style={[styles.rarityText, { color: badgeColor }]}>
                      {challenge.badge.rarity.toUpperCase()}
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            <AppText style={{ color: colors.textMuted, marginTop: 12 }}>
              {challenge.badge.description}
            </AppText>

            <View style={[styles.mintInfo, { backgroundColor: colors.surfaceAlt }]}>
              <View style={styles.mintRow}>
                <AppText style={{ color: colors.textMuted }}>Mint Fee</AppText>
                <AppText style={[styles.mintFee, { color: tierColor }]}>
                  {challenge.mintFee} SOL
                </AppText>
              </View>
              <AppText style={{ color: colors.textSubtle, fontSize: 12, marginTop: 8 }}>
                Pay when you complete all 21 days to mint your NFT badge
              </AppText>
            </View>
          </View>

          {/* Daily Tasks Preview */}
          <View style={[styles.tasksCard, { backgroundColor: colors.surface }]}>
            <AppText type="subtitle" style={{ color: colors.text }}>
              21 Daily Tasks
            </AppText>
            <AppText style={{ color: colors.textMuted, marginTop: 4 }}>
              Complete one task per day to finish the challenge
            </AppText>

            <View style={styles.tasksList}>
              {challenge.days.slice(0, 5).map((day, index) => (
                <View
                  key={day.day}
                  style={[
                    styles.taskItem,
                    {
                      backgroundColor:
                        index < completedDays
                          ? colors.successMuted
                          : colors.surfaceAlt,
                      borderColor:
                        index < completedDays ? colors.success : colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.dayNumber,
                      {
                        backgroundColor:
                          index < completedDays ? colors.success : colors.accent,
                      },
                    ]}
                  >
                    <AppText style={styles.dayText}>{day.day}</AppText>
                  </View>
                  <AppText
                    style={{ color: colors.text, flex: 1 }}
                    numberOfLines={2}
                  >
                    {day.task}
                  </AppText>
                  {index < completedDays && (
                    <UiIconSymbol
                      name="checkmark.circle.fill"
                      size={20}
                      color={colors.success}
                    />
                  )}
                </View>
              ))}

              {challenge.days.length > 5 && (
                <View style={styles.moreIndicator}>
                  <AppText style={{ color: colors.textMuted }}>
                    +{challenge.days.length - 5} more tasks
                  </AppText>
                </View>
              )}
            </View>
          </View>

          {/* Prerequisite (if locked) */}
          {isLocked && challenge.requiredChallengeId && (
            <View
              style={[styles.lockedCard, { backgroundColor: colors.errorMuted }]}
            >
              <UiIconSymbol name="lock.fill" size={24} color={colors.error} />
              <View style={{ flex: 1 }}>
                <AppText style={{ color: colors.error, fontWeight: '600' }}>
                  Locked
                </AppText>
                <AppText style={{ color: colors.textMuted, fontSize: 14 }}>
                  Complete Challenge #{challenge.requiredChallengeId} first
                </AppText>
              </View>
            </View>
          )}

          {/* Start Button */}
          {!isLocked && !isCompleted && (
            <TouchableOpacity
              onPress={handleStartChallenge}
              disabled={isStarting || (hasActiveChallenge && !isActive)}
              style={[
                styles.startButton,
                {
                  backgroundColor: isActive
                    ? colors.success
                    : hasActiveChallenge
                      ? colors.border
                      : colors.accent,
                },
              ]}
              activeOpacity={0.8}
            >
              <UiIconSymbol
                name={isActive ? 'flame.fill' : 'play.fill'}
                size={22}
                color="#FFFFFF"
              />
              <AppText style={styles.startButtonText}>
                {isStarting
                  ? 'Starting...'
                  : isActive
                    ? 'Continue Challenge'
                    : hasActiveChallenge
                      ? 'Complete Active Challenge First'
                      : 'Start This Challenge'}
              </AppText>
            </TouchableOpacity>
          )}

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </AppPage>
    </>
  )
}

const styles = StyleSheet.create({
  headerCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  levelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    gap: 20,
  },
  progressInfo: {
    flex: 1,
    gap: 4,
  },
  badgeCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  rarityRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  rarityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  mintInfo: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
  },
  mintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mintFee: {
    fontSize: 18,
    fontWeight: '800',
  },
  tasksCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  tasksList: {
    marginTop: 16,
    gap: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  moreIndicator: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  lockedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    gap: 14,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
})
