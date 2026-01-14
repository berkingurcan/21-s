import { clusterApiUrl } from '@solana/web3.js'
import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'

export class AppConfig {
  static name = '21-S'
  static description = '21 Days to Social Mastery'
  static uri = 'https://21-s.app' // Update with your actual domain
  static clusters: Cluster[] = [
    {
      id: 'solana:devnet',
      name: 'Devnet',
      endpoint: clusterApiUrl('devnet'),
      network: ClusterNetwork.Devnet,
    },
    {
      id: 'solana:testnet',
      name: 'Testnet',
      endpoint: clusterApiUrl('testnet'),
      network: ClusterNetwork.Testnet,
    },
  ]
}
