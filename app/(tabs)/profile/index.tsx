/**
 * Profile Screen
 * Shows user stats, badges, and account information
 */

import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { PublicKey } from '@solana/web3.js'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { Colors, BadgeColors, TierColors } from '@/constants/colors'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { useMintBadge, formatMintFee } from '@/components/challenge/use-mint-badge'
import { useGetBalance } from '@/components/account/use-get-balance'
import { getChallengeById } from '@/constants/challenges'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { ellipsify } from '@/utils/ellipsify'

export default function ProfileScreen() {
  const router = useRouter()
  const colors = Colors.dark
  const { account } = useMobileWallet()

  const {
    stats,
    userProgress,
    completedChallenges,
    getChallengeProgress,
    markBadgeMinted,
    refreshProgress,
  } = useChallenge()

  const address = account?.address ? new PublicKey(account.address) : null
  const { data: balance } = useGetBalance({ address: address! })
  const mintBadge = useMintBadge({ address: address! })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mintingId, setMintingId] = useState<number | null>(null)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshProgress()
    setIsRefreshing(false)
  }

  const handleMintBadge = async (challengeId: number) => {
    const challenge = getChallengeById(challengeId)
    if (!challenge) return

    const progress = getChallengeProgress(challengeId)
    if (!progress || progress.status !== 'completed' || progress.badgeMinted) {
      Alert.alert('Cannot Mint', 'This badge is not available for minting.')
      return
    }

    // Check balance
    const solBalance = balance ? balance / 1e9 : 0
    if (solBalance < challenge.mintFee + 0.001) {
      Alert.alert(
        'Insufficient Balance',
        `You need ${formatMintFee(challenge.mintFee)} + network fees to mint this badge.`
      )
      return
    }

    Alert.alert(
      'Mint Badge',
      `Mint "${challenge.badge.name}" for ${formatMintFee(challenge.mintFee)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mint',
          onPress: async () => {
            setMintingId(challengeId)
            try {
              const result = await mintBadge.mutateAsync({ challengeId })
              await markBadgeMinted(challengeId, result.badge)
              Alert.alert('Success!', 'Your badge has been minted!')
            } catch (error) {
              Alert.alert('Error', 'Failed to mint badge. Please try again.')
            } finally {
              setMintingId(null)
            }
          },
        },
      ]
    )
  }

  const handleSettingsPress = () => {
    router.push('/(tabs)/settings')
  }

  // Find unminted completed challenges
  const unmintedChallenges = completedChallenges.filter((c) => {
    const progress = getChallengeProgress(c.id)
    return progress && !progress.badgeMinted
  })

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
            <AppText type="title" style={{ color: colors.text }}>
              Profile
            </AppText>
            <AppText style={[styles.walletAddress, { color: colors.textMuted }]}>
              {account?.address ? ellipsify(account.address, 8) : 'Not connected'}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={handleSettingsPress}
            style={[styles.settingsButton, { backgroundColor: colors.surface }]}
          >
            <UiIconSymbol name="gearshape.fill" size={22} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <AppText style={[styles.statValue, { color: colors.accent }]}>
              {stats.challengesCompleted}
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Challenges
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <AppText style={[styles.statValue, { color: colors.success }]}>
              {stats.totalDaysCompleted}
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Days Done
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <AppText style={[styles.statValue, { color: colors.warning }]}>
              {stats.currentStreak}
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Day Streak
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <AppText style={[styles.statValue, { color: colors.text }]}>
              {stats.badgesCollected}
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Badges
            </AppText>
          </View>
        </View>

        {/* Additional Stats */}
        <View style={[styles.extendedStats, { backgroundColor: colors.surface }]}>
          <View style={styles.extendedStatRow}>
            <AppText style={{ color: colors.textMuted }}>Longest Streak</AppText>
            <AppText style={{ color: colors.text, fontWeight: '700' }}>
              {stats.longestStreak} days
            </AppText>
          </View>
          <View style={styles.extendedStatRow}>
            <AppText style={{ color: colors.textMuted }}>Completion Rate</AppText>
            <AppText style={{ color: colors.text, fontWeight: '700' }}>
              {stats.completionRate}%
            </AppText>
          </View>
          <View style={styles.extendedStatRow}>
            <AppText style={{ color: colors.textMuted }}>SOL Spent on Badges</AppText>
            <AppText style={{ color: colors.accent, fontWeight: '700' }}>
              {stats.totalSOLSpent.toFixed(3)} SOL
            </AppText>
          </View>
        </View>

        {/* Unminted Badges Section */}
        {unmintedChallenges.length > 0 && (
          <View style={styles.section}>
            <AppText type="subtitle" style={{ color: colors.text }}>
              Ready to Mint
            </AppText>
            <AppText style={{ color: colors.textMuted, marginTop: 4 }}>
              You have {unmintedChallenges.length} badge(s) to claim!
            </AppText>

            {unmintedChallenges.map((challenge) => (
              <TouchableOpacity
                key={challenge.id}
                onPress={() => handleMintBadge(challenge.id)}
                disabled={mintingId === challenge.id}
                style={[
                  styles.mintCard,
                  {
                    backgroundColor: colors.accentGlow,
                    borderColor: colors.accent,
                  },
                ]}
                activeOpacity={0.8}
              >
                <UiIconSymbol
                  name="trophy.fill"
                  size={32}
                  color={BadgeColors[challenge.badge.rarity]}
                />
                <View style={{ flex: 1 }}>
                  <AppText style={{ color: colors.text, fontWeight: '700' }}>
                    {challenge.badge.name}
                  </AppText>
                  <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                    {challenge.title}
                  </AppText>
                </View>
                <View style={styles.mintButton}>
                  <AppText
                    style={[styles.mintFeeText, { color: TierColors[challenge.tier] }]}
                  >
                    {mintingId === challenge.id
                      ? 'Minting...'
                      : formatMintFee(challenge.mintFee)}
                  </AppText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Collected Badges */}
        <View style={styles.section}>
          <AppText type="subtitle" style={{ color: colors.text }}>
            My Badges
          </AppText>

          {userProgress?.badges && userProgress.badges.length > 0 ? (
            <View style={styles.badgesGrid}>
              {userProgress.badges.map((badge) => {
                const challenge = getChallengeById(badge.challengeId)
                if (!challenge) return null

                return (
                  <View
                    key={badge.mintAddress}
                    style={[
                      styles.badgeCard,
                      {
                        backgroundColor: colors.surface,
                        borderColor: BadgeColors[challenge.badge.rarity],
                      },
                    ]}
                  >
                    <UiIconSymbol
                      name="trophy.fill"
                      size={36}
                      color={BadgeColors[challenge.badge.rarity]}
                    />
                    <AppText
                      style={[styles.badgeName, { color: colors.text }]}
                      numberOfLines={1}
                    >
                      {challenge.badge.name}
                    </AppText>
                    <View
                      style={[
                        styles.rarityBadge,
                        { backgroundColor: BadgeColors[challenge.badge.rarity] + '20' },
                      ]}
                    >
                      <AppText
                        style={[
                          styles.rarityText,
                          { color: BadgeColors[challenge.badge.rarity] },
                        ]}
                      >
                        {challenge.badge.rarity.toUpperCase()}
                      </AppText>
                    </View>
                  </View>
                )
              })}
            </View>
          ) : (
            <View
              style={[styles.emptyBadges, { backgroundColor: colors.surface }]}
            >
              <UiIconSymbol
                name="trophy.fill"
                size={40}
                color={colors.textSubtle}
              />
              <AppText style={{ color: colors.textMuted, marginTop: 12 }}>
                No badges collected yet
              </AppText>
              <AppText style={{ color: colors.textSubtle, fontSize: 13 }}>
                Complete challenges to earn NFT badges
              </AppText>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </AppPage>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  walletAddress: {
    fontSize: 14,
    marginTop: 4,
  },
  settingsButton: {
    padding: 12,
    borderRadius: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
  extendedStats: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
  },
  extendedStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  mintCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    gap: 14,
  },
  mintButton: {},
  mintFeeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
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
    marginTop: 10,
    textAlign: 'center',
  },
  rarityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  rarityText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyBadges: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 16,
    marginTop: 12,
  },
})
