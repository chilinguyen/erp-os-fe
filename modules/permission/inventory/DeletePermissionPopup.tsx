import { Button, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { putMethod } from '@/services'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

export const DeletePermissionPopup = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const translate = useTranslationFunction()

  const handleClose = () => {
    setOpen(false)
  }

  const deleteResult = useApiCall<string, string>({
    callApi: () =>
      putMethod(apiRoute.permissions.deletePermission, cookies.token, {
        id: router?.query?.id?.toString() ?? '1',
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

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
        color="error"
      >
        {deleteLabel}
      </Button>
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
