import { Tabs } from 'expo-router'
import React from 'react'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { Colors } from '@/constants/colors'

export default function TabLayout() {
  const colors = Colors.dark

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
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

      {/* Home - Current challenge progress */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => (
            <UiIconSymbol size={26} name="flame.fill" color={color} />
          ),
        }}
      />

      {/* Challenges - Browse all challenges */}
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color }) => (
            <UiIconSymbol size={26} name="list.bullet.rectangle.fill" color={color} />
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

      {/* Settings - Hidden from tab bar but accessible */}
      <Tabs.Screen
        name="settings"
        options={{
          href: null, // Hide from tab bar
          title: 'Settings',
        }}
      />

      {/* Remove demo tab */}
      <Tabs.Screen
        name="demo"
        options={{
          href: null, // Hide from tab bar
        }}
      />

      {/* Hide old account tab */}
      <Tabs.Screen
        name="account"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  )
}
