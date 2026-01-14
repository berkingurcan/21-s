/**
 * 21-S Challenge App Type Definitions
 */

// Challenge difficulty tiers
export type ChallengeTier = 'beginner' | 'intermediate' | 'advanced' | 'master'

// Badge rarity levels
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

// Challenge status
export type ChallengeStatus = 'locked' | 'available' | 'active' | 'completed'

// Day completion status
export type DayStatus = 'pending' | 'completed' | 'missed'

/**
 * Challenge definition from JSON
 */
export interface Challenge {
  id: number
  title: string
  description: string
  tier: ChallengeTier
  mintFee: number // SOL amount (0.02 - 0.07)
  days: ChallengeDay[]
  badge: BadgeInfo
  requiredChallengeId: number | null // Previous challenge that must be completed
}

/**
 * Individual day task within a challenge
 */
export interface ChallengeDay {
  day: number
  task: string
  tip: string
}

/**
 * Badge/NFT information
 */
export interface BadgeInfo {
  name: string
  description: string
  rarity: BadgeRarity
  image: string // URI or local asset path
}

/**
 * User's progress on a specific challenge
 */
export interface ChallengeProgress {
  challengeId: number
  status: ChallengeStatus
  startedAt: string | null // ISO date string
  completedAt: string | null // ISO date string
  currentDay: number // 0-21
  daysCompleted: DayProgress[]
  badgeMinted: boolean
  badgeMintTx: string | null // Transaction signature
}

/**
 * Progress for a single day
 */
export interface DayProgress {
  day: number
  status: DayStatus
  completedAt: string | null // ISO date string
}

/**
 * User's overall app state
 */
export interface UserProgress {
  walletAddress: string
  challengeProgress: ChallengeProgress[]
  totalChallengesCompleted: number
  totalDaysCompleted: number
  currentStreak: number
  longestStreak: number
  badges: MintedBadge[]
  createdAt: string // ISO date string
  lastActiveAt: string // ISO date string
}

/**
 * Minted NFT badge record
 */
export interface MintedBadge {
  challengeId: number
  mintAddress: string // NFT mint address
  transactionSignature: string
  mintedAt: string // ISO date string
  metadata: BadgeMetadata
}

/**
 * NFT badge metadata (Metaplex standard)
 */
export interface BadgeMetadata {
  name: string
  symbol: string
  description: string
  image: string
  attributes: BadgeAttribute[]
  properties: {
    files: { uri: string; type: string }[]
    category: string
    creators: { address: string; share: number }[]
  }
}

/**
 * Badge attribute for NFT metadata
 */
export interface BadgeAttribute {
  trait_type: string
  value: string | number
}

/**
 * Active challenge state for UI
 */
export interface ActiveChallengeState {
  challenge: Challenge
  progress: ChallengeProgress
  todayTask: ChallengeDay | null
  daysRemaining: number
  progressPercentage: number
  canCompleteToday: boolean
}

/**
 * Challenge filter/sort options
 */
export interface ChallengeFilters {
  tier?: ChallengeTier
  status?: ChallengeStatus
  sortBy?: 'id' | 'tier' | 'mintFee'
}

/**
 * Stats for profile display
 */
export interface UserStats {
  challengesCompleted: number
  challengesInProgress: number
  totalDaysCompleted: number
  currentStreak: number
  longestStreak: number
  totalSOLSpent: number
  badgesCollected: number
  completionRate: number // percentage
}
