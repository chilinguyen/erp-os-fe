import { Button, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { encodeBase64 } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { putMethod } from '@/services'
import { UpdatePasswordPayload } from '@/types'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const UpdatePassword = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  const [oldPasswordState, setOldPassword] = useState<string>('')
  const [newPasswordState, setNewPassword] = useState<string>('')
  const [confirmPasswordState, setConfirmPasswordState] = useState<string>('')

  const updateResult = useApiCall<string, UpdatePasswordPayload>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.settings.updatePassword,
        token: cookies.token,
        request: {
          oldPassword: encodeBase64(oldPasswordState),
          newPassword: encodeBase64(newPasswordState),
          confirmNewPassword: encodeBase64(confirmPasswordState),
        },
      }),
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess: (message) => {
      toast.success(translate(message))
      setOldPassword('')
      setNewPassword('')
      setConfirmPasswordState('')
    },
  })

  const { error, handleReset, setLetCall } = updateResult

  const changPassword = useTranslation('changePassword')

  const oldPassword = useTranslation('oldPassword')

  const newPassword = useTranslation('newPassword')

  const confirmPassword = useTranslation('confirmPassword')

  const updatePasswordLabel = useTranslation('updatePassword')

  return (
    <div>
      <h3>{changPassword}</h3>
      <hr style={{ margin: '10px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Input
          style={{ width: breakPoint < 2 ? '100%' : '40%' }}
          {...inputStyles({
            error: error?.result?.oldPassword && translate(error.result.oldPassword),
          })}
          type="password"
          label={oldPassword}
          onFocus={handleReset}
          value={oldPasswordState}
          onChange={(e) => {
            setOldPassword(e.currentTarget.value)
          }}
        />
        <Input
          style={{ width: breakPoint < 2 ? '100%' : '40%' }}
          {...inputStyles({
            error: error?.result?.newPassword && translate(error.result.newPassword),
          })}
          type="password"
          label={newPassword}
          onFocus={handleReset}
          value={newPasswordState}
          onChange={(e) => {
            setNewPassword(e.currentTarget.value)
          }}
        />
        <Input
          style={{ width: breakPoint < 2 ? '100%' : '40%' }}
          {...inputStyles({
            error: error?.result?.confirmNewPassword && translate(error.result.confirmNewPassword),
          })}
          type="password"
          label={confirmPassword}
          onFocus={handleReset}
          value={confirmPasswordState}
          onChange={(e) => {
            setConfirmPasswordState(e.currentTarget.value)
          }}
        />
      </div>

      <Button
        style={{ marginTop: 20 }}
        onClick={() => {
          setLetCall(true)
        }}
        size="md"
        disabled={updateResult.loading}
      >
        {updateResult.loading ? <Loading /> : <>{updatePasswordLabel}</>}
      </Button>
    </div>
  )
}
