import { Collapse, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { setLanguage, ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, LanguageResponseSuccess } from '@/types'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DictionaryCreatePopup } from '../inventory/DictionaryCreatePopup'
import { IOCsvLanguage } from '../inventory/IOCsvLanguage'
import { LanguageCreatePopup } from '../inventory/LanguageCreatePopup'
import { OneLanguage } from './OneLanguage'

export const LanguageManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const viewLanguageresult = useApiCall<CommonListResultType<LanguageResponseSuccess>, String>({
    callApi: () => getMethod(apiRoute.language.getLanguageList, cookies.token),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const dispatch = useDispatch()

  const { languageKey } = useSelector(GeneralSettingsSelector)

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

  const updateStoreLanguage = () => {
    getLanguage.setLetCall(true)
  }

  useEffect(() => {
    viewLanguageresult.setLetCall(true)
  }, [])

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>
        {useTranslation('langMangPascal')}
      </h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>
          {useTranslation('langMangPascal')}
        </h1>
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <DictionaryCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
            listKeyOfDictionary={[
              'key',
              ...(viewLanguageresult.data?.result.data.map((language) => language.key) ?? []),
            ]}
            listKeyExist={Object.keys(getLanguage.data?.result?.dictionary ?? {})}
          />
          <LanguageCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
          />
          <IOCsvLanguage
            viewLanguageResult={viewLanguageresult.data?.result.data ?? []}
            setLetCall={viewLanguageresult.setLetCall}
          />
        </div>
      </div>

      {viewLanguageresult.loading ? (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      ) : (
        <>
          {viewLanguageresult.data?.result.data.map((language) => (
            <Collapse title={language.language}>
              <OneLanguage
                updateStoreLanguage={updateStoreLanguage}
                language={language}
                setLetCallList={viewLanguageresult.setLetCall}
              />
            </Collapse>
          ))}
        </>
      )}
    </>
  )
}
