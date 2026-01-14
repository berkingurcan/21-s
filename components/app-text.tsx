import { StyleSheet, Text, type TextProps } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'

export type AppTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
}

export function AppText({ style, lightColor, darkColor, type = 'default', ...rest }: AppTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <Text
      style={[
        styles.base,
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#3B82F6',
  },
})
