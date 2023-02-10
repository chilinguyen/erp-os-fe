import { DefaultUser } from '@/inventory'
import { GeneralSettingsStoreTypes, UserConfig, UserResponseSuccess } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: GeneralSettingsStoreTypes = {
  darkTheme: 'dark',
  languageKey: 'en',
  accountInfo: DefaultUser,
  accountConfig: {
    notificationId: '',
    channelId: '',
    eventId: '',
  },
  isUpdateAccess: false,
  isUpdateSidebar: false,
}

const GeneralSettingsSlice = createSlice({
  name: 'generalSettings_store',
  initialState,
  reducers: {
    setGeneralSettings: (state, action: PayloadAction<Partial<GeneralSettingsStoreTypes>>) => {
      Object.assign(state, { ...state, ...action.payload })
    },
    setUserInfo: (state, action: PayloadAction<UserResponseSuccess>) => {
      Object.assign(state, { ...state, accountInfo: { ...state.accountInfo, ...action.payload } })
    },
    setUserConfig: (state, action: PayloadAction<UserConfig>) => {
      Object.assign(state, {
        ...state,
        accountConfig: { ...state.accountConfig, ...action.payload },
      })
    },
    setIsUpdateAccess: (state, action: PayloadAction<boolean>) => {
      Object.assign(state, {
        ...state,
        isUpdateAccess: action.payload,
      })
    },
    setIsUpdateSidebar: (state, action: PayloadAction<boolean>) => {
      Object.assign(state, {
        ...state,
        isUpdateSidebar: action.payload,
      })
    },
    resetGeneralSettings: () => initialState,
  },
})

export const {
  resetGeneralSettings,
  setGeneralSettings,
  setUserInfo,
  setUserConfig,
  setIsUpdateAccess,
  setIsUpdateSidebar,
} = GeneralSettingsSlice.actions

export default GeneralSettingsSlice
