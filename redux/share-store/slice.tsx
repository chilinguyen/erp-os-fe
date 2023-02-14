import { ShareStoreTypes, SidebarItem, UserNotifications } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  loading: 0,
  breakPoint: 1,
  language: {},
  sidebar: [],
  notifications: [],
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<boolean>) => {
      if (actions.payload) {
        return { ...state, loading: state.loading + 1 }
      }
      if (state.loading > 0) {
        return { ...state, loading: state.loading - 1 }
      }
      return state
    },
    setLanguage: (state, actions: PayloadAction<{ [key: string]: string }>) => {
      state.language = actions.payload
    },
    setBreakPoint: (state, actions: PayloadAction<number>) => {
      state.breakPoint = actions.payload
    },
    resetLoading: (state) => {
      return { ...state, loading: 0 }
    },
    setSidebar: (state, actions: PayloadAction<SidebarItem[]>) => {
      state.sidebar = actions.payload
    },
    setNotifications: (state, actions: PayloadAction<UserNotifications[]>) => {
      state.notifications = actions.payload
    },
    resetShareStore: () => initialState,
  },
})

export const {
  resetShareStore,
  setLoading,
  setLanguage,
  setBreakPoint,
  resetLoading,
  setSidebar,
  setNotifications,
} = ShareStoreSlice.actions

export default ShareStoreSlice
