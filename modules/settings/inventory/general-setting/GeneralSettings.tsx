import { Loading, UploadFileBase64 } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { formatSVGBase64 } from '@/lib'
import { GeneralSettingsSelector, setGeneralSettings, setUserInfo } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { GeneralSettingsResponseSuccess, UpdateGeneralFailure } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SettingLanguage } from './general-setting.inventory'

export const GeneralSettings = () => {
  const [cookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const generalSettingsState = useSelector(GeneralSettingsSelector)
  const dispatch = useDispatch()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const [avatar, setAvatar] = useState<string>(generalSettingsState.accountInfo.avatar)

  const updateAvatar = useApiCall<string, string>({
    callApi: () => {
      return putMethod<{ avatar: string }>({
        pathName: apiRoute.settings.updateAvatar,
        token: cookie.token,
        params: {
          id: cookie.userId,
        },
        request: {
          avatar,
        },
      })
    },
    handleSuccess: (message) => {
      dispatch(setUserInfo({ ...generalSettingsState.accountInfo, avatar }))
      toast.success(translate(message))
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  useEffect(() => {
    if (avatar && avatar !== generalSettingsState.accountInfo.avatar) {
      updateAvatar.setLetCall(true)
    }
  }, [avatar])

  const setIconPath = (iconPath: string) => {
    setAvatar(`${formatSVGBase64}${iconPath}`)
  }

  const uploadIcon = useTranslation('uploadAvatar')

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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
          gap: 16,
        }}
      >
        <SettingLanguage
          languageKey={generalSettingsState.languageKey}
          setLetCallUpdate={updateResult.setLetCall}
          disabled={updateResult.loading}
        />
        <div />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <UploadFileBase64
            handleUploadFile={setIconPath}
            labelInput={uploadIcon}
            id="uploadIconPath"
            accept=".svg"
          />
          <div style={{ position: 'relative', width: 80, aspectRatio: 1 }}>
            {generalSettingsState.accountInfo.avatar ? (
              <Image src={generalSettingsState.accountInfo.avatar} layout="fill" />
            ) : (
              'No icon'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
