import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'

export default function TabLayout() {
  const colors = Colors.dark
  const insets = useSafeAreaInsets()

  // Calculate proper bottom padding for Android navigation
  const tabBarHeight = Platform.select({
    ios: 85,
    android: 70 + insets.bottom,
    default: 70,
  })

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'android' ? insets.bottom + 8 : 8,
          height: tabBarHeight,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      {/* Hidden index that redirects */}
      <Tabs.Screen
        name="index"
        options={{ tabBarItemStyle: { display: 'none' } }}
      />

      {/* Home - Current challenge progress (main screen) */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => (
            <UiIconSymbol size={26} name="flame.fill" color={color} />
          ),
        }}
      />

      {/* Profile - Stats and badges */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <UiIconSymbol size={26} name="person.crop.circle.fill" color={color} />
          ),
        }}
      />

      {/* Wallet - Account management */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <UiIconSymbol size={26} name="wallet.pass.fill" color={color} />
          ),
        }}
      />

      {/* Hide old tabs */}
      <Tabs.Screen name="challenges" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="demo" options={{ href: null }} />
      <Tabs.Screen name="account" options={{ href: null }} />
    </Tabs>
  )
}
