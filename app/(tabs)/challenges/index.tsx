/**
 * Days Screen (formerly Challenges)
 * Shows all 21 days in a grid with completion and mint status
 */

import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { InfoModal } from '@/components/info/info-modal'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function DaysScreen() {
  const router = useRouter()
  const colors = Colors.dark

  const {
    allDays,
    currentDay,
    stats,
    isDayCompleted,
    isDayMinted,
    navigateToDay,
    refreshProgress,
  } = useChallenge()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshProgress()
    setIsRefreshing(false)
  }

  // Check if a day is accessible (can go back or forward only if previous day is completed + minted)
  const canAccessDay = (day: number): boolean => {
    // Can always access current day or earlier
    if (day <= currentDay) return true

    // For future days, check if all previous days are completed and minted
    for (let i = 1; i < day; i++) {
      if (!isDayCompleted(i) || !isDayMinted(i)) {
        return false
      }
    }
    return true
  }

  const handleDayPress = (day: number) => {
    // Going backward is always allowed
    if (day <= currentDay) {
      navigateToDay(day)
      router.push('/(tabs)/home')
      return
    }

    // Check if can access this day
    if (!canAccessDay(day)) {
      // Find the first incomplete/unminted day
      let blockedDay = currentDay
      for (let i = 1; i < day; i++) {
        if (!isDayCompleted(i) || !isDayMinted(i)) {
          blockedDay = i
          break
        }
      }

      if (!isDayCompleted(blockedDay)) {
        Alert.alert(
          'Day Locked',
          `Complete Day ${blockedDay} first before accessing Day ${day}.`
        )
      } else {
        Alert.alert(
          'Day Locked',
          `Mint your badge for Day ${blockedDay} to unlock Day ${day}.`
        )
      }
      return
    }

    navigateToDay(day)
    router.push('/(tabs)/home')
  }

  const progressPercent = Math.round((stats.daysCompleted / 21) * 100)

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
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/home')}
              style={styles.backButton}
            >
              <UiIconSymbol name="chevron.left" size={20} color={colors.textMuted} />
              <AppText style={[styles.backText, { color: colors.textMuted }]}>
                Today
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowInfoModal(true)}
              style={[styles.infoButton, { backgroundColor: colors.surfaceAlt }]}
              activeOpacity={0.7}
            >
              <UiIconSymbol name="info.circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          <AppText type="title" style={{ color: colors.text, marginTop: 12 }}>
            21 Days
          </AppText>
          <AppText style={[styles.subtitle, { color: colors.textMuted }]}>
            Your confidence transformation journey
          </AppText>
        </View>

        {/* Progress Summary */}
        <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
          <View style={styles.progressRow}>
            <View style={styles.progressStat}>
              <AppText style={[styles.progressValue, { color: colors.success }]}>
                {stats.daysCompleted}
              </AppText>
              <AppText style={[styles.progressLabel, { color: colors.textMuted }]}>
                Completed
              </AppText>
            </View>
            <View style={styles.progressStat}>
              <AppText style={[styles.progressValue, { color: colors.accent }]}>
                {stats.badgesMinted}
              </AppText>
              <AppText style={[styles.progressLabel, { color: colors.textMuted }]}>
                Minted
              </AppText>
            </View>
            <View style={styles.progressStat}>
              <AppText style={[styles.progressValue, { color: colors.text }]}>
                {progressPercent}%
              </AppText>
              <AppText style={[styles.progressLabel, { color: colors.textMuted }]}>
                Progress
              </AppText>
            </View>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
            <AppText style={{ color: colors.textMuted, fontSize: 12 }}>Done</AppText>
          </View>
          <View style={styles.legendItem}>
            <UiIconSymbol name="trophy.fill" size={14} color={colors.gold} />
            <AppText style={{ color: colors.textMuted, fontSize: 12 }}>Minted</AppText>
          </View>
          <View style={styles.legendItem}>
            <UiIconSymbol name="lock.fill" size={12} color={colors.textSubtle} />
            <AppText style={{ color: colors.textMuted, fontSize: 12 }}>Locked</AppText>
          </View>
        </View>

        {/* Days Grid */}
        <View style={styles.daysGrid}>
          {allDays.map((dayChallenge) => {
            const isCompleted = isDayCompleted(dayChallenge.day)
            const isMinted = isDayMinted(dayChallenge.day)
            const isCurrent = dayChallenge.day === currentDay
            const isLocked = !canAccessDay(dayChallenge.day)

            return (
              <TouchableOpacity
                key={dayChallenge.day}
                onPress={() => handleDayPress(dayChallenge.day)}
                style={[
                  styles.dayCard,
                  {
                    backgroundColor: isLocked
                      ? colors.surfaceAlt
                      : isCurrent
                        ? colors.accentGlow
                        : isCompleted
                          ? colors.successMuted
                          : colors.surface,
                    borderColor: isLocked
                      ? colors.border
                      : isCurrent
                        ? colors.accent
                        : isCompleted
                          ? colors.success
                          : colors.border,
                    opacity: isLocked ? 0.6 : 1,
                  },
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.dayCardHeader}>
                  <AppText
                    style={[
                      styles.dayNumber,
                      {
                        color: isLocked
                          ? colors.textSubtle
                          : isCurrent
                            ? colors.accent
                            : isCompleted
                              ? colors.success
                              : colors.text,
                      },
                    ]}
                  >
                    {dayChallenge.day}
                  </AppText>
                  {isLocked && (
                    <UiIconSymbol name="lock.fill" size={12} color={colors.textSubtle} />
                  )}
                  {!isLocked && isMinted && (
                    <UiIconSymbol name="trophy.fill" size={14} color={colors.gold} />
                  )}
                  {!isLocked && !isMinted && isCompleted && (
                    <UiIconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  )}
                </View>
                <AppText
                  style={[styles.dayTitle, { color: isLocked ? colors.textSubtle : colors.textMuted }]}
                  numberOfLines={1}
                >
                  {dayChallenge.title}
                </AppText>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Week Labels */}
        <View style={styles.weekLabels}>
          <View style={[styles.weekLabel, { backgroundColor: colors.surfaceAlt }]}>
            <AppText style={{ color: colors.textMuted, fontSize: 12, fontWeight: '600' }}>
              Week 1: Foundation
            </AppText>
            <AppText style={{ color: colors.textSubtle, fontSize: 11 }}>Days 1-7</AppText>
          </View>
          <View style={[styles.weekLabel, { backgroundColor: colors.surfaceAlt }]}>
            <AppText style={{ color: colors.textMuted, fontSize: 12, fontWeight: '600' }}>
              Week 2: Building
            </AppText>
            <AppText style={{ color: colors.textSubtle, fontSize: 11 }}>Days 8-14</AppText>
          </View>
          <View style={[styles.weekLabel, { backgroundColor: colors.surfaceAlt }]}>
            <AppText style={{ color: colors.textMuted, fontSize: 12, fontWeight: '600' }}>
              Week 3: Mastery
            </AppText>
            <AppText style={{ color: colors.textSubtle, fontSize: 11 }}>Days 15-21</AppText>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Info Modal */}
      <InfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </AppPage>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: -4,
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 15,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 6,
    lineHeight: 22,
  },
  progressCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  dayCard: {
    width: '18.5%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  dayCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  dayTitle: {
    fontSize: 9,
    fontWeight: '500',
  },
  weekLabels: {
    gap: 10,
  },
  weekLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
})
