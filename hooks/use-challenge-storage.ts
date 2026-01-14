/**
 * Challenge Progress Storage Hook
 * Handles persisting and loading challenge progress from AsyncStorage
 */

import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  UserProgress,
  ChallengeProgress,
  ChallengeStatus,
  DayProgress,
  MintedBadge,
} from '@/types/challenges'

const STORAGE_KEY = '@21s_user_progress'

// Initialize empty progress for a challenge
export const createEmptyChallengeProgress = (
  challengeId: number
): ChallengeProgress => ({
  challengeId,
  status: 'locked',
  startedAt: null,
  completedAt: null,
  currentDay: 0,
  daysCompleted: [],
  badgeMinted: false,
  badgeMintTx: null,
})

// Initialize empty user progress
const createEmptyUserProgress = (walletAddress: string): UserProgress => ({
  walletAddress,
  challengeProgress: [],
  totalChallengesCompleted: 0,
  totalDaysCompleted: 0,
  currentStreak: 0,
  longestStreak: 0,
  badges: [],
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
})

export function useChallengeStorage(walletAddress: string | undefined) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Load progress from storage
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

  // Save progress to storage
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

  // Get progress for a specific challenge
  const getChallengeProgress = useCallback(
    (challengeId: number): ChallengeProgress | null => {
      if (!progress) return null
      return (
        progress.challengeProgress.find((cp) => cp.challengeId === challengeId) ||
        null
      )
    },
    [progress]
  )

  // Start a challenge
  const startChallenge = useCallback(
    async (challengeId: number) => {
      if (!progress) return

      const existingIndex = progress.challengeProgress.findIndex(
        (cp) => cp.challengeId === challengeId
      )

      const newChallengeProgress: ChallengeProgress = {
        ...createEmptyChallengeProgress(challengeId),
        status: 'active',
        startedAt: new Date().toISOString(),
        currentDay: 1,
      }

      const updatedChallengeProgress = [...progress.challengeProgress]

      if (existingIndex >= 0) {
        updatedChallengeProgress[existingIndex] = newChallengeProgress
      } else {
        updatedChallengeProgress.push(newChallengeProgress)
      }

      await saveProgress({
        ...progress,
        challengeProgress: updatedChallengeProgress,
      })
    },
    [progress, saveProgress]
  )

  // Complete a day
  const completeDay = useCallback(
    async (challengeId: number, dayNumber: number) => {
      if (!progress) return

      const challengeIndex = progress.challengeProgress.findIndex(
        (cp) => cp.challengeId === challengeId
      )

      if (challengeIndex < 0) return

      const challengeProg = { ...progress.challengeProgress[challengeIndex] }

      // Add day completion
      const dayProgress: DayProgress = {
        day: dayNumber,
        status: 'completed',
        completedAt: new Date().toISOString(),
      }

      // Check if day already completed
      const existingDayIndex = challengeProg.daysCompleted.findIndex(
        (d) => d.day === dayNumber
      )

      if (existingDayIndex >= 0) {
        challengeProg.daysCompleted[existingDayIndex] = dayProgress
      } else {
        challengeProg.daysCompleted = [
          ...challengeProg.daysCompleted,
          dayProgress,
        ]
      }

      // Update current day
      const completedDays = challengeProg.daysCompleted.length
      challengeProg.currentDay = Math.min(completedDays + 1, 21)

      // Check if challenge completed
      if (completedDays >= 21) {
        challengeProg.status = 'completed'
        challengeProg.completedAt = new Date().toISOString()
      }

      const updatedChallengeProgress = [...progress.challengeProgress]
      updatedChallengeProgress[challengeIndex] = challengeProg

      // Update totals
      const totalDaysCompleted = updatedChallengeProgress.reduce(
        (sum, cp) => sum + cp.daysCompleted.length,
        0
      )
      const totalChallengesCompleted = updatedChallengeProgress.filter(
        (cp) => cp.status === 'completed'
      ).length

      // Calculate streak (simplified - consecutive days)
      const currentStreak = calculateStreak(updatedChallengeProgress)
      const longestStreak = Math.max(currentStreak, progress.longestStreak)

      await saveProgress({
        ...progress,
        challengeProgress: updatedChallengeProgress,
        totalDaysCompleted,
        totalChallengesCompleted,
        currentStreak,
        longestStreak,
      })
    },
    [progress, saveProgress]
  )

  // Mark badge as minted
  const markBadgeMinted = useCallback(
    async (challengeId: number, badge: MintedBadge) => {
      if (!progress) return

      const challengeIndex = progress.challengeProgress.findIndex(
        (cp) => cp.challengeId === challengeId
      )

      if (challengeIndex < 0) return

      const updatedChallengeProgress = [...progress.challengeProgress]
      updatedChallengeProgress[challengeIndex] = {
        ...updatedChallengeProgress[challengeIndex],
        badgeMinted: true,
        badgeMintTx: badge.transactionSignature,
      }

      const updatedBadges = [...progress.badges, badge]

      await saveProgress({
        ...progress,
        challengeProgress: updatedChallengeProgress,
        badges: updatedBadges,
      })
    },
    [progress, saveProgress]
  )

  // Unlock a challenge (make it available)
  const unlockChallenge = useCallback(
    async (challengeId: number) => {
      if (!progress) return

      const existingIndex = progress.challengeProgress.findIndex(
        (cp) => cp.challengeId === challengeId
      )

      const updatedChallengeProgress = [...progress.challengeProgress]

      if (existingIndex >= 0) {
        updatedChallengeProgress[existingIndex] = {
          ...updatedChallengeProgress[existingIndex],
          status: 'available',
        }
      } else {
        updatedChallengeProgress.push({
          ...createEmptyChallengeProgress(challengeId),
          status: 'available',
        })
      }

      await saveProgress({
        ...progress,
        challengeProgress: updatedChallengeProgress,
      })
    },
    [progress, saveProgress]
  )

  // Reset progress (for testing/development)
  const resetProgress = useCallback(async () => {
    if (!walletAddress) return

    const newProgress = createEmptyUserProgress(walletAddress)
    await saveProgress(newProgress)
  }, [walletAddress, saveProgress])

  // Load progress on mount and wallet change
  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  return {
    progress,
    isLoading,
    error,
    getChallengeProgress,
    startChallenge,
    completeDay,
    markBadgeMinted,
    unlockChallenge,
    resetProgress,
    refreshProgress: loadProgress,
  }
}

// Helper to calculate current streak
function calculateStreak(challengeProgress: ChallengeProgress[]): number {
  // Get all completed days across all challenges
  const allDays: Date[] = []

  challengeProgress.forEach((cp) => {
    cp.daysCompleted.forEach((day) => {
      if (day.completedAt) {
        allDays.push(new Date(day.completedAt))
      }
    })
  })

  if (allDays.length === 0) return 0

  // Sort by date descending
  allDays.sort((a, b) => b.getTime() - a.getTime())

  // Check if most recent is today or yesterday
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const mostRecent = new Date(allDays[0])
  mostRecent.setHours(0, 0, 0, 0)

  const daysDiff = Math.floor(
    (today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Streak broken if more than 1 day gap
  if (daysDiff > 1) return 0

  // Count consecutive days
  let streak = 1
  for (let i = 1; i < allDays.length; i++) {
    const current = new Date(allDays[i - 1])
    const prev = new Date(allDays[i])
    current.setHours(0, 0, 0, 0)
    prev.setHours(0, 0, 0, 0)

    const diff = Math.floor(
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diff === 1) {
      streak++
    } else if (diff > 1) {
      break
    }
    // If diff === 0, same day, continue checking
  }

  return streak
}
