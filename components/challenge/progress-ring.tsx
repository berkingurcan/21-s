/**
 * Progress Ring Component
 * Circular progress indicator for challenge progress
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'
import { AppText } from '@/components/app-text'
import { Colors } from '@/constants/colors'

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
}: ProgressRingProps) {
  const colors = Colors.dark
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.border}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progress >= 100 ? colors.success : colors.accent}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>

      {/* Center Content */}
      <View style={styles.centerContent}>
        {label && (
          <AppText style={[styles.label, { color: colors.text }]}>
            {label}
          </AppText>
        )}
        {sublabel && (
          <AppText style={[styles.sublabel, { color: colors.textMuted }]}>
            {sublabel}
          </AppText>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
  },
  label: {
    fontSize: 28,
    fontWeight: '800',
  },
  sublabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
})
