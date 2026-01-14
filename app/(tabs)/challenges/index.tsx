/**
 * Challenges Screen
 * Browse and select challenges by tier
 */

import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { AppPage } from '@/components/app-page'
import { AppText } from '@/components/app-text'
import { Colors, TierColors } from '@/constants/colors'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { ChallengeCard } from '@/components/challenge/challenge-card'
import { ChallengeTier } from '@/types/challenges'
import { getChallengesByTier } from '@/constants/challenges'

const TIERS: ChallengeTier[] = ['beginner', 'intermediate', 'advanced', 'master']

const TIER_INFO: Record<ChallengeTier, { label: string; description: string }> = {
  beginner: {
    label: 'Beginner',
    description: 'Foundation building - 0.02 SOL/badge',
  },
  intermediate: {
    label: 'Intermediate',
    description: 'Skill development - 0.03-0.04 SOL/badge',
  },
  advanced: {
    label: 'Advanced',
    description: 'Advanced techniques - 0.05-0.06 SOL/badge',
  },
  master: {
    label: 'Master',
    description: 'Complete mastery - 0.07 SOL/badge',
  },
}

export default function ChallengesScreen() {
  const router = useRouter()
  const colors = Colors.dark
  const {
    challenges,
    getChallengeStatus,
    getChallengeProgress,
    startChallenge,
    activeChallenge,
    isLoading,
    refreshProgress,
  } = useChallenge()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTier, setSelectedTier] = useState<ChallengeTier | 'all'>('all')

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshProgress()
    setIsRefreshing(false)
  }

  const handleChallengePress = (challengeId: number) => {
    router.push(`/(tabs)/challenges/${challengeId}`)
  }

  const filteredChallenges =
    selectedTier === 'all' ? challenges : getChallengesByTier(selectedTier)

  return (
    <AppPage>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <AppText type="title" style={{ color: colors.text }}>
            Challenges
          </AppText>
          <AppText style={[styles.subtitle, { color: colors.textMuted }]}>
            21 progressive challenges to master social skills
          </AppText>
        </View>

        {/* Tier Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity
            onPress={() => setSelectedTier('all')}
            style={[
              styles.filterChip,
              {
                backgroundColor:
                  selectedTier === 'all' ? colors.accent : colors.surface,
                borderColor:
                  selectedTier === 'all' ? colors.accent : colors.border,
              },
            ]}
          >
            <AppText
              style={[
                styles.filterText,
                {
                  color: selectedTier === 'all' ? '#FFFFFF' : colors.textMuted,
                },
              ]}
            >
              All ({challenges.length})
            </AppText>
          </TouchableOpacity>

          {TIERS.map((tier) => {
            const tierChallenges = getChallengesByTier(tier)
            const isSelected = selectedTier === tier

            return (
              <TouchableOpacity
                key={tier}
                onPress={() => setSelectedTier(tier)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isSelected
                      ? TierColors[tier]
                      : colors.surface,
                    borderColor: isSelected ? TierColors[tier] : colors.border,
                  },
                ]}
              >
                <AppText
                  style={[
                    styles.filterText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.textMuted,
                    },
                  ]}
                >
                  {TIER_INFO[tier].label} ({tierChallenges.length})
                </AppText>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Active Challenge Banner */}
        {activeChallenge && (
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/home')}
            style={[
              styles.activeBanner,
              {
                backgroundColor: colors.accentGlow,
                borderColor: colors.accent,
              },
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.activeBannerContent}>
              <AppText style={[styles.activeLabel, { color: colors.accent }]}>
                ACTIVE CHALLENGE
              </AppText>
              <AppText
                type="defaultSemiBold"
                style={{ color: colors.text }}
              >
                {activeChallenge.challenge.title}
              </AppText>
              <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                Day {activeChallenge.progress.daysCompleted.length + 1} of 21
              </AppText>
            </View>
            <View
              style={[
                styles.activeBadge,
                { backgroundColor: colors.accent },
              ]}
            >
              <AppText style={styles.activeBadgeText}>
                {activeChallenge.progressPercentage}%
              </AppText>
            </View>
          </TouchableOpacity>
        )}

        {/* Tier Sections */}
        {selectedTier === 'all' ? (
          // Show all tiers with headers
          TIERS.map((tier) => {
            const tierChallenges = getChallengesByTier(tier)

            return (
              <View key={tier} style={styles.tierSection}>
                <View style={styles.tierHeader}>
                  <View
                    style={[
                      styles.tierBadge,
                      { backgroundColor: TierColors[tier] + '20' },
                    ]}
                  >
                    <AppText
                      style={[styles.tierLabel, { color: TierColors[tier] }]}
                    >
                      {TIER_INFO[tier].label.toUpperCase()}
                    </AppText>
                  </View>
                  <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                    {TIER_INFO[tier].description}
                  </AppText>
                </View>

                {tierChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    progress={getChallengeProgress(challenge.id)}
                    status={getChallengeStatus(challenge.id)}
                    onPress={() => handleChallengePress(challenge.id)}
                  />
                ))}
              </View>
            )
          })
        ) : (
          // Show filtered challenges
          <View style={styles.challengeList}>
            <View style={styles.tierHeader}>
              <AppText style={{ color: colors.textMuted, fontSize: 13 }}>
                {TIER_INFO[selectedTier].description}
              </AppText>
            </View>

            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                progress={getChallengeProgress(challenge.id)}
                status={getChallengeStatus(challenge.id)}
                onPress={() => handleChallengePress(challenge.id)}
              />
            ))}
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </AppPage>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 6,
    lineHeight: 22,
  },
  filterContainer: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  activeBannerContent: {
    flex: 1,
  },
  activeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  activeBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  tierSection: {
    marginBottom: 24,
  },
  tierHeader: {
    marginBottom: 12,
    gap: 8,
  },
  tierBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tierLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  challengeList: {
    marginTop: 8,
  },
})
