/**
 * Challenge Context Provider
 * Manages the single 21-day challenge state throughout the app
 */

import {
  DAILY_CHALLENGES,
  getDayChallenge
} from '@/constants/challenges'
import { useChallengeStorage } from '@/hooks/use-challenge-storage'
import {
  CurrentDayState,
  DailyChallenge,
  DayProgress,
  MintedBadge,
  UserProgress,
  UserStats,
} from '@/types/challenges'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import {
  createContext,
  type PropsWithChildren,
  use,
  useCallback,
  useMemo,
} from 'react'

export interface ChallengeContextState {
  // Data
  userProgress: UserProgress | null
  currentDay: number
  currentDayChallenge: DailyChallenge | null
  currentDayState: CurrentDayState | null
  allDays: DailyChallenge[]
  stats: UserStats

  // Loading states
  isLoading: boolean
  error: Error | null

  // Actions
  navigateToDay: (day: number) => Promise<void>
  completeDay: (day: number) => Promise<void>
  uncompleteDay: (day: number) => Promise<void>
  markBadgeMinted: (day: number, badge: MintedBadge) => Promise<void>
  resetProgress: () => Promise<void>
  refreshProgress: () => Promise<void>

  // Helpers
  getDayProgress: (day: number) => DayProgress | null
  isDayCompleted: (day: number) => boolean
  isDayMinted: (day: number) => boolean
  canCompleteDayToday: (day: number) => boolean
  getUnmintedCompletedDays: () => DailyChallenge[]
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
    getDayProgress,
    navigateToDay: navigateToDayStorage,
    completeDay: completeDayStorage,
    uncompleteDay: uncompleteDayStorage,
    markBadgeMinted: markBadgeMintedStorage,
    resetProgress: resetProgressStorage,
    refreshProgress,
    canCompleteDayToday,
  } = useChallengeStorage(walletAddress)

  // Current day being viewed
  const currentDay = userProgress?.currentDay ?? 1

  // Current day's challenge data
  const currentDayChallenge = useMemo(() => {
    return getDayChallenge(currentDay) ?? null
  }, [currentDay])

  // Current day state for UI
  const currentDayState = useMemo((): CurrentDayState | null => {
    if (!userProgress || !currentDayChallenge) return null

    const dayProgress = userProgress.daysProgress.find(
      (dp) => dp.day === currentDay
    )
    if (!dayProgress) return null

    return {
      challenge: currentDayChallenge,
      progress: dayProgress,
      canCompleteToday: !dayProgress.completed,
      canMint: dayProgress.completed && !dayProgress.badgeMinted,
    }
  }, [userProgress, currentDayChallenge, currentDay])

  // Check if day is completed
  const isDayCompleted = useCallback(
    (day: number): boolean => {
      if (!userProgress) return false
      const dayProgress = userProgress.daysProgress.find((dp) => dp.day === day)
      return dayProgress?.completed ?? false
    },
    [userProgress]
  )

  // Check if day's badge is minted
  const isDayMinted = useCallback(
    (day: number): boolean => {
      if (!userProgress) return false
      const dayProgress = userProgress.daysProgress.find((dp) => dp.day === day)
      return dayProgress?.badgeMinted ?? false
    },
    [userProgress]
  )

  // Get unminted completed days
  const getUnmintedCompletedDays = useCallback((): DailyChallenge[] => {
    if (!userProgress) return []

    return userProgress.daysProgress
      .filter((dp) => dp.completed && !dp.badgeMinted)
      .map((dp) => getDayChallenge(dp.day))
      .filter((c): c is DailyChallenge => c !== undefined)
  }, [userProgress])

  // Calculate stats
  const stats = useMemo((): UserStats => {
    if (!userProgress) {
      return {
        daysCompleted: 0,
        badgesMinted: 0,
        totalSOLSpent: 0,
        currentStreak: 0,
        longestStreak: 0,
        completionRate: 0,
      }
    }

    return {
      daysCompleted: userProgress.totalDaysCompleted,
      badgesMinted: userProgress.totalBadgesMinted,
      totalSOLSpent: userProgress.totalSOLSpent,
      currentStreak: userProgress.currentStreak,
      longestStreak: userProgress.longestStreak,
      completionRate: Math.round((userProgress.totalDaysCompleted / 21) * 100),
    }
  }, [userProgress])

  // Wrapped actions
  const navigateToDay = useCallback(
    async (day: number) => {
      await navigateToDayStorage(day)
    },
    [navigateToDayStorage]
  )

  const completeDay = useCallback(
    async (day: number) => {
      await completeDayStorage(day)
    },
    [completeDayStorage]
  )

  const uncompleteDay = useCallback(
    async (day: number) => {
      await uncompleteDayStorage(day)
    },
    [uncompleteDayStorage]
  )

  const markBadgeMinted = useCallback(
    async (day: number, badge: MintedBadge) => {
      await markBadgeMintedStorage(day, badge)
    },
    [markBadgeMintedStorage]
  )

  const resetProgress = useCallback(async () => {
    await resetProgressStorage()
  }, [resetProgressStorage])

  const value: ChallengeContextState = useMemo(
    () => ({
      userProgress,
      currentDay,
      currentDayChallenge,
      currentDayState,
      allDays: DAILY_CHALLENGES,
      stats,
      isLoading,
      error,
      navigateToDay,
      completeDay,
      uncompleteDay,
      markBadgeMinted,
      resetProgress,
      refreshProgress,
      getDayProgress,
      isDayCompleted,
      isDayMinted,
      canCompleteDayToday,
      getUnmintedCompletedDays,
    }),
    [
      userProgress,
      currentDay,
      currentDayChallenge,
      currentDayState,
      stats,
      isLoading,
      error,
      navigateToDay,
      completeDay,
      uncompleteDay,
      markBadgeMinted,
      resetProgress,
      refreshProgress,
      getDayProgress,
      isDayCompleted,
      isDayMinted,
      canCompleteDayToday,
      getUnmintedCompletedDays,
    ]
  )

  return <Context value={value}>{children}</Context>
}
