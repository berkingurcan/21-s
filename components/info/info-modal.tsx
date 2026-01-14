/**
 * Info Modal Component
 * Bottom sheet modal explaining the app's purpose and how to use it
 * Personal development motivation vibe
 */

import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import React from 'react'
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

interface InfoModalProps {
  visible: boolean
  onClose: () => void
}

interface InfoSectionProps {
  icon: string
  title: string
  description: string
}

function InfoSection({ icon, title, description }: InfoSectionProps) {
  const colors = Colors.dark

  return (
    <View style={[styles.section, { backgroundColor: colors.surfaceAlt }]}>
      <View style={[styles.sectionIcon, { backgroundColor: colors.accentGlow }]}>
        <UiIconSymbol name={icon as any} size={24} color={colors.accent} />
      </View>
      <View style={styles.sectionContent}>
        <AppText style={[styles.sectionTitle, { color: colors.text }]}>
          {title}
        </AppText>
        <AppText style={[styles.sectionDescription, { color: colors.textMuted }]}>
          {description}
        </AppText>
      </View>
    </View>
  )
}

export function InfoModal({ visible, onClose }: InfoModalProps) {
  const colors = Colors.dark
  const insets = useSafeAreaInsets()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={onClose} />

        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              paddingBottom: insets.bottom + 20,
            },
          ]}
        >
          {/* Handle bar */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <View style={[styles.headerIcon, { backgroundColor: colors.accentGlow }]}>
                <UiIconSymbol name="sparkles" size={28} color={colors.accent} />
              </View>
              <View>
                <AppText style={[styles.headerTitle, { color: colors.text }]}>
                  21-S Challenge
                </AppText>
                <AppText style={[styles.headerSubtitle, { color: colors.textMuted }]}>
                  Transform Your Social Confidence
                </AppText>
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: colors.surfaceAlt }]}
            >
              <UiIconSymbol name="xmark" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero Message */}
            <View style={[styles.heroCard, { backgroundColor: colors.accentGlow }]}>
              <AppText style={[styles.heroText, { color: colors.text }]}>
                This is not just an app. This is your 21-day commitment to becoming
                the version of yourself you've always envisioned. Every day, one small
                step. Every step, unstoppable momentum.
              </AppText>
            </View>

            {/* The Purpose */}
            <InfoSection
              icon="target"
              title="The Purpose"
              description="21-S is a structured social confidence program designed to systematically desensitize you to social anxiety. Through progressive daily challenges, you'll rewire your brain to see social interactions as opportunities, not threats."
            />

            {/* How It Works */}
            <InfoSection
              icon="arrow.triangle.branch"
              title="The Method"
              description="Three weeks. Three phases. Foundation builds your comfort zone. Building expands your boundaries. Mastery makes confidence your default state. Each day builds on the last - no skipping, no shortcuts."
            />

            {/* The Commitment */}
            <InfoSection
              icon="flame.fill"
              title="The Commitment"
              description="Complete the daily challenge. Mark it done. Mint your badge as proof of your progress. Each NFT badge is a permanent record of your transformation on the blockchain - a trophy you earned through action."
            />

            {/* The Psychology */}
            <InfoSection
              icon="brain.head.profile"
              title="The Psychology"
              description="Comfort zones only expand through deliberate discomfort. Each challenge is calibrated to push you just beyond your current edge - enough to grow, not enough to overwhelm. Trust the process."
            />

            {/* The Reward */}
            <InfoSection
              icon="star.fill"
              title="The Reward"
              description="Beyond the badges, you gain something invaluable: proof to yourself that you can do hard things. In 21 days, approaching strangers won't be a challenge - it'll be second nature."
            />

            {/* Motivational Footer */}
            <View style={[styles.footer, { borderTopColor: colors.border }]}>
              <AppText style={[styles.footerQuote, { color: colors.accent }]}>
                "Discipline is the bridge between goals and accomplishment."
              </AppText>
              <AppText style={[styles.footerText, { color: colors.textSubtle }]}>
                Your journey starts with Day 1. No excuses. No delays.{'\n'}
                Just you, becoming unstoppable.
              </AppText>
            </View>

            {/* Start Button */}
            <TouchableOpacity
              onPress={onClose}
              style={[styles.startButton, { backgroundColor: colors.accent }]}
              activeOpacity={0.8}
            >
              <AppText style={styles.startButtonText}>Begin Your Journey</AppText>
              <UiIconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sheet: {
    maxHeight: SCREEN_HEIGHT * 0.85,
    minHeight: SCREEN_HEIGHT * 0.5,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  heroCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  heroText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  section: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 14,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    paddingTop: 24,
    paddingBottom: 20,
    marginTop: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerQuote: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
})
