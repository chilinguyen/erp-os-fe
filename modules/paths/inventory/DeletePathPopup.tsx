import { Button, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { putMethod } from '@/services'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { BsTrash2Fill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IDeletePathPopup {
  deleteId: string[]
  setDeleteId?: (id: string[]) => void
  setLetCallList: (v: boolean) => void
}

export const DeletePathPopup = ({ deleteId, setDeleteId, setLetCallList }: IDeletePathPopup) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const [open, setOpen] = useState(false)
  const { breakPoint } = useSelector(ShareStoreSelector)

  const translate = useTranslationFunction()

  const handleClose = () => {
    setOpen(false)
  }

  const deleteResult = useApiCall<string, string>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.paths.deletePath,
        token: cookies.token,
        params: {
          id: deleteId?.[0],
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      if (setDeleteId) {
        setDeleteId([])
      }
      handleClose()
      setLetCallList(true)
    },
  })

  const deleteLabel = useTranslation('delete')
  const cancel = useTranslation('cancel')
  const deletePathNoti = useTranslation('deletePathNoti')

  const handleDelete = () => {
    if (deleteId.length !== 0) {
      setOpen(true)
    }
  }

  return (
    <>
      {breakPoint > 1 ? (
        <Button onClick={handleDelete} color="error" disabled={deleteId.length === 0}>
          {deleteLabel}
        </Button>
      ) : (
        <BsTrash2Fill onClick={handleDelete} style={{ width: '50%', height: '50%' }} />
      )}
      <Modal open={open} setOpen={handleClose}>
        <h2>{deleteLabel}</h2>

        <div>{deletePathNoti}</div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
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
        </div>
      </Modal>
    </>
  )
}
