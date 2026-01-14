/**
 * Home Screen - Today's Challenge
 * Shows current day's task, completion button, and mint option
 */

import { useGetBalance } from '@/components/account/use-get-balance'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { MintSuccessModal } from '@/components/challenge/mint-success-modal'
import { formatMintFee, useMintBadge } from '@/components/challenge/use-mint-badge'
import { ClusterNetwork } from '@/components/cluster/cluster-network'
import { useCluster } from '@/components/cluster/cluster-provider'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { getMintFeeForDay } from '@/constants/challenges'
import { Colors } from '@/constants/colors'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
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
  const { account } = useMobileWallet()
  const { selectedCluster } = useCluster()

  const {
    currentDay,
    currentDayChallenge,
    currentDayState,
    stats,
    navigateToDay,
    completeDay,
    uncompleteDay,
    markBadgeMinted,
    isDayCompleted,
    isDayMinted,
    refreshProgress,
    isLoading,
  } = useChallenge()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [mintResult, setMintResult] = useState<{ mintAddress: string; signature: string } | null>(null)

  // Use account.publicKey directly - this is the correct wallet address
  const address = account?.publicKey ?? null

  const { data: balance } = useGetBalance({ address: address! })
  const mintBadge = useMintBadge({ address: address! })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshProgress()
    setIsRefreshing(false)
  }

  const handleCompleteDay = async () => {
    if (!currentDayState || currentDayState.progress.completed) return

    setIsCompleting(true)
    try {
      await completeDay(currentDay)
    } finally {
      setIsCompleting(false)
    }
  }

  const handleUncompleteDay = async () => {
    if (!currentDayState || !currentDayState.progress.completed) return
    if (currentDayState.progress.badgeMinted) {
      Alert.alert('Cannot Undo', 'This day\'s badge has been minted.')
      return
    }

    await uncompleteDay(currentDay)
  }

  const handleMintBadge = async () => {
    if (!currentDayState || !address || !currentDayChallenge) {
      return
    }
    if (!currentDayState.canMint) {
      return
    }

    const mintFee = getMintFeeForDay(currentDay)
    const solBalance = balance ? balance / 1e9 : 0

    // Check balance first - need mint fee + ~0.01 SOL for NFT creation fees
    if (solBalance < mintFee + 0.01) {
      Alert.alert(
        'Insufficient Balance',
        `You need ${formatMintFee(mintFee)} + ~0.01 SOL network fees to mint this badge.`
      )
      return
    }

    // Directly start minting - wallet will handle confirmation
    setIsMinting(true)
    try {
      const result = await mintBadge.mutateAsync({ day: currentDay })
      await markBadgeMinted(currentDay, result.badge)

      // Show success modal
      setMintResult({
        mintAddress: result.mintAddress,
        signature: result.signature,
      })
      setShowSuccessModal(true)
    } catch (error) {
      Alert.alert('Minting Failed', 'Transaction was cancelled or failed. Please try again.')
    } finally {
      setIsMinting(false)
    }
  }

  const handlePreviousDay = () => {
    if (currentDay > 1) {
      navigateToDay(currentDay - 1)
    }
  }

  const handleNextDay = () => {
    if (currentDay < 21) {
      navigateToDay(currentDay + 1)
    }
  }

  const progressPercent = Math.round((stats.daysCompleted / 21) * 100)
  const isCurrentDayCompleted = isDayCompleted(currentDay)
  const isCurrentDayMinted = isDayMinted(currentDay)

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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <AppText style={styles.headerTitle}>21-S</AppText>
          </View>
          <View style={styles.headerRight}>
            <View style={[styles.dayBadge, { backgroundColor: colors.accent }]}>
              <AppText style={styles.dayBadgeText}>Day {currentDay}</AppText>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressSection, { backgroundColor: colors.surface }]}>
          <View style={styles.progressHeader}>
            <AppText style={[styles.progressLabel, { color: colors.textMuted }]}>
              YOUR JOURNEY
            </AppText>
            <AppText style={[styles.progressPercent, { color: colors.accent }]}>
              {stats.daysCompleted}/21 Days
            </AppText>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressPercent}%`, backgroundColor: colors.accent },
              ]}
            />
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText style={[styles.statNumber, { color: colors.warning }]}>
                {stats.currentStreak}
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                Streak
              </AppText>
            </View>
            <View style={styles.statItem}>
              <AppText style={[styles.statNumber, { color: colors.success }]}>
                {stats.badgesMinted}
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                Minted
              </AppText>
            </View>
            <View style={styles.statItem}>
              <AppText style={[styles.statNumber, { color: colors.text }]}>
                {progressPercent}%
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textMuted }]}>
                Complete
              </AppText>
            </View>
          </View>
        </View>

        {/* Today's Challenge Card */}
        {currentDayChallenge && (
          <View style={[styles.challengeCard, { backgroundColor: colors.surface }]}>
            <View style={styles.challengeHeader}>
              <View>
                <AppText style={[styles.challengeLabel, { color: colors.accent }]}>
                  TODAY'S CHALLENGE
                </AppText>
                <AppText style={[styles.challengeTitle, { color: colors.text }]}>
                  {currentDayChallenge.title}
                </AppText>
              </View>
              {isCurrentDayCompleted && (
                <View style={[styles.completedBadge, { backgroundColor: colors.successMuted }]}>
                  <UiIconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <AppText style={{ color: colors.success, fontWeight: '600', fontSize: 12 }}>
                    Done
                  </AppText>
                </View>
              )}
            </View>

            <AppText style={[styles.challengeTask, { color: colors.text }]}>
              {currentDayChallenge.task}
            </AppText>

            <View style={[styles.tipBox, { backgroundColor: colors.surfaceAlt }]}>
              <UiIconSymbol name="lightbulb.fill" size={16} color={colors.warning} />
              <AppText style={[styles.tipText, { color: colors.textMuted }]}>
                {currentDayChallenge.tip}
              </AppText>
            </View>

            {/* Complete Button */}
            {!isCurrentDayCompleted ? (
              <TouchableOpacity
                onPress={handleCompleteDay}
                disabled={isCompleting}
                style={[styles.completeButton, { backgroundColor: colors.accent }]}
                activeOpacity={0.8}
              >
                <UiIconSymbol name="checkmark.circle" size={22} color="#FFFFFF" />
                <AppText style={styles.completeButtonText}>
                  {isCompleting ? 'Completing...' : 'Mark Complete'}
                </AppText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleUncompleteDay}
                disabled={isCurrentDayMinted}
                style={[styles.undoButton, {
                  backgroundColor: isCurrentDayMinted ? colors.border : colors.surfaceAlt
                }]}
                activeOpacity={0.8}
              >
                <UiIconSymbol
                  name="arrow.uturn.backward"
                  size={18}
                  color={isCurrentDayMinted ? colors.textSubtle : colors.textMuted}
                />
                <AppText style={{
                  color: isCurrentDayMinted ? colors.textSubtle : colors.textMuted,
                  fontWeight: '600'
                }}>
                  {isCurrentDayMinted ? 'Minted - Cannot Undo' : 'Undo Completion'}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Mint Badge Card */}
        {currentDayChallenge && (
          <View style={[styles.mintCard, {
            backgroundColor: isCurrentDayCompleted && !isCurrentDayMinted
              ? colors.accentGlow
              : colors.surface,
            borderColor: isCurrentDayCompleted && !isCurrentDayMinted
              ? colors.accent
              : colors.border,
          }]}>
            <View style={styles.mintHeader}>
              <UiIconSymbol
                name="trophy.fill"
                size={28}
                color={isCurrentDayMinted ? colors.success : colors.warning}
              />
              <View style={styles.mintInfo}>
                <AppText style={[styles.mintBadgeName, { color: colors.text }]}>
                  {currentDayChallenge.badge.name}
                </AppText>
                <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                  {isCurrentDayMinted
                    ? 'Already minted ✓'
                    : isCurrentDayCompleted
                      ? 'Ready to mint!'
                      : 'Complete the task to unlock'}
                </AppText>
              </View>
            </View>

            {!isCurrentDayMinted && (
              <TouchableOpacity
                onPress={handleMintBadge}
                disabled={!isCurrentDayCompleted || isMinting}
                style={[styles.mintButton, {
                  backgroundColor: isCurrentDayCompleted ? colors.accent : colors.border
                }]}
                activeOpacity={0.8}
              >
                <AppText style={[styles.mintButtonText, {
                  color: isCurrentDayCompleted ? '#FFFFFF' : colors.textSubtle
                }]}>
                  {isMinting
                    ? 'Minting...'
                    : 'Mint Early NFT of The Challenge'}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Day Navigation */}
        <View style={styles.dayNavigation}>
          <TouchableOpacity
            onPress={handlePreviousDay}
            disabled={currentDay <= 1}
            style={[styles.navButton, {
              backgroundColor: colors.surface,
              opacity: currentDay <= 1 ? 0.5 : 1
            }]}
          >
            <UiIconSymbol name="chevron.left" size={20} color={colors.text} />
            <AppText style={{ color: colors.text }}>Day {currentDay - 1}</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/challenges')}
            style={[styles.allDaysButton, { backgroundColor: colors.surfaceAlt }]}
          >
            <AppText style={{ color: colors.accent, fontWeight: '600' }}>All Days</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNextDay}
            disabled={currentDay >= 21}
            style={[styles.navButton, {
              backgroundColor: colors.surface,
              opacity: currentDay >= 21 ? 0.5 : 1
            }]}
          >
            <AppText style={{ color: colors.text }}>Day {currentDay + 1}</AppText>
            <UiIconSymbol name="chevron.right" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* All Complete Message */}
        {stats.daysCompleted >= 21 && (
          <View style={[styles.completeCard, { backgroundColor: colors.successMuted }]}>
            <UiIconSymbol name="trophy.fill" size={48} color={colors.success} />
            <AppText style={[styles.completeTitle, { color: colors.success }]}>
              Journey Complete!
            </AppText>
            <AppText style={{ color: colors.textMuted, textAlign: 'center' }}>
              You've completed all 21 days. You are now a social master!
            </AppText>
          </View>
        )}
      </ScrollView>

      {/* Success Modal */}
      {currentDayChallenge && mintResult && (
        <MintSuccessModal
          visible={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false)
            setMintResult(null)
          }}
          challenge={currentDayChallenge}
          mintAddress={mintResult.mintAddress}
          signature={mintResult.signature}
          network={selectedCluster.network === ClusterNetwork.Mainnet ? 'mainnet-beta' : 'devnet'}
        />
      )}
    </AppPage>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ECEDEE',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dayBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  progressSection: {
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
    fontSize: 16,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  challengeCard: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  challengeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  challengeTask: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 16,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  mintCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  mintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  mintInfo: {
    flex: 1,
  },
  mintBadgeName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  mintButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  mintButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dayNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  allDaysButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  completeCard: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },
})
