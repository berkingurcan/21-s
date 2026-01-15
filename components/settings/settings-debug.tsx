import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { useChallenge } from '@/components/challenge/challenge-provider'
import { useAlert } from '@/components/ui/custom-alert'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export function SettingsDebug() {
    const { resetProgress } = useChallenge()
    const { showAlert } = useAlert()
    const colors = Colors.dark

    const handleReset = () => {
        showAlert({
            title: 'Reset Progress',
            message: 'This will clear all data. Cannot be undone.',
            buttons: [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        await resetProgress()
                        showAlert({
                            title: 'Reset Complete',
                            message: 'All progress has been cleared.',
                        })
                    },
                },
            ],
        })
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
        padding: 14,
        borderRadius: 2,
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 1,
    },
    hint: {
        fontSize: 12,
        marginTop: 12,
        textAlign: 'center',
    },
})
