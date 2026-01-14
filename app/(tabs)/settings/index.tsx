import { AppText } from '@/components/app-text'
import { SettingsAppConfig } from '@/components/settings/settings-app-config'
import { SettingsDebug } from '@/components/settings/settings-debug'
import { SettingsUiAccount } from '@/components/settings/settings-ui-account'
import { SettingsUiCluster } from '@/components/settings/settings-ui-cluster'

import { AppPage } from '@/components/app-page'

export default function TabSettingsScreen() {
  return (
    <AppPage>
      <SettingsUiAccount />
      <SettingsAppConfig />
      <SettingsUiCluster />
      <SettingsDebug />
      <AppText type="default" style={{ opacity: 0.5, fontSize: 14 }}>
        Configure app info and clusters in{' '}
        <AppText type="defaultSemiBold" style={{ fontSize: 14 }}>
          constants/app-config.tsx
        </AppText>
        .
      </AppText>
    </AppPage>
  )
}
