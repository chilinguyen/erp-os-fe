import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { getListEditAble, lostOddProps } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { PermissionRequest, PermissionRequestFailure, PermissionResponse } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ModifierPermission, PermissionResponseDefault } from '../inventory'
import { DeletePermissionPopup } from '../inventory/DeletePermissionPopup'

export const PermissionDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const router = useRouter()
  const translate = useTranslationFunction()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const [type, setType] = useState<'read' | 'update'>('read')
  const [permissionState, setPermissionState] =
    useState<PermissionResponse>(PermissionResponseDefault)

  const viewResult = useApiCall<PermissionResponse, string>({
    callApi: () =>
      getMethod(apiRoute.permissions.getDetailPermission, cookies.token, {
        id: router?.query?.id?.toString() ?? '1',
      }),
    handleSuccess: (message, data) => {
      setPermissionState(data)
    },
  })

  const updateResult = useApiCall<PermissionRequest, PermissionRequestFailure>({
    callApi: () =>
      putMethod(
        apiRoute.permissions.updatePermission,
        cookies.token,
        {
          id: router?.query?.id?.toString() ?? '1',
        },
        lostOddProps<PermissionRequest>(permissionState, viewResult?.data?.editable)
      ),
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

  const handleChangeState = (NewUpdate: Partial<PermissionRequest>) => {
    const newState = { ...permissionState, ...NewUpdate }
    setPermissionState(newState)
  }

  useEffect(() => {
    if (router?.query?.id) {
      viewResult.setLetCall(true)
    } else {
      setPermissionState(PermissionResponseDefault)
    }
  }, [router?.query?.id])

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const editLabel = useTranslation('edit')

  const permissionDetail = useTranslation('permissionDetail')

  const editPermission = useTranslation('editPermission')

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>
        {type === 'read' ? permissionDetail : editPermission}
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h1 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>
          {type === 'read' ? permissionDetail : editPermission}
        </h1>
        <div>
          <div style={{ display: 'flex', gap: 20 }}>
            {type === 'read' ? (
              <>
                <Button
                  onClick={() => {
                    setType('update')
                  }}
                  size="sm"
                >
                  {editLabel}
                </Button>
                <DeletePermissionPopup />
                <Button
                  color="warning"
                  onClick={() => {
                    router.push('/permission/management')
                  }}
                  size="sm"
                >
                  {cancelLabel}
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="success"
                  onClick={() => {
                    updateResult.setLetCall(true)
                  }}
                  size="sm"
                  disabled={updateResult.loading}
                >
                  {updateResult.loading ? <Loading /> : <>{saveLabel}</>}
                </Button>
                <Button
                  color="warning"
                  onClick={() => {
                    if (viewResult?.data?.result) setPermissionState(viewResult.data.result)
                    updateResult.handleReset()
                    setType('read')
                  }}
                  size="sm"
                  disabled={updateResult.loading}
                >
                  {cancelLabel}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <ModifierPermission
        editAble={type === 'read' ? {} : getListEditAble(viewResult?.data?.editable)}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={updateResult?.error?.result}
      />
    </div>
  )
}
