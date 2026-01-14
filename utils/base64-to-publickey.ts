/**
 * Utility to convert Base64-encoded wallet addresses to Solana PublicKey
 * 
 * Solana Mobile wallets return addresses in Base64 format, but @solana/web3.js
 * PublicKey expects Base58 format. This function handles the conversion.
 */

import { PublicKey } from '@solana/web3.js'
import { decode as decodeBase64 } from 'js-base64'

/**
 * Converts a Base64-encoded address string to a Solana PublicKey
 * 
 * @param base64Address - The Base64-encoded address from Solana Mobile wallet
 * @returns PublicKey instance or null if conversion fails
 */
export function base64ToPublicKey(base64Address: string): PublicKey | null {
    if (!base64Address) return null

    try {
        // First try to create PublicKey directly (in case it's already Base58)
        return new PublicKey(base64Address)
    } catch {
        // If that fails, try to decode from Base64
        try {
            // Decode Base64 to bytes
            const bytes = Uint8Array.from(decodeBase64(base64Address), c => c.charCodeAt(0))

            // Create PublicKey from the byte array
            return new PublicKey(bytes)
        } catch (error) {
            console.warn('Failed to convert address to PublicKey:', base64Address, error)
            return null
        }
    }
}

/**
 * Safely creates a PublicKey from account address
 * Handles both Base64 (Solana Mobile) and Base58 formats
 * 
 * @param account - The account object from useMobileWallet()
 * @returns PublicKey instance or null if no address or conversion fails
 */
export function getPublicKeyFromAccount(account: { address?: string } | null | undefined): PublicKey | null {
    if (!account?.address) return null
    return base64ToPublicKey(account.address)
}
