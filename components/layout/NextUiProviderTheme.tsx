import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useGetDarkMode, useTranslationFunction } from '@/hooks'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { setLanguage, ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { GeneralSettingsResponseSuccess, LanguageResponseSuccess } from '@/types'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { BackdropLoading } from '../backdrop'

export const NextUiProviderTheme = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const { darkTheme, languageKey } = useSelector(GeneralSettingsSelector)

  const { breakPoint, loading } = useSelector(ShareStoreSelector)

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
    } else if (darkTheme === 'dark') dispatch(setGeneralSettings({ darkTheme: 'light' }))
  }, [isDark])

  useEffect(() => {
    if (cookies.token) {
      result.setLetCall(true)
    }
  }, [cookies.token])

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
      <BackdropLoading isOpen={!!loading} />
    </>
  )
}
