import { Button, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { putMethod } from '@/services'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { TiDelete } from 'react-icons/ti'
import { toast } from 'react-toastify'

interface IDeleteDictionaryPopup {
  dictionaryKey: string
  setLetCallList: Function
  updateStoreLanguage: Function
}

export const DeleteDictionaryPopup = ({
  dictionaryKey,
  setLetCallList,
  updateStoreLanguage,
}: IDeleteDictionaryPopup) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const [open, setOpen] = useState(false)

  const translate = useTranslationFunction()

  const handleClose = () => {
    setOpen(false)
  }

  const deleteResult = useApiCall({
    callApi: () =>
      putMethod(apiRoute.language.deleteDictionaryKey, cookies.token, { key: dictionaryKey }),
    handleSuccess(message) {
      toast.success(translate(message))
      setOpen(false)
      setLetCallList(true)
      updateStoreLanguage()
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  const deleteLabel = useTranslation('delete')
  const cancel = useTranslation('cancel')
  const deleteKeyLabel = useTranslation('deleteKeyLabel')

  return (
    <>
      <TiDelete style={{ cursor: 'pointer' }} size={25} color="red" onClick={() => {}} />
      {dictionaryKey}
      {updateStoreLanguage}
      {setLetCallList}
      <Modal open={open} setOpen={handleClose}>
        <h2>
          {deleteLabel} {dictionaryKey}
        </h2>

        {deleteKeyLabel}

        <Button disabled={deleteResult.loading} auto color="warning" onClick={handleClose}>
          {cancel}
        </Button>

        <Button
          disabled={deleteResult.loading}
          auto
          color="success"
          onClick={() => {
            deleteResult.setLetCall(true)
          }}
        >
          {deleteLabel}
        </Button>
      </Modal>
    </>
  )
}
