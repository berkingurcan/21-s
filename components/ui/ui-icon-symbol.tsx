// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolViewProps } from 'expo-symbols'
import { ComponentProps } from 'react'
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native'

type UiIconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>
export type UiIconSymbolName = keyof typeof MAPPING

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navigation & UI
  'gearshape.fill': 'settings',
  'wallet.pass.fill': 'account-balance-wallet',
  'ladybug.fill': 'bug-report',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'arrow.uturn.backward': 'undo',
  'play.fill': 'play-arrow',

  // Tab bar icons
  'flame.fill': 'local-fire-department',
  'calendar': 'calendar-today',
  'person.crop.circle.fill': 'account-circle',

  // Status icons
  'checkmark.circle.fill': 'check-circle',
  'trophy.fill': 'emoji-events',
  'lightbulb.fill': 'lightbulb',
  'lock.fill': 'lock',

  // Content icons
  'list.bullet.rectangle.fill': 'list-alt',
  'clock.fill': 'access-time',
} as UiIconMapping

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function UiIconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: UiIconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />
}
