import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import React from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'

export function SettingsDebug() {
    const { resetProgress } = useChallenge()
    const colors = Colors.dark

    const handleReset = () => {
        Alert.alert(
            'Reset Progress',
            'Are you sure you want to reset all progress? This cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        await resetProgress()
                        Alert.alert('Success', 'Progress has been reset.')
                    },
                },
            ]
        )
    }

    return (
        <AppView>
            <AppText type="subtitle" style={{ marginBottom: 12 }}>
                Debug
            </AppText>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.error }]}
                onPress={handleReset}
                activeOpacity={0.8}
            >
                <UiIconSymbol name="trash.fill" size={20} color="white" />
                <AppText style={styles.buttonText}>Reset All Progress</AppText>
            </TouchableOpacity>

            <AppText style={[styles.hint, { color: colors.textMuted }]}>
                This will clear all completion data, streaks, and local stats.
            </AppText>
        </AppView>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    hint: {
        fontSize: 13,
        marginTop: 8,
        textAlign: 'center',
    },
})
