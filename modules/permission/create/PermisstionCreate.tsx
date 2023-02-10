import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { PermissionRequestDefault } from '@/inventory'
import { getListEditAble } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { PermissionRequest, PermissionRequestFailure } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ModifierPermission } from '../inventory'

export const PermissionCreate = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const router = useRouter()
  const translate = useTranslationFunction()

  const [permissionState, setPermissionState] =
    useState<PermissionRequest>(PermissionRequestDefault)

  const createResult = useApiCall<PermissionRequest, PermissionRequestFailure>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.permissions.addPermission,
        token: cookies.token,
        request: permissionState,
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

  const breadCrumb = useGetBreadCrumb()

  const handleChangeState = (NewUpdate: Partial<PermissionRequest>) => {
    const newState = { ...permissionState, ...NewUpdate }
    setPermissionState(newState)
  }
  const { breakPoint } = useSelector(ShareStoreSelector)

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button
            color="success"
            onClick={() => {
              createResult.setLetCall(true)
            }}
            disabled={createResult.loading}
          >
            {createResult.loading ? <Loading /> : <>{saveLabel}</>}
          </Button>
          <Button
            color="warning"
            onClick={() => {
              router.push('/permission/management')
            }}
            disabled={createResult.loading}
          >
            {cancelLabel}
          </Button>
        </div>
      </div>
      <ModifierPermission
        editAble={getListEditAble([
          { key: 'name', label: 'name' },
          { key: 'userId', label: 'userId' },
          { key: 'viewPoints', label: 'viewPoints' },
          { key: 'editable', label: 'editable' },
          { key: 'isServer', label: 'isServer' },
        ])}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={createResult?.error?.result}
      />
    </div>
  )
}
