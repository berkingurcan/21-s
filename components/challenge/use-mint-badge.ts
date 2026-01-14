/**
 * Badge Minting Hook
 * Handles real NFT minting for daily challenge badges
 */

import { useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import { getDayChallenge, getMintFeeForDay } from '@/constants/challenges'
import { BadgeMetadata, MintedBadge } from '@/types/challenges'
import { PublicKey, TransactionSignature } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { buildNFTMintTransaction, generateBadgeMetadata, TREASURY_WALLET } from './nft-minting-service'

export { TREASURY_WALLET }

export interface MintBadgeInput {
  day: number
}

export interface MintBadgeResult {
  badge: MintedBadge
  signature: TransactionSignature
  mintAddress: string
}

export function useMintBadge({ address }: { address: PublicKey }) {
  const { connection, signAndSendTransaction } = useMobileWallet()
  const invalidateBalance = useGetBalanceInvalidate({ address })

  return useMutation({
    mutationKey: ['mint-badge', { endpoint: connection.rpcEndpoint, address }],
    mutationFn: async (input: MintBadgeInput): Promise<MintBadgeResult> => {
      const challenge = getDayChallenge(input.day)

      if (!challenge) {
        throw new Error(`Day ${input.day} challenge not found`)
      }

      const mintFee = getMintFeeForDay(input.day)

      // Build the NFT mint transaction
      const { transaction, mintKeypair, tokenAccount, latestBlockhash, minContextSlot } =
        await buildNFTMintTransaction({
          connection,
          payer: address,
          challenge,
          mintFee,
        })

      // Sign and send the transaction (wallet will prompt user)
      const signature = await signAndSendTransaction(transaction, minContextSlot)

      // Confirm the transaction
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      )

      // Generate badge metadata
      const metadata = generateBadgeMetadata(
        challenge,
        address.toBase58(),
        mintKeypair.publicKey.toBase58()
      ) as BadgeMetadata

      // Create badge record
      const badge: MintedBadge = {
        day: input.day,
        mintAddress: mintKeypair.publicKey.toBase58(),
        transactionSignature: signature,
        mintedAt: new Date().toISOString(),
        metadata,
      }

      return { badge, signature, mintAddress: mintKeypair.publicKey.toBase58() }
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
  estimatedTxFee: number = 0.01 // ~0.01 SOL for NFT mint transaction fees
): boolean {
  return balance >= mintFee + estimatedTxFee
}

// Format mint fee for display
export function formatMintFee(mintFee: number): string {
  return `${mintFee.toFixed(4)} SOL`
}
