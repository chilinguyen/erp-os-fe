import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  loading: false,
  breakPoint: 1,
  language: {},
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.loading = actions.payload
    },
    setLanguage: (state, actions: PayloadAction<{ [key: string]: string }>) => {
      state.language = actions.payload
    },
    setBreakPoint: (state, actions: PayloadAction<number>) => {
      state.breakPoint = actions.payload
    },
    resetShareStore: () => initialState,
  },
})

export const { resetShareStore, setLoading, setLanguage, setBreakPoint } = ShareStoreSlice.actions

export default ShareStoreSlice
