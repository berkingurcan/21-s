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
import { InfoModal } from '@/components/info/info-modal'
import { useAlert } from '@/components/ui/custom-alert'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { getMintFeeForDay } from '@/constants/challenges'
import { Colors } from '@/constants/colors'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
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
  const { account } = useMobileWallet()
  const { selectedCluster } = useCluster()
  const { showAlert } = useAlert()

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
  const [showInfoModal, setShowInfoModal] = useState(false)
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
      showAlert({
        title: 'Cannot Undo',
        message: 'This day\'s badge has been minted.',
      })
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
      showAlert({
        title: 'Insufficient Balance',
        message: `You need ${formatMintFee(mintFee)} + ~0.01 SOL for network fees.`,
      })
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
      showAlert({
        title: 'Minting Failed',
        message: 'Transaction was cancelled or failed.',
      })
    } finally {
      setIsMinting(false)
    }
  }

  const handlePreviousDay = () => {
    // Can always go back (but not below day 1)
    if (currentDay > 1) {
      navigateToDay(currentDay - 1)
    }
  }

  // Check if user can proceed to next day (must complete and mint current day)
  const canProceedToNextDay = () => {
    return isDayCompleted(currentDay) && isDayMinted(currentDay)
  }

  const handleNextDay = () => {
    if (currentDay >= 21) return

    if (!canProceedToNextDay()) {
      if (!isDayCompleted(currentDay)) {
        showAlert({
          title: 'Day Locked',
          message: 'Complete today\'s challenge first.',
        })
      } else if (!isDayMinted(currentDay)) {
        showAlert({
          title: 'Mint Required',
          message: 'Mint your badge to unlock the next day.',
        })
      }
      return
    }

    navigateToDay(currentDay + 1)
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
            <TouchableOpacity
              onPress={() => setShowInfoModal(true)}
              style={[styles.infoButton, { backgroundColor: colors.surfaceAlt }]}
              activeOpacity={0.7}
            >
              <UiIconSymbol name="info.circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
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
              <AppText style={[styles.statNumber, { color: colors.gold }]}>
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
          <View style={[styles.challengeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.challengeHeader}>
              <View>
                <AppText style={[styles.challengeLabel, { color: colors.textSubtle }]}>
                  TODAY
                </AppText>
                <AppText style={[styles.challengeTitle, { color: colors.text }]}>
                  {currentDayChallenge.title}
                </AppText>
              </View>
              {isCurrentDayCompleted && (
                <View style={[styles.completedBadge, { backgroundColor: colors.successMuted }]}>
                  <AppText style={{ color: colors.success, fontWeight: '700', fontSize: 10, letterSpacing: 1 }}>
                    COMPLETE
                  </AppText>
                </View>
              )}
            </View>

            <AppText style={[styles.challengeTask, { color: colors.textMuted }]}>
              {currentDayChallenge.task}
            </AppText>

            {/* Minimal tip - just left border accent */}
            <View style={[styles.tipBox, { borderLeftColor: colors.border }]}>
              <AppText style={[styles.tipText, { color: colors.textSubtle }]}>
                {currentDayChallenge.tip}
              </AppText>
            </View>

            {/* Complete Button */}
            {!isCurrentDayCompleted ? (
              <TouchableOpacity
                onPress={handleCompleteDay}
                disabled={isCompleting}
                style={[styles.completeButton, { backgroundColor: colors.accent }]}
                activeOpacity={0.7}
              >
                <AppText style={styles.completeButtonText}>
                  {isCompleting ? 'COMPLETING...' : 'MARK COMPLETE'}
                </AppText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleUncompleteDay}
                disabled={isCurrentDayMinted}
                style={[styles.undoButton, {
                  backgroundColor: 'transparent',
                  borderColor: isCurrentDayMinted ? colors.border : colors.textSubtle,
                }]}
                activeOpacity={0.7}
              >
                <AppText style={{
                  color: isCurrentDayMinted ? colors.textSubtle : colors.textMuted,
                  fontWeight: '600',
                  fontSize: 12,
                  letterSpacing: 1,
                }}>
                  {isCurrentDayMinted ? 'MINTED' : 'UNDO'}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Mint Badge Card */}
        {currentDayChallenge && (
          <View style={[styles.mintCard, {
            backgroundColor: colors.surface,
            borderColor: isCurrentDayCompleted && !isCurrentDayMinted
              ? colors.accent
              : colors.border,
          }]}>
            <View style={styles.mintHeader}>
              <View style={[styles.mintIcon, { backgroundColor: isCurrentDayMinted ? colors.successMuted : colors.accentGlow }]}>
                <AppText style={{ color: isCurrentDayMinted ? colors.success : colors.accent, fontSize: 16, fontWeight: '700' }}>
                  NFT
                </AppText>
              </View>
              <View style={styles.mintInfo}>
                <AppText style={[styles.mintBadgeName, { color: colors.text }]}>
                  {currentDayChallenge.badge.name}
                </AppText>
                <AppText style={{ color: colors.textSubtle, fontSize: 12, letterSpacing: 0.5 }}>
                  {isCurrentDayMinted
                    ? 'COLLECTED'
                    : isCurrentDayCompleted
                      ? 'READY TO MINT'
                      : 'COMPLETE TASK TO UNLOCK'}
                </AppText>
              </View>
            </View>

            {!isCurrentDayMinted && (
              <TouchableOpacity
                onPress={handleMintBadge}
                disabled={!isCurrentDayCompleted || isMinting}
                style={[styles.mintButton, {
                  backgroundColor: isCurrentDayCompleted ? colors.text : colors.border
                }]}
                activeOpacity={0.7}
              >
                <AppText style={[styles.mintButtonText, {
                  color: isCurrentDayCompleted ? colors.background : colors.textSubtle
                }]}>
                  {isMinting
                    ? 'MINTING...'
                    : 'MINT EARLY NFT'}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Day Navigation */}
        <View style={styles.dayNavigation}>
          {/* Only show previous button if not on Day 1 */}
          {currentDay > 1 ? (
            <TouchableOpacity
              onPress={handlePreviousDay}
              style={[styles.navButton, { backgroundColor: colors.surface }]}
            >
              <UiIconSymbol name="chevron.left" size={20} color={colors.text} />
              <AppText style={{ color: colors.text }}>Day {currentDay - 1}</AppText>
            </TouchableOpacity>
          ) : (
            <View style={styles.navButtonPlaceholder} />
          )}

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/challenges')}
            style={[styles.allDaysButton, { backgroundColor: colors.surfaceAlt }]}
          >
            <AppText style={{ color: colors.accent, fontWeight: '600' }}>All Days</AppText>
          </TouchableOpacity>

          {/* Show next button with lock if not completed + minted */}
          {currentDay < 21 ? (
            <TouchableOpacity
              onPress={handleNextDay}
              style={[
                styles.navButton,
                {
                  backgroundColor: canProceedToNextDay()
                    ? colors.surface
                    : colors.surfaceAlt,
                  opacity: canProceedToNextDay() ? 1 : 0.7,
                },
              ]}
            >
              <AppText
                style={{
                  color: canProceedToNextDay() ? colors.text : colors.textSubtle,
                }}
              >
                Day {currentDay + 1}
              </AppText>
              {canProceedToNextDay() ? (
                <UiIconSymbol name="chevron.right" size={20} color={colors.text} />
              ) : (
                <UiIconSymbol name="lock.fill" size={16} color={colors.textSubtle} />
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.navButtonPlaceholder} />
          )}
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

      {/* Info Modal */}
      <InfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
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
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
  },
  dayBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
  progressSection: {
    padding: 20,
    borderRadius: 2,
    marginBottom: 16,
    borderWidth: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 2,
    borderRadius: 0,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 0,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  challengeCard: {
    padding: 24,
    borderRadius: 2,
    marginBottom: 16,
    borderWidth: 1,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  challengeLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  completedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 2,
  },
  challengeTask: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  tipBox: {
    borderLeftWidth: 2,
    paddingLeft: 16,
    paddingVertical: 4,
    marginBottom: 24,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  completeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 2,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  undoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 2,
    borderWidth: 1,
  },
  mintCard: {
    padding: 20,
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 16,
  },
  mintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  mintIcon: {
    width: 48,
    height: 48,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mintInfo: {
    flex: 1,
  },
  mintBadgeName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  mintButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 2,
  },
  mintButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dayNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  navButtonPlaceholder: {
    width: 90,
  },
  allDaysButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  completeCard: {
    padding: 32,
    borderRadius: 2,
    alignItems: 'center',
  },
  completeTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
})
