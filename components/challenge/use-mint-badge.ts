/**
 * Badge Minting Hook
 * Handles the mint fee payment for challenge badges
 *
 * For production, integrate with Metaplex or compressed NFTs
 * Currently: Processes mint fee payment to treasury
 */

import { createTransaction } from '@/components/account/create-transaction'
import { useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import { getChallengeById } from '@/constants/challenges'
import { BadgeMetadata, Challenge, MintedBadge } from '@/types/challenges'
import { PublicKey, TransactionSignature } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'

// Treasury wallet address - replace with your actual wallet
// This is where mint fees are collected
export const TREASURY_WALLET = new PublicKey(
  // TODO: Replace with actual treasury wallet
  'd29KQE5Gw3dY6qDEvFvmfp4bCr4kUWZm4EnGojUfiZb' // Example devnet wallet
)

// App symbol for NFT metadata
const APP_SYMBOL = '21S'

// Generate badge metadata (Metaplex standard)
function generateBadgeMetadata(
  challenge: Challenge,
  walletAddress: string
): BadgeMetadata {
  return {
    name: challenge.badge.name,
    symbol: APP_SYMBOL,
    description: challenge.badge.description,
    image: `https://21-s.app/badges/${challenge.badge.image}.png`, // Placeholder
    attributes: [
      { trait_type: 'Challenge', value: challenge.title },
      { trait_type: 'Tier', value: challenge.tier },
      { trait_type: 'Level', value: challenge.id },
      { trait_type: 'Rarity', value: challenge.badge.rarity },
      { trait_type: 'Mint Fee', value: `${challenge.mintFee} SOL` },
      { trait_type: 'Completed By', value: walletAddress },
      { trait_type: 'Completed Date', value: new Date().toISOString().split('T')[0] },
    ],
    properties: {
      files: [
        {
          uri: `https://21-s.app/badges/${challenge.badge.image}.png`,
          type: 'image/png',
        },
      ],
      category: 'image',
      creators: [
        {
          address: TREASURY_WALLET.toBase58(),
          share: 100,
        },
      ],
    },
  }
}

export interface MintBadgeInput {
  challengeId: number
}

export interface MintBadgeResult {
  badge: MintedBadge
  signature: TransactionSignature
}

export function useMintBadge({ address }: { address: PublicKey }) {
  const { connection, signAndSendTransaction } = useMobileWallet()
  const invalidateBalance = useGetBalanceInvalidate({ address })

  return useMutation({
    mutationKey: ['mint-badge', { endpoint: connection.rpcEndpoint, address }],
    mutationFn: async (input: MintBadgeInput): Promise<MintBadgeResult> => {
      const challenge = getChallengeById(input.challengeId)

      if (!challenge) {
        throw new Error(`Challenge ${input.challengeId} not found`)
      }

      // Create transaction to pay mint fee to treasury
      const { transaction, latestBlockhash, minContextSlot } =
        await createTransaction({
          publicKey: address,
          destination: TREASURY_WALLET,
          amount: challenge.mintFee,
          connection,
        })

      // Sign and send the transaction
      const signature = await signAndSendTransaction(transaction, minContextSlot)

      // Confirm the transaction
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      )

      // Generate badge metadata
      const metadata = generateBadgeMetadata(challenge, address.toBase58())

      // Create badge record
      const badge: MintedBadge = {
        challengeId: input.challengeId,
        mintAddress: `badge_${input.challengeId}_${Date.now()}`, // Placeholder - would be actual NFT mint address
        transactionSignature: signature,
        mintedAt: new Date().toISOString(),
        metadata,
      }

      return { badge, signature }
    },
    onSuccess: async () => {
      await invalidateBalance()
    },
    onError: (error) => {
      console.error(`Badge mint failed: ${error}`)
    },
  })
}

// Helper to check if user can afford to mint
export function canAffordMint(
  balance: number,
  mintFee: number,
  estimatedTxFee: number = 0.001 // ~0.001 SOL for transaction fees
): boolean {
  return balance >= mintFee + estimatedTxFee
}

// Format mint fee for display
export function formatMintFee(mintFee: number): string {
  return `${mintFee.toFixed(3)} SOL`
}
