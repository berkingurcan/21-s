/**
 * Mint Success Modal
 * Beautiful animated modal shown after successfully minting a badge
 */

import { AppText } from '@/components/app-text'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import { DailyChallenge } from '@/types/challenges'
import { LinearGradient } from 'expo-linear-gradient'
import * as Linking from 'expo-linking'
import React, { useEffect, useRef } from 'react'
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

interface MintSuccessModalProps {
    visible: boolean
    onClose: () => void
    challenge: DailyChallenge
    mintAddress: string
    signature: string
    network?: 'devnet' | 'mainnet-beta' | 'testnet'
}

export function MintSuccessModal({
    visible,
    onClose,
    challenge,
    mintAddress,
    signature,
    network = 'devnet',
}: MintSuccessModalProps) {
    const colors = Colors.dark
    const scaleAnim = useRef(new Animated.Value(0)).current
    const rotateAnim = useRef(new Animated.Value(0)).current
    const fadeAnim = useRef(new Animated.Value(0)).current
    const glowAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            // Reset animations
            scaleAnim.setValue(0)
            rotateAnim.setValue(0)
            fadeAnim.setValue(0)
            glowAnim.setValue(0)

            // Entrance animation sequence
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start()

            // Trophy rotation animation
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.elastic(1.5),
                useNativeDriver: true,
            }).start()

            // Glow pulsing animation (loop)
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start()
        }
    }, [visible])

    const handleViewOnExplorer = () => {
        const cluster = network === 'mainnet-beta' ? '' : `?cluster=${network}`
        const url = `https://explorer.solana.com/tx/${signature}${cluster}`
        Linking.openURL(url)
    }

    const handleViewNFT = () => {
        const cluster = network === 'mainnet-beta' ? '' : `?cluster=${network}`
        const url = `https://explorer.solana.com/address/${mintAddress}${cluster}`
        Linking.openURL(url)
    }

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '-15deg', '0deg'],
    })

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 0.9],
    })

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Pressable style={[styles.card, { backgroundColor: colors.surface }]}>
                        {/* Gradient border effect */}
                        <LinearGradient
                            colors={[colors.accent, colors.accentGlow, colors.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBorder}
                        />

                        {/* Content */}
                        <View style={styles.content}>
                            {/* Trophy with glow */}
                            <View style={styles.trophyContainer}>
                                <Animated.View
                                    style={[
                                        styles.trophyGlow,
                                        {
                                            backgroundColor: colors.gold,
                                            opacity: glowOpacity,
                                        },
                                    ]}
                                />
                                <Animated.View style={{ transform: [{ rotate }] }}>
                                    <UiIconSymbol
                                        name="trophy.fill"
                                        size={72}
                                        color={colors.gold}
                                    />
                                </Animated.View>
                            </View>

                            {/* Success message */}
                            <AppText style={[styles.successTitle, { color: colors.success }]}>
                                Badge Minted!
                            </AppText>

                            {/* Badge name */}
                            <AppText style={[styles.badgeName, { color: colors.text }]}>
                                {challenge.badge.name}
                            </AppText>

                            {/* Day badge */}
                            <View style={[styles.dayBadge, { backgroundColor: colors.accentGlow }]}>
                                <AppText style={[styles.dayText, { color: colors.accent }]}>
                                    DAY {challenge.day}
                                </AppText>
                            </View>

                            {/* Description */}
                            <AppText style={[styles.description, { color: colors.textMuted }]}>
                                {challenge.badge.description}
                            </AppText>

                            {/* Mint address preview */}
                            <View style={[styles.addressContainer, { backgroundColor: colors.surfaceAlt }]}>
                                <AppText style={[styles.addressLabel, { color: colors.textSubtle }]}>
                                    NFT ADDRESS
                                </AppText>
                                <AppText style={[styles.address, { color: colors.text }]}>
                                    {mintAddress.slice(0, 8)}...{mintAddress.slice(-8)}
                                </AppText>
                            </View>

                            {/* Action buttons */}
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    onPress={handleViewNFT}
                                    style={[styles.secondaryButton, { backgroundColor: colors.surfaceAlt }]}
                                    activeOpacity={0.8}
                                >
                                    <UiIconSymbol name="eye.fill" size={18} color={colors.accent} />
                                    <AppText style={{ color: colors.accent, fontWeight: '600' }}>
                                        View NFT
                                    </AppText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleViewOnExplorer}
                                    style={[styles.secondaryButton, { backgroundColor: colors.surfaceAlt }]}
                                    activeOpacity={0.8}
                                >
                                    <UiIconSymbol name="arrow.up.right.square" size={18} color={colors.accent} />
                                    <AppText style={{ color: colors.accent, fontWeight: '600' }}>
                                        Explorer
                                    </AppText>
                                </TouchableOpacity>
                            </View>

                            {/* Done button */}
                            <TouchableOpacity
                                onPress={onClose}
                                style={[styles.doneButton, { backgroundColor: colors.accent }]}
                                activeOpacity={0.8}
                            >
                                <AppText style={styles.doneButtonText}>Done</AppText>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Animated.View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
        maxWidth: 340,
    },
    card: {
        borderRadius: 28,
        overflow: 'hidden',
    },
    gradientBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
    },
    content: {
        padding: 28,
        alignItems: 'center',
    },
    trophyContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    trophyGlow: {
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        borderRadius: 60,
        filter: 'blur(20px)',
    },
    successTitle: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 8,
    },
    badgeName: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },
    dayBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 16,
    },
    dayText: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    addressContainer: {
        width: '100%',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    addressLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 4,
    },
    address: {
        fontSize: 13,
        fontFamily: 'monospace',
        fontWeight: '500',
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    doneButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 14,
    },
    doneButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
})
