import { Button, Input, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { postMethod } from '@/services'
import { DictionaryKey } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { inputStylesLanguage } from './Language.inventory'

interface IDictionaryCreatePopup {
  listKeyOfDictionary: string[]
  setLetCallList: Function
  updateStoreLanguage: Function
  listKeyExist: string[]
}

export const DictionaryCreatePopup = ({
  setLetCallList,
  listKeyOfDictionary,
  updateStoreLanguage,
  listKeyExist,
}: IDictionaryCreatePopup) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const [dictionaryState, setDictionaryState] = useState<DictionaryKey>({})

  const [open, setOpen] = useState(false)
  const [checkKeyExist, setCheckKeyExist] = useState(false)

  const translate = useTranslationFunction()

  const handleClose = () => {
    setOpen(false)
  }

  const createResult = useApiCall<DictionaryKey, Record<keyof DictionaryKey, string>>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.language.addNewDictionary,
        token: cookies.token,
        request: dictionaryState,
      }),
    handleSuccess(message) {
      toast.success(translate(message))
      handleClose()
      setLetCallList(true)
      updateStoreLanguage()
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  useEffect(() => {
    let newDictionaryState: DictionaryKey = {}
    listKeyOfDictionary.forEach((key) => {
      newDictionaryState = { ...newDictionaryState, [key]: '' }
    })
    setDictionaryState(newDictionaryState)
  }, [listKeyOfDictionary])

  const labelButton = useTranslation('createNewDict')

  const cancel = useTranslation('cancel')

  const create = useTranslation('create')

  const keyExist = useTranslation('keyExist')

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
      >
        {labelButton}
      </Button>
      <Modal open={open} setOpen={handleClose} preventClose>
        <h2>{labelButton}</h2>

        {checkKeyExist ? (
          <div style={{ textAlign: 'center' }}>{keyExist}</div>
        ) : (
          listKeyOfDictionary.map((key) => (
            <Input
              style={{ width: '100%' }}
              value={dictionaryState[key] ?? ''}
              label={key}
              onChange={(event) => {
                setDictionaryState({
                  ...dictionaryState,
                  [key]: event.currentTarget.value,
                })
              }}
              {...inputStylesLanguage({
                error: createResult?.error?.result.key && translate(createResult.error.result.key),
              })}
            />
          ))
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <Button
            disabled={createResult.loading}
            auto
            color="warning"
            onClick={() => {
              if (checkKeyExist) {
                setCheckKeyExist(false)
              } else {
                handleClose()
              }
            }}
          >
            {cancel}
          </Button>

          <Button
            disabled={createResult.loading}
            auto
            color="success"
            onClick={() => {
              if (listKeyExist.includes(dictionaryState.key) && !checkKeyExist) {
                setCheckKeyExist(true)
              } else {
                createResult.setLetCall(true)
              }
            }}
          >
            {create}
          </Button>
        </div>
      </Modal>
    </>
  )
}
