import { ThemeKey } from '@/lib'
import { UserConfig, UserResponseSuccess } from '../user'

export type GeneralSettingsStoreTypes = {
  darkTheme: ThemeKey
  languageKey: string
  accountInfo: UserResponseSuccess
  accountConfig: UserConfig
  isUpdateAccess: boolean
  isUpdateSidebar: boolean
}
