import { Stack } from 'expo-router'
import React from 'react'
import { Colors } from '@/constants/colors'

export default function WalletLayout() {
  const colors = Colors.dark

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="send"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Send SOL',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="receive"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Receive SOL',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="airdrop"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Airdrop (Devnet)',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      />
    </Stack>
  )
}
