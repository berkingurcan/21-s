/**
 * Wallet Screen
 * Shows balance, tokens, and wallet actions
 */

import { useGetBalance, useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import { useGetTokenAccounts, useGetTokenAccountsInvalidate } from '@/components/account/use-get-token-accounts'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { ClusterNetwork } from '@/components/cluster/cluster-network'
import { useCluster } from '@/components/cluster/cluster-provider'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import { getPublicKeyFromAccount } from '@/utils/base64-to-publickey'
import { ellipsify } from '@/utils/ellipsify'
import { lamportsToSol } from '@/utils/lamports-to-sol'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function WalletScreen() {
  const router = useRouter()
  const colors = Colors.dark
  const { account } = useMobileWallet()
  const { selectedCluster } = useCluster()

  // Safely create PublicKey from address (handles Base64 from Solana Mobile)
  const address = React.useMemo(() => {
    return getPublicKeyFromAccount(account)
  }, [account?.address])
  const { data: balance, isLoading: balanceLoading } = useGetBalance({
    address: address!,
  })
  const { data: tokenAccounts } = useGetTokenAccounts({ address: address! })

  const invalidateBalance = useGetBalanceInvalidate({ address: address! })
  const invalidateTokenAccounts = useGetTokenAccountsInvalidate({
    address: address!,
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([invalidateBalance(), invalidateTokenAccounts()])
    setRefreshing(false)
  }, [invalidateBalance, invalidateTokenAccounts])

  const isDevnet = selectedCluster.network === ClusterNetwork.Devnet

  return (
    <AppPage>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {/* Header */}
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/home')}
              style={[styles.backButton, { backgroundColor: colors.surface }]}
            >
              <UiIconSymbol name="chevron.left" size={20} color={colors.text} />
            </TouchableOpacity>
            <AppText type="title" style={{ color: colors.text }}>
              Wallet
            </AppText>
          </View>
          <View style={[styles.networkBadge, { backgroundColor: colors.surface }]}>
            <View
              style={[
                styles.networkDot,
                {
                  backgroundColor: isDevnet ? colors.warning : colors.success,
                },
              ]}
            />
            <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
              {selectedCluster.name}
            </AppText>
          </View>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: colors.surface }]}>
          <AppText style={[styles.balanceLabel, { color: colors.textMuted }]}>
            BALANCE
          </AppText>
          <View style={styles.balanceRow}>
            <AppText style={[styles.balanceValue, { color: colors.text }]}>
              {balanceLoading
                ? '...'
                : balance !== undefined
                  ? lamportsToSol(balance).toFixed(4)
                  : '0.0000'}
            </AppText>
            <AppText style={[styles.balanceCurrency, { color: colors.accent }]}>
              SOL
            </AppText>
          </View>
          <AppText style={[styles.walletAddress, { color: colors.textSubtle }]}>
            {account?.address ? ellipsify(account.address, 10) : 'Not connected'}
          </AppText>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/wallet/send')}
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            activeOpacity={0.7}
          >
            <View
              style={[styles.actionIcon, { backgroundColor: colors.accentGlow }]}
            >
              <UiIconSymbol
                name="arrow.up.circle.fill"
                size={28}
                color={colors.accent}
              />
            </View>
            <AppText style={[styles.actionLabel, { color: colors.text }]}>
              Send
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/wallet/receive')}
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            activeOpacity={0.7}
          >
            <View
              style={[styles.actionIcon, { backgroundColor: colors.successMuted }]}
            >
              <UiIconSymbol
                name="arrow.down.circle.fill"
                size={28}
                color={colors.success}
              />
            </View>
            <AppText style={[styles.actionLabel, { color: colors.text }]}>
              Receive
            </AppText>
          </TouchableOpacity>

          {isDevnet && (
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/wallet/airdrop')}
              style={[styles.actionButton, { backgroundColor: colors.surface }]}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: colors.warningMuted },
                ]}
              >
                <UiIconSymbol
                  name="drop.fill"
                  size={28}
                  color={colors.warning}
                />
              </View>
              <AppText style={[styles.actionLabel, { color: colors.text }]}>
                Airdrop
              </AppText>
            </TouchableOpacity>
          )}
        </View>

        {/* Token Accounts */}
        <View style={styles.section}>
          <AppText type="subtitle" style={{ color: colors.text }}>
            Tokens
          </AppText>

          {tokenAccounts && tokenAccounts.length > 0 ? (
            <View style={styles.tokensList}>
              {tokenAccounts.map((token, index) => (
                <View
                  key={index}
                  style={[styles.tokenCard, { backgroundColor: colors.surface }]}
                >
                  <View style={styles.tokenIcon}>
                    <UiIconSymbol
                      name="circle.fill"
                      size={32}
                      color={colors.accent}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText style={{ color: colors.text, fontWeight: '600' }}>
                      {ellipsify(token.account.data.parsed.info.mint, 8)}
                    </AppText>
                    <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                      Token Account
                    </AppText>
                  </View>
                  <AppText style={{ color: colors.text, fontWeight: '700' }}>
                    {token.account.data.parsed.info.tokenAmount.uiAmountString}
                  </AppText>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={[styles.emptyTokens, { backgroundColor: colors.surface }]}
            >
              <UiIconSymbol
                name="circle.dashed"
                size={40}
                color={colors.textSubtle}
              />
              <AppText style={{ color: colors.textMuted, marginTop: 12 }}>
                No tokens found
              </AppText>
              <AppText style={{ color: colors.textSubtle, fontSize: 13 }}>
                Token accounts will appear here
              </AppText>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </AppPage>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 10,
    borderRadius: 12,
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  networkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  balanceCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 8,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: '800',
  },
  balanceCurrency: {
    fontSize: 20,
    fontWeight: '700',
  },
  walletAddress: {
    fontSize: 14,
    marginTop: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 10,
  },
  actionIcon: {
    padding: 10,
    borderRadius: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  tokensList: {
    marginTop: 12,
    gap: 8,
  },
  tokenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    gap: 14,
  },
  tokenIcon: {},
  emptyTokens: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 16,
    marginTop: 12,
  },
})
