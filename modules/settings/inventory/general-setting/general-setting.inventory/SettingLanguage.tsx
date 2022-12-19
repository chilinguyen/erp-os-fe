import { SelectCustom } from '@/components'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useResponsive, useTranslation, useTranslationFunction } from '@/hooks'
import { setGeneralSettings } from '@/redux/general-settings'
import { getLanguageSelectList } from '@/services'
import { OptionsType } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

interface ISettingLanguage {
  languageKey: string
  setLetCallUpdate: Function
  disabled: boolean
}

export const SettingLanguage = ({ disabled, languageKey, setLetCallUpdate }: ISettingLanguage) => {
  const [cookie] = useCookies([TOKEN_AUTHENTICATION])
  const breakPoint = useResponsive()
  const dispatch = useDispatch()
  const translate = useTranslationFunction()

  const [languageOptions, setLanguageOptions] = useState<OptionsType<string>[]>([])

  const languageResult = useApiCall<OptionsType<string>[], string>({
    callApi: () => getLanguageSelectList(cookie.token),
    handleSuccess: (message, data) => {
      toast.success(translate(message))
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
