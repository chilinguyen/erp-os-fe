import { Button, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { putMethod } from '@/services'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { BsTrash2Fill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const DeletePermissionPopup = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const translate = useTranslationFunction()

  const handleClose = () => {
    setOpen(false)
  }

  const deleteResult = useApiCall<string, string>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.permissions.deletePermission,
        token: cookies.token,
        params: {
          id: router?.query?.id?.toString() ?? '1',
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/permission/management')
    },
  })

  const deleteLabel = useTranslation('delete')
  const cancel = useTranslation('cancel')
  const deleteKeyLabel = useTranslation('deleteKeyLabel')

  const handleDelete = () => {
    setOpen(true)
  }

  return (
    <>
      {breakPoint > 1 ? (
        <Button onClick={handleDelete} color="error">
          {deleteLabel}
        </Button>
      ) : (
        <BsTrash2Fill onClick={handleDelete} style={{ width: '50%', height: '50%' }} />
      )}
      <Modal open={open} setOpen={handleClose}>
        <h2>{deleteLabel}</h2>

        <div>{deleteKeyLabel}</div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
