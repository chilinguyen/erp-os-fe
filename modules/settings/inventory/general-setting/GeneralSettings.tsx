import { Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { getMethod, putMethod } from '@/services'
import { GeneralSettingsResponseSuccess, UpdateGeneralFailure } from '@/types'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SettingLanguage } from './general-setting.inventory'

export const GeneralSettings = () => {
  const [cookie] = useCookies([TOKEN_AUTHENTICATION])
  const translate = useTranslationFunction()

  const generalSettingsState = useSelector(GeneralSettingsSelector)
  const dispatch = useDispatch()

  const viewResult = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () =>
      getMethod({ pathName: apiRoute.settings.getGeneralSettings, token: cookie.token }),
    handleSuccess: (message, data) => {
      dispatch(setGeneralSettings(data))
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<GeneralSettingsResponseSuccess, UpdateGeneralFailure>({
    callApi: () => {
      const { darkTheme, ...rest } = generalSettingsState
      return putMethod<GeneralSettingsResponseSuccess>({
        pathName: apiRoute.settings.updateGeneralSettings,
        token: cookie.token,
        request: rest,
      })
    },
    handleSuccess: (message) => {
      toast.success(translate(message))
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
      if (status !== 401 && status !== 403) {
        viewResult.setLetCall(true)
      }
    },
  })

  const generalSetting = useTranslation('generalSetting')

  return viewResult.loading ? (
    <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <Loading />
    </div>
  ) : (
    <div>
      <h3>{generalSetting}</h3>
      <hr style={{ margin: '10px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SettingLanguage
          languageKey={generalSettingsState.languageKey}
          setLetCallUpdate={updateResult.setLetCall}
          disabled={updateResult.loading}
        />
      </div>
    </div>
  )
}
