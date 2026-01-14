/**
 * Challenge Progress Storage Hook
 * Handles persisting and loading day-based challenge progress from AsyncStorage
 */

import { getMintFeeForDay } from '@/constants/challenges'
import { DayProgress, MintedBadge, UserProgress } from '@/types/challenges'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = '@21s_user_progress_v2' // New version for new data structure

/**
 * Initialize empty day progress
 */
const createEmptyDayProgress = (day: number): DayProgress => ({
  day,
  completed: false,
  completedAt: null,
  badgeMinted: false,
  mintTx: null,
})

/**
 * Initialize empty user progress
 */
const createEmptyUserProgress = (walletAddress: string): UserProgress => ({
  walletAddress,
  currentDay: 1,
  daysProgress: Array.from({ length: 21 }, (_, i) => createEmptyDayProgress(i + 1)),
  totalDaysCompleted: 0,
  totalBadgesMinted: 0,
  totalSOLSpent: 0,
  currentStreak: 0,
  longestStreak: 0,
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
})

export function useChallengeStorage(walletAddress: string | undefined) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Load progress from storage
   */
  const loadProgress = useCallback(async () => {
    if (!walletAddress) {
      setProgress(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const stored = await AsyncStorage.getItem(
        `${STORAGE_KEY}_${walletAddress}`
      )

      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress
        setProgress(parsed)
      } else {
        // Create new progress for this wallet
        const newProgress = createEmptyUserProgress(walletAddress)
        await AsyncStorage.setItem(
          `${STORAGE_KEY}_${walletAddress}`,
          JSON.stringify(newProgress)
        )
        setProgress(newProgress)
      }
      setError(null)
    } catch (err) {
      setError(err as Error)
      console.error('Failed to load challenge progress:', err)
    } finally {
      setIsLoading(false)
    }
  }, [walletAddress])

  /**
   * Save progress to storage
   */
  const saveProgress = useCallback(
    async (newProgress: UserProgress) => {
      if (!walletAddress) return

      try {
        const updated = {
          ...newProgress,
          lastActiveAt: new Date().toISOString(),
        }
        await AsyncStorage.setItem(
          `${STORAGE_KEY}_${walletAddress}`,
          JSON.stringify(updated)
        )
        setProgress(updated)
        setError(null)
      } catch (err) {
        setError(err as Error)
        console.error('Failed to save challenge progress:', err)
        throw err
      }
    },
    [walletAddress]
  )

  /**
   * Get progress for a specific day
   */
  const getDayProgress = useCallback(
    (day: number): DayProgress | null => {
      if (!progress) return null
      return progress.daysProgress.find((dp) => dp.day === day) || null
    },
    [progress]
  )

  /**
   * Navigate to a specific day
   */
  const navigateToDay = useCallback(
    async (day: number) => {
      if (!progress || day < 1 || day > 21) return

      await saveProgress({
        ...progress,
        currentDay: day,
      })
    },
    [progress, saveProgress]
  )

  /**
   * Complete a day
   */
  const completeDay = useCallback(
    async (day: number) => {
      if (!progress || day < 1 || day > 21) return

      const dayIndex = progress.daysProgress.findIndex((dp) => dp.day === day)
      if (dayIndex < 0) return

      // Check if already completed
      if (progress.daysProgress[dayIndex].completed) return

      const updatedDaysProgress = [...progress.daysProgress]
      updatedDaysProgress[dayIndex] = {
        ...updatedDaysProgress[dayIndex],
        completed: true,
        completedAt: new Date().toISOString(),
      }

      // Calculate totals
      const totalDaysCompleted = updatedDaysProgress.filter(
        (dp) => dp.completed
      ).length

      // Calculate streak
      const { currentStreak, longestStreak } = calculateStreak(
        updatedDaysProgress,
        progress.longestStreak
      )

      await saveProgress({
        ...progress,
        daysProgress: updatedDaysProgress,
        totalDaysCompleted,
        currentStreak,
        longestStreak,
      })
    },
    [progress, saveProgress]
  )

  /**
   * Uncomplete a day (toggle off)
   */
  const uncompleteDay = useCallback(
    async (day: number) => {
      if (!progress || day < 1 || day > 21) return

      const dayIndex = progress.daysProgress.findIndex((dp) => dp.day === day)
      if (dayIndex < 0) return

      // Can't uncomplete if already minted
      if (progress.daysProgress[dayIndex].badgeMinted) return

      const updatedDaysProgress = [...progress.daysProgress]
      updatedDaysProgress[dayIndex] = {
        ...updatedDaysProgress[dayIndex],
        completed: false,
        completedAt: null,
      }

      const totalDaysCompleted = updatedDaysProgress.filter(
        (dp) => dp.completed
      ).length

      const { currentStreak, longestStreak } = calculateStreak(
        updatedDaysProgress,
        progress.longestStreak
      )

      await saveProgress({
        ...progress,
        daysProgress: updatedDaysProgress,
        totalDaysCompleted,
        currentStreak,
        longestStreak,
      })
    },
    [progress, saveProgress]
  )

  /**
   * Mark day's badge as minted
   */
  const markBadgeMinted = useCallback(
    async (day: number, badge: MintedBadge) => {
      if (!progress || day < 1 || day > 21) return

      const dayIndex = progress.daysProgress.findIndex((dp) => dp.day === day)
      if (dayIndex < 0) return

      const updatedDaysProgress = [...progress.daysProgress]
      updatedDaysProgress[dayIndex] = {
        ...updatedDaysProgress[dayIndex],
        badgeMinted: true,
        mintTx: badge.transactionSignature,
      }

      const totalBadgesMinted = updatedDaysProgress.filter(
        (dp) => dp.badgeMinted
      ).length

      const mintFee = getMintFeeForDay(day)
      const totalSOLSpent = progress.totalSOLSpent + mintFee

      await saveProgress({
        ...progress,
        daysProgress: updatedDaysProgress,
        totalBadgesMinted,
        totalSOLSpent,
      })
    },
    [progress, saveProgress]
  )

  /**
   * Reset all progress
   */
  const resetProgress = useCallback(async () => {
    if (!walletAddress) return

    const newProgress = createEmptyUserProgress(walletAddress)
    await saveProgress(newProgress)
  }, [walletAddress, saveProgress])

  /**
   * Check if a day can be completed today (not already completed today)
   */
  const canCompleteDayToday = useCallback(
    (day: number): boolean => {
      if (!progress) return false

      const dayProgress = progress.daysProgress.find((dp) => dp.day === day)
      if (!dayProgress) return false

      // Already completed = can't complete again (unless we want to allow toggle)
      // For flexibility, users can complete any day at any time
      return !dayProgress.completed
    },
    [progress]
  )

  // Load progress on mount and wallet change
  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  return {
    progress,
    isLoading,
    error,
    getDayProgress,
    navigateToDay,
    completeDay,
    uncompleteDay,
    markBadgeMinted,
    resetProgress,
    canCompleteDayToday,
    refreshProgress: loadProgress,
  }
}

