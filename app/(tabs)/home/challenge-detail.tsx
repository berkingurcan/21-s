/**
 * Challenge Detail Modal (from Home)
 * Shows current challenge details
 */

import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { Colors, TierColors } from '@/constants/colors'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'

export default function ChallengeDetailModal() {
  const router = useRouter()
  const colors = Colors.dark
  const { activeChallenge } = useChallenge()

  if (!activeChallenge) {
    router.back()
    return null
  }

  const { challenge, progress } = activeChallenge
  const tierColor = TierColors[challenge.tier]

  return (
    <AppPage>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Challenge Info */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View
            style={[styles.tierBadge, { backgroundColor: tierColor + '20' }]}
          >
            <AppText style={[styles.tierText, { color: tierColor }]}>
              {challenge.tier.toUpperCase()} #{challenge.id}
            </AppText>
          </View>

          <AppText type="title" style={{ color: colors.text, marginTop: 12 }}>
            {challenge.title}
          </AppText>

          <AppText style={{ color: colors.textMuted, marginTop: 8, lineHeight: 22 }}>
            {challenge.description}
          </AppText>
        </View>

        {/* All Days List */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <AppText type="subtitle" style={{ color: colors.text }}>
            All 21 Tasks
          </AppText>

          <View style={styles.daysList}>
            {challenge.days.map((day, index) => {
              const isCompleted = index < progress.daysCompleted.length
              const isToday = index === progress.daysCompleted.length

              return (
                <View
                  key={day.day}
                  style={[
                    styles.dayItem,
                    {
                      backgroundColor: isCompleted
                        ? colors.successMuted
                        : isToday
                          ? colors.accentGlow
                          : colors.surfaceAlt,
                      borderColor: isCompleted
                        ? colors.success
                        : isToday
                          ? colors.accent
                          : colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.dayNumber,
                      {
                        backgroundColor: isCompleted
                          ? colors.success
                          : isToday
                            ? colors.accent
                            : colors.border,
                      },
                    ]}
                  >
                    {isCompleted ? (
                      <UiIconSymbol
                        name="checkmark"
                        size={14}
                        color="#FFFFFF"
                      />
                    ) : (
                      <AppText style={styles.dayNumberText}>{day.day}</AppText>
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <AppText
                      style={{ color: colors.text, fontWeight: '500' }}
                      numberOfLines={2}
                    >
                      {day.task}
                    </AppText>
                    {isToday && (
                      <AppText style={{ color: colors.accent, fontSize: 12, marginTop: 4 }}>
                        TODAY
                      </AppText>
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </AppPage>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  tierBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tierText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  daysList: {
    marginTop: 16,
    gap: 10,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  dayNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
})
