import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useGetDarkMode, useResponsive, useTranslationFunction } from '@/hooks'
import { generateToken } from '@/lib'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { setLanguage, setLoadingLanguage, setLoadingSettings } from '@/redux/share-store'
import { getLanguageByKey } from '@/services'
import { getGeneralSettings } from '@/services/settings.service'
import { DarkTheme, LightTheme } from '@/styles/themes'
import { GeneralSettingsResponseSuccess, LanguageResponseSuccess } from '@/types'
import { NextUIProvider } from '@nextui-org/react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BackDropModal } from '../modals'

export const NextUiProviderTheme = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const { darkTheme, languageKey } = useSelector(GeneralSettingsSelector)

  const responsive = useResponsive()

  const dispatch = useDispatch()

  const translate = useTranslationFunction()

  const result = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () => getGeneralSettings(cookies.token),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message, data) {
      if (responsive === 3) {
        dispatch(setGeneralSettings(data))
      }
    },
  })

  const getLanguage = useApiCall<LanguageResponseSuccess, string>({
    callApi: () => getLanguageByKey(generateToken(cookies.token), languageKey),
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
    if (responsive < 3 && darkTheme !== isDark) {
      dispatch(setGeneralSettings({ darkTheme: isDark }))
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
    <NextUIProvider theme={darkTheme ? DarkTheme : LightTheme}>
      {children} <BackDropModal />
    </NextUIProvider>
  )
}
