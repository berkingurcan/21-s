import { Stack } from 'expo-router'
import React from 'react'
import { Colors } from '@/constants/colors'

export default function ChallengesLayout() {
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
        name="[id]"
        options={{
          presentation: 'card',
          headerShown: true,
          headerTitle: 'Challenge',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      />
    </Stack>
  )
}
