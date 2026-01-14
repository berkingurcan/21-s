import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { useAuth } from '@/components/auth/auth-provider'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { AppConfig } from '@/constants/app-config'
import { Colors } from '@/constants/colors'
import { router } from 'expo-router'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
  const { signIn, isLoading } = useAuth()
  const colors = Colors.dark

  return (
    <AppView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <AppText style={{ color: colors.textMuted, marginTop: 16 }}>
            Connecting wallet...
          </AppText>
        </View>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          {/* Top spacer */}
          <View />

          {/* Logo & Branding */}
          <View style={styles.brandingContainer}>
            {/* App Icon/Logo */}
            <View style={[styles.logoContainer, { backgroundColor: colors.accentGlow }]}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={{ width: '100%', height: '100%', borderRadius: 30 }}
              />
            </View>

            {/* App Name */}
            <AppText type="title" style={[styles.appName, { color: colors.text }]}>
              {AppConfig.name}
            </AppText>

            {/* Tagline */}
            <AppText style={[styles.tagline, { color: colors.textMuted }]}>
              {AppConfig.description}
            </AppText>

            {/* Features List */}
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <UiIconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                <AppText style={{ color: colors.textMuted }}>21 Progressive Challenges</AppText>
              </View>
              <View style={styles.featureItem}>
                <UiIconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                <AppText style={{ color: colors.textMuted }}>NFT Achievement Badges</AppText>
              </View>
              <View style={styles.featureItem}>
                <UiIconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                <AppText style={{ color: colors.textMuted }}>Track Your Progress</AppText>
              </View>
            </View>
          </View>

          {/* Connect Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[styles.connectButton, { backgroundColor: colors.accent }]}
              activeOpacity={0.8}
              onPress={async () => {
                await signIn()
                router.replace('/')
              }}
            >
              <UiIconSymbol name="wallet.pass.fill" size={22} color="#FFFFFF" />
              <AppText style={styles.connectButtonText}>
                Connect Wallet
              </AppText>
            </TouchableOpacity>

            <AppText style={[styles.disclaimer, { color: colors.textSubtle }]}>
              Connect your Solana wallet to get started
            </AppText>
          </View>
        </SafeAreaView>
      )}
    </AppView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandingContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  featuresList: {
    marginTop: 40,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    borderRadius: 16,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 13,
  },
})
