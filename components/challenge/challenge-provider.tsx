/**
 * Challenge Context Provider
 * Manages challenge state and actions throughout the app
 */

import {
  createContext,
  type PropsWithChildren,
  use,
  useMemo,
  useCallback,
} from 'react'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { useChallengeStorage } from '@/hooks/use-challenge-storage'
import {
  Challenge,
  ChallengeProgress,
  UserProgress,
  ActiveChallengeState,
  UserStats,
  MintedBadge,
} from '@/types/challenges'
import {
  CHALLENGES,
  getChallengeById,
  getAvailableChallenges,
} from '@/constants/challenges'

export interface ChallengeContextState {
  // Data
  userProgress: UserProgress | null
  challenges: Challenge[]
  activeChallenge: ActiveChallengeState | null
  availableChallenges: Challenge[]
  completedChallenges: Challenge[]
  stats: UserStats

  // Loading states
  isLoading: boolean
  error: Error | null

  // Actions
  startChallenge: (challengeId: number) => Promise<void>
  completeDay: (challengeId: number, day: number) => Promise<void>
  markBadgeMinted: (challengeId: number, badge: MintedBadge) => Promise<void>
  getChallengeProgress: (challengeId: number) => ChallengeProgress | null
  getChallengeStatus: (
    challengeId: number
  ) => 'locked' | 'available' | 'active' | 'completed'
  refreshProgress: () => Promise<void>
}

const Context = createContext<ChallengeContextState>(
  {} as ChallengeContextState
)

export function useChallenge() {
  const value = use(Context)
  if (!value) {
    throw new Error('useChallenge must be wrapped in a <ChallengeProvider />')
  }
  return value
}

export function ChallengeProvider({ children }: PropsWithChildren) {
  const { account } = useMobileWallet()
  const walletAddress = account?.address

  const {
    progress: userProgress,
    isLoading,
    error,
    getChallengeProgress,
    startChallenge: startChallengeStorage,
    completeDay: completeDayStorage,
    markBadgeMinted: markBadgeMintedStorage,
    refreshProgress,
  } = useChallengeStorage(walletAddress)

  // Get active challenge
  const activeChallenge = useMemo((): ActiveChallengeState | null => {
    if (!userProgress) return null

    const activeProg = userProgress.challengeProgress.find(
      (cp) => cp.status === 'active'
    )

    if (!activeProg) return null

    const challenge = getChallengeById(activeProg.challengeId)
    if (!challenge) return null

    const completedDays = activeProg.daysCompleted.length
    const todayTask =
      completedDays < 21 ? challenge.days[completedDays] : null

    // Check if user can complete today (hasn't already completed today)
    const today = new Date().toDateString()
    const lastCompletion =
      activeProg.daysCompleted.length > 0
        ? new Date(
            activeProg.daysCompleted[
              activeProg.daysCompleted.length - 1
            ].completedAt || ''
          ).toDateString()
        : null

    const canCompleteToday = lastCompletion !== today && completedDays < 21

    return {
      challenge,
      progress: activeProg,
      todayTask,
      daysRemaining: 21 - completedDays,
      progressPercentage: Math.round((completedDays / 21) * 100),
      canCompleteToday,
    }
  }, [userProgress])

  // Get completed challenge IDs
  const completedChallengeIds = useMemo(() => {
    if (!userProgress) return []
    return userProgress.challengeProgress
      .filter((cp) => cp.status === 'completed')
      .map((cp) => cp.challengeId)
  }, [userProgress])

  // Get available challenges
  const availableChallenges = useMemo(() => {
    return getAvailableChallenges(completedChallengeIds)
  }, [completedChallengeIds])

  // Get completed challenges
  const completedChallenges = useMemo(() => {
    return CHALLENGES.filter((c) => completedChallengeIds.includes(c.id))
  }, [completedChallengeIds])

  // Get challenge status
  const getChallengeStatus = useCallback(
    (challengeId: number): 'locked' | 'available' | 'active' | 'completed' => {
      if (!userProgress) {
        // First challenge is always available
        return challengeId === 1 ? 'available' : 'locked'
      }

      const progress = userProgress.challengeProgress.find(
        (cp) => cp.challengeId === challengeId
      )

      if (progress) {
        return progress.status
      }

      // Check if available
      const challenge = getChallengeById(challengeId)
      if (!challenge) return 'locked'

      if (challenge.requiredChallengeId === null) {
        return 'available'
      }

      const isPrereqComplete = completedChallengeIds.includes(
        challenge.requiredChallengeId
      )

      return isPrereqComplete ? 'available' : 'locked'
    },
    [userProgress, completedChallengeIds]
  )

  // Calculate stats
  const stats = useMemo((): UserStats => {
    if (!userProgress) {
      return {
        challengesCompleted: 0,
        challengesInProgress: 0,
        totalDaysCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalSOLSpent: 0,
        badgesCollected: 0,
        completionRate: 0,
      }
    }

    const challengesCompleted = userProgress.totalChallengesCompleted
    const challengesInProgress = userProgress.challengeProgress.filter(
      (cp) => cp.status === 'active'
    ).length

    // Calculate total SOL spent on mints
    const totalSOLSpent = userProgress.badges.reduce((sum, badge) => {
      const challenge = getChallengeById(badge.challengeId)
      return sum + (challenge?.mintFee || 0)
    }, 0)

    // Calculate completion rate
    const totalDaysAttempted = userProgress.challengeProgress.reduce(
      (sum, cp) => {
        if (cp.status === 'completed') return sum + 21
        if (cp.status === 'active') return sum + (cp.currentDay - 1)
        return sum
      },
      0
    )

    const completionRate =
      totalDaysAttempted > 0
        ? Math.round(
            (userProgress.totalDaysCompleted / totalDaysAttempted) * 100
          )
        : 0

    return {
      challengesCompleted,
      challengesInProgress,
      totalDaysCompleted: userProgress.totalDaysCompleted,
      currentStreak: userProgress.currentStreak,
      longestStreak: userProgress.longestStreak,
      totalSOLSpent,
      badgesCollected: userProgress.badges.length,
      completionRate,
    }
  }, [userProgress])

  // Wrap storage actions
  const startChallenge = useCallback(
    async (challengeId: number) => {
      await startChallengeStorage(challengeId)
    },
    [startChallengeStorage]
  )

  const completeDay = useCallback(
    async (challengeId: number, day: number) => {
      await completeDayStorage(challengeId, day)
    },
    [completeDayStorage]
  )

  const markBadgeMinted = useCallback(
    async (challengeId: number, badge: MintedBadge) => {
      await markBadgeMintedStorage(challengeId, badge)
    },
    [markBadgeMintedStorage]
  )

  const value: ChallengeContextState = useMemo(
    () => ({
      userProgress,
      challenges: CHALLENGES,
      activeChallenge,
      availableChallenges,
      completedChallenges,
      stats,
      isLoading,
      error,
      startChallenge,
      completeDay,
      markBadgeMinted,
      getChallengeProgress,
      getChallengeStatus,
      refreshProgress,
    }),
    [
      userProgress,
      activeChallenge,
      availableChallenges,
      completedChallenges,
      stats,
      isLoading,
      error,
      startChallenge,
      completeDay,
      markBadgeMinted,
      getChallengeProgress,
      getChallengeStatus,
      refreshProgress,
    ]
  )

  return <Context value={value}>{children}</Context>
}
