import { AuthenticationStoreTypes, SignUpRequest } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthenticationStoreTypes = {
  isForbidden: false,
  signUpRequest: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  },
  isLoggedIn: false,
}

const AuthenticationSlice = createSlice({
  name: 'authentication_store',
  initialState,
  reducers: {
    setSignUpRequest: (state, actions: PayloadAction<Partial<SignUpRequest>>) => {
      const signUpRequest = {
        ...state.signUpRequest,
        ...actions.payload,
      }
      state.signUpRequest = signUpRequest
    },
    setIsForbidden: (state, actions: PayloadAction<boolean>) => {
      state.isForbidden = actions.payload
    },
    resetSignUpRequest: (state) => {
      state.signUpRequest = initialState.signUpRequest
    },
    reset: (state) => {
      Object.assign(state, initialState)
    },
    setIsLoggedIn: (state, actions: PayloadAction<boolean>) => {
      state.isLoggedIn = actions.payload
    },
  },
})

export const { setSignUpRequest, reset, resetSignUpRequest, setIsForbidden, setIsLoggedIn } =
  AuthenticationSlice.actions

export default AuthenticationSlice
