/**
 * Badges Gallery Screen
 * Shows all collected NFT badges by day
 */

import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { getDayChallenge } from '@/constants/challenges'
import { Colors } from '@/constants/colors'
import { ellipsify } from '@/utils/ellipsify'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function BadgesScreen() {
  const colors = Colors.dark
  const { userProgress } = useChallenge()

  // Get minted days from progress
  const mintedDays = userProgress?.daysProgress.filter((dp) => dp.badgeMinted) || []

  return (
    <AppPage>
      <ScrollView showsVerticalScrollIndicator={false}>
        {mintedDays.length > 0 ? (
          <View style={styles.badgesGrid}>
            {mintedDays.map((dayProgress) => {
              const challenge = getDayChallenge(dayProgress.day)
              if (!challenge) return null

              return (
                <View
                  key={dayProgress.day}
                  style={[
                    styles.badgeCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.success,
                    },
                  ]}
                >
                  <UiIconSymbol name="trophy.fill" size={48} color={colors.gold} />

                  <AppText
                    style={[styles.badgeName, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {challenge.badge.name}
                  </AppText>

                  <View
                    style={[
                      styles.dayBadge,
                      { backgroundColor: colors.successMuted },
                    ]}
                  >
                    <AppText style={[styles.dayText, { color: colors.success }]}>
                      DAY {challenge.day}
                    </AppText>
                  </View>

                  <AppText style={{ color: colors.textMuted, fontSize: 12, marginTop: 8 }}>
                    {challenge.title}
                  </AppText>

                  <View style={[styles.mintInfo, { backgroundColor: colors.surfaceAlt }]}>
                    {dayProgress.mintTx && (
                      <AppText style={{ color: colors.textSubtle, fontSize: 11 }}>
                        TX: {ellipsify(dayProgress.mintTx, 6)}
                      </AppText>
                    )}
                    {dayProgress.completedAt && (
                      <AppText style={{ color: colors.textSubtle, fontSize: 11 }}>
                        {new Date(dayProgress.completedAt).toLocaleDateString()}
                      </AppText>
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        ) : (
          <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
            <UiIconSymbol name="trophy.fill" size={64} color={colors.textSubtle} />
            <AppText type="subtitle" style={{ color: colors.text, marginTop: 20 }}>
              No Badges Yet
            </AppText>
            <AppText style={{ color: colors.textMuted, textAlign: 'center', marginTop: 8 }}>
              Complete daily challenges and mint your NFT badges.
            </AppText>
          </View>
        )}
      </ScrollView>
    </AppPage>
  )
}

const styles = StyleSheet.create({
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: '47%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },
  dayBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  dayText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  mintInfo: {
    marginTop: 12,
    padding: 8,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    gap: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 20,
    marginTop: 20,
  },
})
