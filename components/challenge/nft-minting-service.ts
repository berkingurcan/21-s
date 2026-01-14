/**
 * NFT Minting Service
 * Creates real NFTs using SPL Token with Metaplex-compatible metadata
 */

import { DailyChallenge } from '@/types/challenges'
import {
    createCreateMasterEditionV3Instruction,
    createCreateMetadataAccountV3Instruction,
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata'
import {
    createAssociatedTokenAccountInstruction,
    createInitializeMintInstruction,
    createMintToInstruction,
    getAssociatedTokenAddress,
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction
} from '@solana/web3.js'

// Treasury wallet address for mint fees
export const TREASURY_WALLET = new PublicKey(
    'd29KQE5Gw3dY6qDEvFvmfp4bCr4kUWZm4EnGojUfiZb'
)

// App symbol for NFT metadata
const APP_SYMBOL = '21S'

export interface NFTMintResult {
    mintAddress: string
    tokenAccount: string
    signature: string
}

export interface NFTMintParams {
    connection: Connection
    payer: PublicKey
    challenge: DailyChallenge
    mintFee: number
}

// Helper to find Metadata PDA
function findMetadataPda(mint: PublicKey): PublicKey {
    const [pda] = PublicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
    )
    return pda
}

// Helper to find Master Edition PDA
function findMasterEditionPda(mint: PublicKey): PublicKey {
    const [pda] = PublicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from('edition'),
        ],
        TOKEN_METADATA_PROGRAM_ID
    )
    return pda
}

/**
 * Build the transaction for minting an NFT badge
 * This creates:
 * 1. A new mint account (the NFT)
 * 2. An associated token account for the user
 * 3. Mints 1 token to the user (making it an NFT)
 * 4. Creates Metaplex Metadata for the mint
 * 5. Creates Master Edition (limiting supply to 1)
 * 6. Transfers the mint fee to treasury
 */
export async function buildNFTMintTransaction({
    connection,
    payer,
    challenge,
    mintFee,
}: NFTMintParams): Promise<{
    transaction: Transaction
    mintKeypair: Keypair
    tokenAccount: PublicKey
    latestBlockhash: { blockhash: string; lastValidBlockHeight: number }
    minContextSlot: number
}> {
    // Generate a new keypair for the NFT mint
    const mintKeypair = Keypair.generate()

    // Get the user's associated token account for this NFT
    const tokenAccount = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        payer
    )

    // Get rent exemption amount for mint
    const lamportsForMint = await getMinimumBalanceForRentExemptMint(connection)

    // Get latest blockhash
    const {
        context: { slot: minContextSlot },
        value: latestBlockhash,
    } = await connection.getLatestBlockhashAndContext()

    // Find PDAs
    const metadataPDA = findMetadataPda(mintKeypair.publicKey)
    const masterEditionPDA = findMasterEditionPda(mintKeypair.publicKey)

    // Build the transaction with all instructions
    const transaction = new Transaction()

    // 1. Create the mint account
    transaction.add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamportsForMint,
            programId: TOKEN_PROGRAM_ID,
        })
    )

    // 2. Initialize the mint (0 decimals for NFT, payer is mint authority)
    transaction.add(
        createInitializeMintInstruction(
            mintKeypair.publicKey,
            0, // 0 decimals for NFT
            payer, // Mint authority
            payer // Freeze authority (needed for Master Edition)
        )
    )

    // 3. Create associated token account for the user
    transaction.add(
        createAssociatedTokenAccountInstruction(
            payer, // Payer
            tokenAccount, // ATA address
            payer, // Owner
            mintKeypair.publicKey // Mint
        )
    )

    // 4. Mint 1 token to the user (making it an NFT)
    transaction.add(
        createMintToInstruction(
            mintKeypair.publicKey, // Mint
            tokenAccount, // Destination
            payer, // Mint authority
            1 // Amount (1 for NFT)
        )
    )

    // 5. Create Metaplex Metadata
    const metadataUri = `https://21-s.app/badges/metadata/day${challenge.day}.json`

    transaction.add(
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataPDA,
                mint: mintKeypair.publicKey,
                mintAuthority: payer,
                payer: payer,
                updateAuthority: payer,
            },
            {
                createMetadataAccountArgsV3: {
                    data: {
                        name: challenge.badge.name,
                        symbol: APP_SYMBOL,
                        uri: metadataUri,
                        sellerFeeBasisPoints: 500, // 5%
                        creators: [
                            {
                                address: TREASURY_WALLET,
                                verified: false,
                                share: 100,
                            },
                        ],
                        collection: null,
                        uses: null,
                    },
                    isMutable: true,
                    collectionDetails: null,
                },
            }
        )
    )

    // 6. Create Master Edition
    transaction.add(
        createCreateMasterEditionV3Instruction(
            {
                edition: masterEditionPDA,
                mint: mintKeypair.publicKey,
                updateAuthority: payer,
                mintAuthority: payer,
                payer: payer,
                metadata: metadataPDA,
                tokenProgram: TOKEN_PROGRAM_ID,
            },
            {
                createMasterEditionArgs: {
                    maxSupply: 0,
                },
            }
        )
    )

    // 7. Transfer mint fee to treasury
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: payer,
            toPubkey: TREASURY_WALLET,
            lamports: Math.floor(mintFee * LAMPORTS_PER_SOL),
        })
    )

    // Set transaction metadata
    transaction.recentBlockhash = latestBlockhash.blockhash
    transaction.feePayer = payer

    // Partially sign with the mint keypair (required for creating the mint account)
    transaction.partialSign(mintKeypair)

    return {
        transaction,
        mintKeypair,
        tokenAccount,
        latestBlockhash,
        minContextSlot,
    }
}

/**
 * Generate Metaplex-compatible metadata for the badge
 * This uses the structure expected by the JSON standard
 */
export function generateBadgeMetadata(
    challenge: DailyChallenge,
    walletAddress: string,
    mintAddress: string
) {
    return {
        name: challenge.badge.name,
        symbol: APP_SYMBOL,
        description: challenge.badge.description,
        image: `https://21-s.app/badges/day${challenge.day}.png`,
        external_url: 'https://21-s.app',
        attributes: [
            { trait_type: 'Day', value: challenge.day.toString() },
            { trait_type: 'Challenge', value: challenge.title },
            { trait_type: 'Mint Fee', value: `${challenge.mintFee} SOL` },
            { trait_type: 'Completed By', value: walletAddress },
            { trait_type: 'Completed Date', value: new Date().toISOString().split('T')[0] },
        ],
        properties: {
            files: [
                {
                    uri: `https://21-s.app/badges/day${challenge.day}.png`,
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
        seller_fee_basis_points: 500, // 5% royalty
    }
}
