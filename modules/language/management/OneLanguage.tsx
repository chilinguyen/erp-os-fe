import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { putMethod } from '@/services'
import { DictionaryKey, LanguageRequest, LanguageResponseSuccess } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { LanguageTable } from '../inventory'

interface IOneLanguage {
  language: LanguageResponseSuccess
  setLetCallList: Function
  updateStoreLanguage: Function
}

export const OneLanguage = ({ language, setLetCallList, updateStoreLanguage }: IOneLanguage) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const translate = useTranslationFunction()

  const [editAble, setEditAble] = useState(false)
  const [dictionaryList, setDictionaryList] = useState<DictionaryKey>({})

  const updateResult = useApiCall<LanguageRequest, Record<keyof LanguageRequest, string>>({
    callApi: () =>
      putMethod<LanguageRequest>(
        apiRoute.language.updateLanguage,
        cookies.token,
        { id: language.id },
        {
          key: language.key,
          language: language.language,
          dictionary: dictionaryList,
        }
      ),
    handleSuccess(message) {
      toast.success(translate(message))
      setLetCallList(true)
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  useEffect(() => {
    setDictionaryList(language.dictionary)
  }, [language])

  const edit = useTranslation('edit')

  const cancel = useTranslation('cancel')

  const save = useTranslation('save')

  return (
    <>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        {editAble ? (
          <>
            <Button
              color="success"
              onClick={() => {
                updateResult.setLetCall(true)
                setEditAble(false)
              }}
              size="sm"
              disabled={updateResult.loading}
            >
              {updateResult.loading ? <Loading /> : <>{save}</>}
            </Button>
            <Button
              color="warning"
              onClick={() => {
                setLetCallList(true)
                setEditAble(false)
              }}
              size="sm"
              disabled={updateResult.loading}
            >
              {cancel}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setEditAble(true)
            }}
            size="sm"
          >
            {edit}
          </Button>
        )}
      </div>
      <LanguageTable
        dictionaryList={dictionaryList}
        edit={editAble}
        updateStoreLanguage={updateStoreLanguage}
        handleChangeState={setDictionaryList}
        setLetCallList={setLetCallList}
      />
    </>
  )
}
