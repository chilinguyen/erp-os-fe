import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useGetDarkMode, useTranslationFunction } from '@/hooks'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import {
  setLanguage,
  setLoadingLanguage,
  setLoadingSettings,
  ShareStoreSelector,
} from '@/redux/share-store'
import { getMethod } from '@/services'
import { GeneralSettingsResponseSuccess, LanguageResponseSuccess } from '@/types'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

export const NextUiProviderTheme = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const { darkTheme, languageKey } = useSelector(GeneralSettingsSelector)

  const { breakPoint } = useSelector(ShareStoreSelector)

  const dispatch = useDispatch()

  const translate = useTranslationFunction()

  const result = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () => getMethod(apiRoute.settings.getGeneralSettings, cookies.token),
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

  const getLanguage = useApiCall<LanguageResponseSuccess, string>({
    callApi: () =>
      getMethod(apiRoute.language.getLanguageByKey, cookies.token, { key: languageKey }),
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
    if (isDark) {
      if (darkTheme === 'light') dispatch(setGeneralSettings({ darkTheme: 'dark' }))
      document.documentElement.classList.add('dark')
    } else {
      if (darkTheme === 'dark') dispatch(setGeneralSettings({ darkTheme: 'light' }))
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    if (cookies.token) {
      result.setLetCall(true)
    }
  }, [cookies.token])

  useEffect(() => {
    dispatch(setLoadingSettings(result.loading))
    dispatch(setLoadingLanguage(getLanguage.loading))
  }, [result.loading, getLanguage.loading])

  useEffect(() => {
    getLanguage.setLetCall(true)
  }, [languageKey])

  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        theme={isDark ? 'dark' : 'light'}
        style={{ zIndex: 1000000 }}
      />
      {children}
    </>
  )
}
