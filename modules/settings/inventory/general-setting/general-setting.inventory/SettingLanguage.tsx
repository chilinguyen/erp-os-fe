import { SelectCustom } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { setGeneralSettings } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { OptionsType } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface ISettingLanguage {
  languageKey: string
  setLetCallUpdate: Function
  disabled: boolean
}

export const SettingLanguage = ({ disabled, languageKey, setLetCallUpdate }: ISettingLanguage) => {
  const [cookie] = useCookies([TOKEN_AUTHENTICATION])
  const { breakPoint } = useSelector(ShareStoreSelector)
  const dispatch = useDispatch()
  const translate = useTranslationFunction()

  const [languageOptions, setLanguageOptions] = useState<OptionsType<string>[]>([])

  const languageResult = useApiCall<OptionsType<string>[], string>({
    callApi: () =>
      getMethod({ pathName: apiRoute.language.getLanguageSelectList, token: cookie.token }),
    handleSuccess: (message, data) => {
      setLanguageOptions(data)
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  useEffect(() => {
    languageResult.setLetCall(true)
  }, [])

  const languagePascal = useTranslation('languagePascal')

  return (
    <SelectCustom<string>
      value={languageKey}
      onChange={(value) => {
        dispatch(setGeneralSettings({ languageKey: value }))
        setLetCallUpdate(true)
      }}
      label={languagePascal}
      disabled={disabled || languageResult.loading}
      options={languageOptions}
      buttonProps={{ underlined: true, width: breakPoint < 2 ? '100%' : '40%' }}
    />
  )
}
