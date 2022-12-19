import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { getListEditAble } from '@/lib'
import { addPermission } from '@/services/permission.service'
import { PermissionRequest, PermissionRequestFailure } from '@/types'
import { Button, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { PermissionRequestDefault } from '../inventory'
import { ModifierPermission } from '../inventory/ModifierPermission'

export const PermissionCreate = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const router = useRouter()
  const translate = useTranslationFunction()

  const [permissionState, setPermissionState] =
    useState<PermissionRequest>(PermissionRequestDefault)

  const createResult = useApiCall<PermissionRequest, PermissionRequestFailure>({
    callApi: () => addPermission(cookies.token, permissionState),
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

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const createPermission = useTranslation('permissionCreatePascal')

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <Text h2 showIn="sm">
        {createPermission}
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text h1 hideIn="sm">
          {createPermission}
        </Text>
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
            size="sm"
            disabled={createResult.loading}
          >
            {createResult.loading ? <Loading /> : <>{saveLabel}</>}
          </Button>
          <Button
            color="warning"
            onClick={() => {
              router.push('/permission/management')
            }}
            size="sm"
            disabled={createResult.loading}
          >
            {cancelLabel}
          </Button>
        </div>
      </div>
      <ModifierPermission
        editAble={getListEditAble(PermissionRequestDefault)}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={createResult?.error?.result}
      />
    </div>
  )
}
