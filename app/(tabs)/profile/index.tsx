/**
 * Profile Screen
 * Shows user stats, minted daily badges, and account information
 */

import { useGetBalance } from '@/components/account/use-get-balance'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { formatMintFee, useMintBadge } from '@/components/challenge/use-mint-badge'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { getDayChallenge, getMintFeeForDay } from '@/constants/challenges'
import { Colors } from '@/constants/colors'
import { getPublicKeyFromAccount } from '@/utils/base64-to-publickey'
import { ellipsify } from '@/utils/ellipsify'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function ProfileScreen() {
  const router = useRouter()
  const colors = Colors.dark
  const { account } = useMobileWallet()

  const {
    stats,
    userProgress,
    getUnmintedCompletedDays,
    markBadgeMinted,
    refreshProgress,
    isDayMinted,
  } = useChallenge()

  // Safely create PublicKey from address (handles Base64 from Solana Mobile)
  const address = useMemo(() => {
    return getPublicKeyFromAccount(account)
  }, [account?.address])

  const { data: balance } = useGetBalance({ address: address! })
  const mintBadge = useMintBadge({ address: address! })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mintingDay, setMintingDay] = useState<number | null>(null)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshProgress()
    setIsRefreshing(false)
  }

  const handleMintBadge = async (day: number) => {
    if (!address) return

    const challenge = getDayChallenge(day)
    if (!challenge) return

    const mintFee = getMintFeeForDay(day)
    const solBalance = balance ? balance / 1e9 : 0

    if (solBalance < mintFee + 0.001) {
      Alert.alert(
        'Insufficient Balance',
        `You need ${formatMintFee(mintFee)} + network fees to mint this badge.`
      )
      return
    }

    Alert.alert(
      'Mint Badge',
      `Mint "${challenge.badge.name}" for ${formatMintFee(mintFee)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mint',
          onPress: async () => {
            setMintingDay(day)
            try {
              const result = await mintBadge.mutateAsync({ day })
              await markBadgeMinted(day, result.badge)
              Alert.alert('Success!', 'Your badge has been minted!')
            } catch (error) {
              Alert.alert('Error', 'Failed to mint badge. Please try again.')
            } finally {
              setMintingDay(null)
            }
          },
        },
      ]
    )
  }

  const handleSettingsPress = () => {
    router.push('/(tabs)/settings')
  }

  const unmintedDays = getUnmintedCompletedDays()

  // Get minted days from progress
  const mintedDays = userProgress?.daysProgress.filter((dp) => dp.badgeMinted) || []

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
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/home')}
            style={[styles.backButton, { backgroundColor: colors.surface }]}
          >
            <UiIconSymbol name="chevron.left" size={20} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
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
            <AppText style={[styles.statValue, { color: colors.success }]}>
              {stats.daysCompleted}
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Days Done
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <AppText style={[styles.statValue, { color: colors.accent }]}>
              {stats.badgesMinted}
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Badges
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <AppText style={[styles.statValue, { color: colors.warning }]}>
              {stats.currentStreak}
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Streak
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <AppText style={[styles.statValue, { color: colors.text }]}>
              {stats.completionRate}%
            </AppText>
            <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
              Complete
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
            <AppText style={{ color: colors.textMuted }}>SOL Spent on Badges</AppText>
            <AppText style={{ color: colors.accent, fontWeight: '700' }}>
              {stats.totalSOLSpent.toFixed(4)} SOL
            </AppText>
          </View>
        </View>

        {/* Unminted Badges Section */}
        {unmintedDays.length > 0 && (
          <View style={styles.section}>
            <AppText type="subtitle" style={{ color: colors.text }}>
              Ready to Mint
            </AppText>
            <AppText style={{ color: colors.textMuted, marginTop: 4 }}>
              You have {unmintedDays.length} badge(s) to claim!
            </AppText>

            {unmintedDays.map((challenge) => (
              <TouchableOpacity
                key={challenge.day}
                onPress={() => handleMintBadge(challenge.day)}
                disabled={mintingDay === challenge.day}
                style={[
                  styles.mintCard,
                  {
                    backgroundColor: colors.accentGlow,
                    borderColor: colors.accent,
                  },
                ]}
                activeOpacity={0.8}
              >
                <UiIconSymbol name="trophy.fill" size={32} color={colors.warning} />
                <View style={{ flex: 1 }}>
                  <AppText style={{ color: colors.text, fontWeight: '700' }}>
                    {challenge.badge.name}
                  </AppText>
                  <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                    Day {challenge.day}: {challenge.title}
                  </AppText>
                </View>
                <View style={styles.mintButton}>
                  <AppText style={[styles.mintFeeText, { color: colors.accent }]}>
                    {mintingDay === challenge.day
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
                    <UiIconSymbol name="trophy.fill" size={36} color={colors.warning} />
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
                  </View>
                )
              })}
            </View>
          ) : (
            <View style={[styles.emptyBadges, { backgroundColor: colors.surface }]}>
              <UiIconSymbol name="trophy.fill" size={40} color={colors.textSubtle} />
              <AppText style={{ color: colors.textMuted, marginTop: 12 }}>
                No badges collected yet
              </AppText>
              <AppText style={{ color: colors.textSubtle, fontSize: 13 }}>
                Complete daily challenges and mint your NFTs
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
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  backButton: {
    padding: 12,
    borderRadius: 12,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
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
  emptyBadges: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 16,
    marginTop: 12,
  },
})
