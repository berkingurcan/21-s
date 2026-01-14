/**
 * Badges Gallery Screen
 * Shows all collected NFT badges
 */

import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { Colors, BadgeColors } from '@/constants/colors'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { getChallengeById } from '@/constants/challenges'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { ellipsify } from '@/utils/ellipsify'

export default function BadgesScreen() {
  const colors = Colors.dark
  const { userProgress } = useChallenge()

  const badges = userProgress?.badges || []

  return (
    <AppPage>
      <ScrollView showsVerticalScrollIndicator={false}>
        {badges.length > 0 ? (
          <View style={styles.badgesGrid}>
            {badges.map((badge) => {
              const challenge = getChallengeById(badge.challengeId)
              if (!challenge) return null

              const badgeColor = BadgeColors[challenge.badge.rarity]

              return (
                <View
                  key={badge.mintAddress}
                  style={[
                    styles.badgeCard,
                    {
                      backgroundColor: colors.surface,
                      borderColor: badgeColor,
                    },
                  ]}
                >
                  <UiIconSymbol name="trophy.fill" size={48} color={badgeColor} />

                  <AppText
                    style={[styles.badgeName, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {challenge.badge.name}
                  </AppText>

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

                  <AppText style={{ color: colors.textMuted, fontSize: 12, marginTop: 8 }}>
                    {challenge.title}
                  </AppText>

                  <View style={[styles.mintInfo, { backgroundColor: colors.surfaceAlt }]}>
                    <AppText style={{ color: colors.textSubtle, fontSize: 11 }}>
                      TX: {ellipsify(badge.transactionSignature, 6)}
                    </AppText>
                    <AppText style={{ color: colors.textSubtle, fontSize: 11 }}>
                      {new Date(badge.mintedAt).toLocaleDateString()}
                    </AppText>
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
              Complete challenges to earn NFT badges that will appear here.
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
    fontSize: 15,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },
  rarityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  rarityText: {
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
