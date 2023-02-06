import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetDarkMode, useTranslationFunction } from '@/hooks'
import { authenticationSelector } from '@/redux/authentication'
import { GeneralSettingsSelector, setGeneralSettings, setUserInfo } from '@/redux/general-settings'
import { setLanguage, ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import {
  GeneralSettingsResponseSuccess,
  LanguageResponseSuccess,
  UserResponseSuccess,
} from '@/types'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BackdropLoading } from '../backdrop'

export const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const { darkTheme, languageKey, accountInfo } = useSelector(GeneralSettingsSelector)

  const { breakPoint, loading } = useSelector(ShareStoreSelector)

  const { isLoggedIn } = useSelector(authenticationSelector)

  const dispatch = useDispatch()

  const translate = useTranslationFunction()

  const result = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () =>
      getMethod({ pathName: apiRoute.settings.getGeneralSettings, token: cookies.token }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message, data) {
      if (breakPoint === 3) {
        dispatch(setGeneralSettings(data))
      }
    },
  })

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getDetailUser,
        token: cookies.token,
        params: {
          id: cookies.userId,
        },
      }),
    handleSuccess: (message, data) => {
      dispatch(setUserInfo(data))
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const getLanguage = useApiCall<LanguageResponseSuccess, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.language.getLanguageByKey,
        token: cookies.token,
        params: { key: languageKey },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message, data) {
      dispatch(setLanguage(data.dictionary))
    },
  })

  const isDark = useGetDarkMode()

  useEffect(() => {
    if (window) {
      const nav = window.navigator.userAgent
      if (!nav.toLowerCase().includes('iphone') && accountInfo.notificationId) {
        /* @ts-ignore */
        const beamsClient = new PusherPushNotifications.Client({
          instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID,
        })

        beamsClient.start().then(() => beamsClient.addDeviceInterest(accountInfo.notificationId))
      }
    }
  }, [accountInfo.notificationId])

  useEffect(() => {
    if (isDark) {
      if (darkTheme === 'light') dispatch(setGeneralSettings({ darkTheme: 'dark' }))
    } else if (darkTheme === 'dark') dispatch(setGeneralSettings({ darkTheme: 'light' }))
  }, [isDark])

  useEffect(() => {
    if (isLoggedIn) {
      result.setLetCall(true)
      viewResult.setLetCall(true)
    }
  }, [isLoggedIn])

  useEffect(() => {
    getLanguage.setLetCall(true)
  }, [languageKey])

  return (
    <>
      {children}
      <BackdropLoading isOpen={!!loading} />
    </>
  )
}
