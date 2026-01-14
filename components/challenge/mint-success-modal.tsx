/**
 * Mint Success Modal
 * Sigma aesthetic - minimal, bold, confident
 */

import { AppText } from '@/components/app-text'
import { Colors } from '@/constants/colors'
import { DailyChallenge } from '@/types/challenges'
import * as Linking from 'expo-linking'
import React, { useEffect, useRef } from 'react'
import {
    Animated,
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
    const scaleAnim = useRef(new Animated.Value(0.95)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            scaleAnim.setValue(0.95)
            fadeAnim.setValue(0)

            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 200,
                    friction: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start()
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

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={onClose}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Pressable style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {/* Top accent line */}
                        <View style={[styles.accentLine, { backgroundColor: colors.success }]} />

                        {/* Content */}
                        <View style={styles.content}>
                            {/* Success badge */}
                            <View style={[styles.successBadge, { backgroundColor: colors.successMuted }]}>
                                <AppText style={[styles.successText, { color: colors.success }]}>
                                    MINTED
                                </AppText>
                            </View>

                            {/* Day indicator */}
                            <AppText style={[styles.dayIndicator, { color: colors.textSubtle }]}>
                                DAY {String(challenge.day).padStart(2, '0')}
                            </AppText>

                            {/* Badge name */}
                            <AppText style={[styles.badgeName, { color: colors.text }]}>
                                {challenge.badge.name}
                            </AppText>

                            {/* Description */}
                            <AppText style={[styles.description, { color: colors.textMuted }]}>
                                {challenge.badge.description}
                            </AppText>

                            {/* Mint address */}
                            <View style={[styles.addressContainer, { borderColor: colors.border }]}>
                                <AppText style={[styles.addressLabel, { color: colors.textSubtle }]}>
                                    NFT
                                </AppText>
                                <AppText style={[styles.address, { color: colors.textMuted }]}>
                                    {mintAddress.slice(0, 12)}...{mintAddress.slice(-12)}
                                </AppText>
                            </View>

                            {/* Action buttons */}
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    onPress={handleViewNFT}
                                    style={[styles.linkButton, { borderColor: colors.border }]}
                                    activeOpacity={0.7}
                                >
                                    <AppText style={{ color: colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1 }}>
                                        VIEW NFT
                                    </AppText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleViewOnExplorer}
                                    style={[styles.linkButton, { borderColor: colors.border }]}
                                    activeOpacity={0.7}
                                >
                                    <AppText style={{ color: colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1 }}>
                                        EXPLORER
                                    </AppText>
                                </TouchableOpacity>
                            </View>

                            {/* Done button */}
                            <TouchableOpacity
                                onPress={onClose}
                                style={[styles.doneButton, { backgroundColor: colors.text }]}
                                activeOpacity={0.7}
                            >
                                <AppText style={[styles.doneButtonText, { color: colors.background }]}>
                                    CONTINUE
                                </AppText>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    container: {
        width: '100%',
        maxWidth: 320,
    },
    card: {
        borderRadius: 2,
        borderWidth: 1,
        overflow: 'hidden',
    },
    accentLine: {
        height: 2,
    },
    content: {
        padding: 32,
        alignItems: 'center',
    },
    successBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 2,
        marginBottom: 24,
    },
    successText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
    },
    dayIndicator: {
        fontSize: 11,
        letterSpacing: 3,
        marginBottom: 8,
    },
    badgeName: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 24,
    },
    addressContainer: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    addressLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    address: {
        fontSize: 11,
        fontFamily: 'monospace',
    },
    buttons: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
        width: '100%',
    },
    linkButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 2,
        borderWidth: 1,
    },
    doneButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 2,
    },
    doneButtonText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
})
