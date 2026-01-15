/**
 * Info Modal Component
 * Sigma aesthetic - minimal, bold, confident
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
  number: string
  title: string
  description: string
}

function InfoSection({ number, title, description }: InfoSectionProps) {
  const colors = Colors.dark

  return (
    <View style={[styles.section, { borderLeftColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <AppText style={[styles.sectionNumber, { color: colors.textSubtle }]}>
          {number}
        </AppText>
        <AppText style={[styles.sectionTitle, { color: colors.text }]}>
          {title}
        </AppText>
      </View>
      <AppText style={[styles.sectionDescription, { color: colors.textMuted }]}>
        {description}
      </AppText>
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
        <Pressable style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={onClose} />

        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
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
            <View>
              <AppText style={[styles.headerLabel, { color: colors.textSubtle }]}>
                ABOUT
              </AppText>
              <AppText style={[styles.headerTitle, { color: colors.text }]}>
                21-S Challenge
              </AppText>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { borderColor: colors.border }]}
            >
              <UiIconSymbol name="xmark" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero Message */}
            <View style={[styles.heroCard, { borderColor: colors.border }]}>
              <AppText style={[styles.heroText, { color: colors.textMuted }]}>
                21 days. One commitment. Transform your social confidence through
                progressive daily challenges. No shortcuts. No excuses.
              </AppText>
            </View>

            {/* The Purpose */}
            <InfoSection
              number="01"
              title="PURPOSE"
              description="A structured program to systematically desensitize social anxiety. Rewire your brain to see interactions as opportunities."
            />

            {/* How It Works */}
            <InfoSection
              number="02"
              title="METHOD"
              description="Three weeks. Three phases. Foundation → Building → Mastery. Each day builds on the last. No skipping."
            />

            {/* The Commitment */}
            <InfoSection
              number="03"
              title="COMMITMENT"
              description="Complete the challenge. Mark done. Mint your NFT badge as permanent proof of progress on the blockchain."
            />

            {/* The Psychology */}
            <InfoSection
              number="04"
              title="PSYCHOLOGY"
              description="Comfort zones expand through deliberate discomfort. Each challenge pushes just beyond your edge."
            />

            {/* The Reward */}
            <InfoSection
              number="05"
              title="REWARD"
              description="Proof to yourself that you can do hard things. In 21 days, approaching strangers becomes second nature."
            />

            {/* Footer Quote */}
            <View style={[styles.footer, { borderTopColor: colors.border }]}>
              <AppText style={[styles.footerQuote, { color: colors.textSubtle }]}>
                "Discipline is the bridge between goals and accomplishment."
              </AppText>
            </View>

            {/* Start Button */}
            <TouchableOpacity
              onPress={onClose}
              style={[styles.startButton, { backgroundColor: colors.text }]}
              activeOpacity={0.7}
            >
              <AppText style={[styles.startButtonText, { color: colors.background }]}>
                CLOSE
              </AppText>
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
  },
  sheet: {
    maxHeight: SCREEN_HEIGHT * 0.85,
    minHeight: SCREEN_HEIGHT * 0.5,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderTopWidth: 1,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  handle: {
    width: 32,
    height: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 2,
    borderWidth: 1,
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
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  heroText: {
    fontSize: 14,
    lineHeight: 22,
  },
  section: {
    paddingLeft: 16,
    borderLeftWidth: 2,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionNumber: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 4,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerQuote: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 2,
    marginTop: 4,
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
})
