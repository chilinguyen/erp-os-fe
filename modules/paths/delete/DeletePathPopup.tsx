import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { putMethod } from '@/services'
import { Button, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface IDeletePathPopup {
  deleteId: string[]
  setDeleteId: (id: string[]) => void
  setLetCallList: (v: boolean) => void
}

export const DeletePathPopup = ({ deleteId, setDeleteId, setLetCallList }: IDeletePathPopup) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const [open, setOpen] = useState(false)

  const translate = useTranslationFunction()

  const handleClose = () => {
    setOpen(false)
  }

  const deleteResult = useApiCall<string, string>({
    callApi: () =>
      putMethod(apiRoute.paths.deletePath, cookies.token, {
        id: deleteId?.[0],
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      setDeleteId([])
      handleClose()
      setLetCallList(true)
    },
  })

  const deleteLabel = useTranslation('delete')
  const cancel = useTranslation('cancel')
  const deletePathNoti = useTranslation('deletePathNoti')

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
        color="error"
        disabled={deleteId.length === 0}
      >
        {deleteLabel}
      </Button>
      <Modal open={open} onClose={handleClose} blur>
        <Modal.Header>
          <Text h2 id="modal-title">
            {deleteLabel}
          </Text>
        </Modal.Header>

        <Modal.Body>{deletePathNoti}</Modal.Body>

        <Modal.Footer justify="center">
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
        </Modal.Footer>
      </Modal>
    </>
  )
}