/**
 * 21-S Challenge App Type Definitions
 * Single 21-Day Challenge with Daily NFT Minting
 */

/**
 * Daily challenge task
 */
export interface DailyChallenge {
  day: number // 1-21
  title: string // Short title for the day
  task: string // Main task description
  tip: string // Helpful tip
  mintFee: number // SOL amount (0.02 - 0.07)
  badge: DailyBadge // NFT info for this day
}

/**
 * Badge/NFT information for a specific day
 */
export interface DailyBadge {
  name: string
  description: string
  image: string // URI or local asset path
}

/**
 * Progress for a single day
 */
export interface DayProgress {
  day: number
  completed: boolean
  completedAt: string | null // ISO date string
  badgeMinted: boolean
  mintTx: string | null // Transaction signature
}

/**
 * User's overall app state
 */
export interface UserProgress {
  walletAddress: string
  currentDay: number // Currently viewing day (1-21)
  daysProgress: DayProgress[]
  totalDaysCompleted: number
  totalBadgesMinted: number
  totalSOLSpent: number
  currentStreak: number
  longestStreak: number
  createdAt: string // ISO date string
  lastActiveAt: string // ISO date string
}

/**
 * Minted NFT badge record
 */
export interface MintedBadge {
  day: number
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
 * Current day state for UI
 */
export interface CurrentDayState {
  challenge: DailyChallenge
  progress: DayProgress
  canCompleteToday: boolean
  canMint: boolean // completed but not minted
}

/**
 * Stats for profile display
 */
export interface UserStats {
  daysCompleted: number
  badgesMinted: number
  totalSOLSpent: number
  currentStreak: number
  longestStreak: number
  completionRate: number // percentage (daysCompleted / 21 * 100)
}
