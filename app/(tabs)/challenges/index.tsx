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
              <UiIconSymbol name="chevron.left" size={18} color={colors.textMuted} />
              <AppText style={[styles.backText, { color: colors.textMuted }]}>
                Today
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowInfoModal(true)}
              style={[styles.infoButton, { backgroundColor: colors.surfaceAlt }]}
              activeOpacity={0.7}
            >
              <UiIconSymbol name="info.circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          <AppText style={[styles.pageTitle, { color: colors.text }]}>
            21 DAYS
          </AppText>
          <AppText style={[styles.subtitle, { color: colors.textSubtle }]}>
            Your transformation journey
          </AppText>
        </View>

        {/* Progress Summary */}
        <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.progressRow}>
            <View style={styles.progressStat}>
              <AppText style={[styles.progressValue, { color: colors.text }]}>
                {stats.daysCompleted}
              </AppText>
              <AppText style={[styles.progressLabel, { color: colors.textSubtle }]}>
                DONE
              </AppText>
            </View>
            <View style={[styles.progressDivider, { backgroundColor: colors.border }]} />
            <View style={styles.progressStat}>
              <AppText style={[styles.progressValue, { color: colors.text }]}>
                {stats.badgesMinted}
              </AppText>
              <AppText style={[styles.progressLabel, { color: colors.textSubtle }]}>
                MINTED
              </AppText>
            </View>
            <View style={[styles.progressDivider, { backgroundColor: colors.border }]} />
            <View style={styles.progressStat}>
              <AppText style={[styles.progressValue, { color: colors.accent }]}>
                {progressPercent}%
              </AppText>
              <AppText style={[styles.progressLabel, { color: colors.textSubtle }]}>
                PROGRESS
              </AppText>
            </View>
          </View>
        </View>

        {/* Legend - Minimal */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: colors.success }]} />
            <AppText style={{ color: colors.textSubtle, fontSize: 10, letterSpacing: 1 }}>DONE</AppText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: colors.gold }]} />
            <AppText style={{ color: colors.textSubtle, fontSize: 10, letterSpacing: 1 }}>MINTED</AppText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendIndicator, { backgroundColor: colors.textSubtle, opacity: 0.5 }]} />
            <AppText style={{ color: colors.textSubtle, fontSize: 10, letterSpacing: 1 }}>LOCKED</AppText>
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
                    backgroundColor: colors.surface,
                    borderColor: isCurrent
                      ? colors.accent
                      : isLocked
                        ? 'transparent'
                        : colors.border,
                    opacity: isLocked ? 0.4 : 1,
                  },
                ]}
                activeOpacity={0.7}
              >
                {/* Status indicator line at top */}
                {(isCompleted || isMinted) && (
                  <View style={[
                    styles.dayStatusLine,
                    { backgroundColor: isMinted ? colors.gold : colors.success }
                  ]} />
                )}
                <AppText
                  style={[
                    styles.dayNumber,
                    {
                      color: isCurrent
                        ? colors.accent
                        : isLocked
                          ? colors.textSubtle
                          : colors.text,
                    },
                  ]}
                >
                  {String(dayChallenge.day).padStart(2, '0')}
                </AppText>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Week Labels */}
        <View style={styles.weekLabels}>
          <View style={[styles.weekLabel, { borderLeftColor: colors.accent }]}>
            <AppText style={{ color: colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1 }}>
              WEEK 1
            </AppText>
            <AppText style={{ color: colors.textSubtle, fontSize: 10, letterSpacing: 0.5 }}>Foundation · 01-07</AppText>
          </View>
          <View style={[styles.weekLabel, { borderLeftColor: colors.gold }]}>
            <AppText style={{ color: colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1 }}>
              WEEK 2
            </AppText>
            <AppText style={{ color: colors.textSubtle, fontSize: 10, letterSpacing: 0.5 }}>Building · 08-14</AppText>
          </View>
          <View style={[styles.weekLabel, { borderLeftColor: colors.text }]}>
            <AppText style={{ color: colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1 }}>
              WEEK 3
            </AppText>
            <AppText style={{ color: colors.textSubtle, fontSize: 10, letterSpacing: 0.5 }}>Mastery · 15-21</AppText>
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
    marginBottom: 24,
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
    width: 36,
    height: 36,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 13,
    fontWeight: '500',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '300',
    marginTop: 16,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  progressCard: {
    padding: 20,
    borderRadius: 2,
    marginBottom: 20,
    borderWidth: 1,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressStat: {
    alignItems: 'center',
    flex: 1,
  },
  progressDivider: {
    width: 1,
    height: 32,
  },
  progressValue: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: -1,
  },
  progressLabel: {
    fontSize: 9,
    marginTop: 4,
    letterSpacing: 1.5,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendIndicator: {
    width: 8,
    height: 2,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 24,
  },
  dayCard: {
    width: '13%',
    aspectRatio: 1,
    borderRadius: 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dayStatusLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.5,
  },
  weekLabels: {
    gap: 8,
  },
  weekLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 2,
  },
})
