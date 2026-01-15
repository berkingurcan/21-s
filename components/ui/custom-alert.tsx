/**
 * Custom Alert Modal
 * Sigma aesthetic - minimal, bold, confident
 */

import { AppText } from '@/components/app-text'
import { Colors } from '@/constants/colors'
import React, { createContext, useCallback, useContext, useState } from 'react'
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

interface AlertButton {
  text: string
  onPress?: () => void
  style?: 'default' | 'cancel' | 'destructive'
}

interface AlertConfig {
  title: string
  message?: string
  buttons?: AlertButton[]
}

interface AlertContextType {
  showAlert: (config: AlertConfig) => void
}

const AlertContext = createContext<AlertContextType | null>(null)

export function useAlert() {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider')
  }
  return context
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const colors = Colors.dark
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState<AlertConfig | null>(null)
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current

  const showAlert = useCallback((alertConfig: AlertConfig) => {
    setConfig(alertConfig)
    setVisible(true)
    fadeAnim.setValue(0)
    scaleAnim.setValue(0.95)

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 20,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim])

  const hideAlert = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false)
      setConfig(null)
    })
  }, [fadeAnim])

  const handleButtonPress = useCallback((button: AlertButton) => {
    hideAlert()
    if (button.onPress) {
      setTimeout(button.onPress, 100)
    }
  }, [hideAlert])

  const buttons = config?.buttons || [{ text: 'OK', style: 'default' as const }]

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={hideAlert}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: colors.overlay }]}
          onPress={hideAlert}
        >
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Pressable
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Title */}
              <AppText style={[styles.title, { color: colors.text }]}>
                {config?.title}
              </AppText>

              {/* Message */}
              {config?.message && (
                <AppText style={[styles.message, { color: colors.textMuted }]}>
                  {config.message}
                </AppText>
              )}

              {/* Buttons */}
              <View style={[styles.buttonContainer, { borderTopColor: colors.border }]}>
                {buttons.map((button, index) => {
                  const isDestructive = button.style === 'destructive'
                  const isCancel = button.style === 'cancel'
                  const isPrimary = !isCancel && buttons.length > 1 && index === buttons.length - 1

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleButtonPress(button)}
                      style={[
                        styles.button,
                        buttons.length > 1 && index > 0 && { borderLeftWidth: 1, borderLeftColor: colors.border },
                        isPrimary && { backgroundColor: colors.text },
                      ]}
                      activeOpacity={0.7}
                    >
                      <AppText
                        style={[
                          styles.buttonText,
                          { color: isDestructive ? colors.error : isCancel ? colors.textMuted : colors.text },
                          isPrimary && { color: colors.background },
                        ]}
                      >
                        {button.text.toUpperCase()}
                      </AppText>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </AlertContext.Provider>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  container: {
    width: '100%',
    maxWidth: 300,
  },
  card: {
    borderRadius: 2,
    borderWidth: 1,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
})