/**
 * Calculate current streak based on completed days
 * Streak = consecutive days from the most recent completion going backwards
 */
function calculateStreak(
  daysProgress: DayProgress[],
  previousLongest: number
): { currentStreak: number; longestStreak: number } {
  // Get all completed days with timestamps
  const completedDays = daysProgress
    .filter((dp) => dp.completed && dp.completedAt)
    .map((dp) => new Date(dp.completedAt!))
    .sort((a, b) => b.getTime() - a.getTime()) // Most recent first

  if (completedDays.length === 0) {
    return { currentStreak: 0, longestStreak: previousLongest }
  }

  // Check if most recent is today or yesterday
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const mostRecent = new Date(completedDays[0])
  mostRecent.setHours(0, 0, 0, 0)

  const daysDiff = Math.floor(
    (today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Streak broken if more than 1 day gap
  if (daysDiff > 1) {
    return { currentStreak: 0, longestStreak: previousLongest }
  }

  // Count consecutive days
  let currentStreak = 1
  for (let i = 1; i < completedDays.length; i++) {
    const current = new Date(completedDays[i - 1])
    const prev = new Date(completedDays[i])
    current.setHours(0, 0, 0, 0)
    prev.setHours(0, 0, 0, 0)

    const diff = Math.floor(
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diff === 1) {
      currentStreak++
    } else if (diff > 1) {
      break
    }
    // If diff === 0, same day, continue checking
  }

  const longestStreak = Math.max(currentStreak, previousLongest)

  return { currentStreak, longestStreak }
}
