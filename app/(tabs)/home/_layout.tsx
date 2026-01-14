import { Stack } from 'expo-router'
import React from 'react'
import { Colors } from '@/constants/colors'

export default function HomeLayout() {
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
        name="challenge-detail"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Challenge Details',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      />
    </Stack>
  )
}
