import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'
import { clusterApiUrl } from '@solana/web3.js'

/**
 * Network configuration from .env file
 * 
 * To change network, update EXPO_PUBLIC_SOLANA_NETWORK in your .env file:
 * - devnet (default)
 * - testnet
 * - mainnet-beta
 */

// Get network from environment variable (defaults to devnet)
const SOLANA_NETWORK = process.env.EXPO_PUBLIC_SOLANA_NETWORK || 'devnet'

// Optional custom RPC URL from environment
const CUSTOM_RPC_URL = process.env.EXPO_PUBLIC_SOLANA_RPC_URL

// Map network string to ClusterNetwork enum
function getClusterNetwork(network: string): ClusterNetwork {
  switch (network) {
    case 'mainnet-beta':
      return ClusterNetwork.Mainnet
    case 'testnet':
      return ClusterNetwork.Testnet
    case 'devnet':
    default:
      return ClusterNetwork.Devnet
  }
}

// Get RPC endpoint - use custom URL if provided, otherwise use default
function getRpcEndpoint(network: string): string {
  if (CUSTOM_RPC_URL) {
    return CUSTOM_RPC_URL
  }

  switch (network) {
    case 'mainnet-beta':
      return clusterApiUrl('mainnet-beta')
    case 'testnet':
      return clusterApiUrl('testnet')
    case 'devnet':
    default:
      return clusterApiUrl('devnet')
  }
}

// Get cluster ID for wallet adapter
function getClusterId(network: string): 'solana:mainnet' | 'solana:devnet' | 'solana:testnet' {
  switch (network) {
    case 'mainnet-beta':
      return 'solana:mainnet'
    case 'testnet':
      return 'solana:testnet'
    case 'devnet':
    default:
      return 'solana:devnet'
  }
}

// Build cluster configuration
function buildCluster(network: string): Cluster {
  return {
    id: getClusterId(network),
    name: network === 'mainnet-beta' ? 'Mainnet' : network.charAt(0).toUpperCase() + network.slice(1),
    endpoint: getRpcEndpoint(network),
    network: getClusterNetwork(network),
  }
}

// Build list of available clusters
function buildClusters(): Cluster[] {
  const currentNetwork = buildCluster(SOLANA_NETWORK)
  const clusters: Cluster[] = [currentNetwork]

  // Add other networks as options (but current is first/default)
  if (SOLANA_NETWORK !== 'devnet') {
    clusters.push(buildCluster('devnet'))
  }
  if (SOLANA_NETWORK !== 'testnet') {
    clusters.push(buildCluster('testnet'))
  }
  if (SOLANA_NETWORK !== 'mainnet-beta') {
    clusters.push(buildCluster('mainnet-beta'))
  }

  return clusters
}

export class AppConfig {
  static name = process.env.EXPO_PUBLIC_APP_NAME || '21-S'
  static description = '21 Days to Social Mastery'
  static uri = process.env.EXPO_PUBLIC_APP_URI || 'https://21-s.app'

  // Current network from .env
  static network = SOLANA_NETWORK

  // All available clusters (current one is first)
  static clusters: Cluster[] = buildClusters()

  // Helper to check if we're on mainnet
  static get isMainnet(): boolean {
    return SOLANA_NETWORK === 'mainnet-beta'
  }

  // Helper to check if we're on devnet
  static get isDevnet(): boolean {
    return SOLANA_NETWORK === 'devnet'
  }
}

