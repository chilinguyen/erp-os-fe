import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { getListEditAble, lostOddProps } from '@/lib'
import { DefaultUser, UserForm } from '@/modules/user/inventory'
import { getMethod, putMethod } from '@/services'
import { UpdateAccountFailure, UpdateAccountRequest, UserResponseSuccess } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

export const UpdateAccount = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const [userState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getDetailUser,
        token: cookies.token,
        params: { id: cookies.userId },
      }),
    handleSuccess: (message, data) => {
      setUserState(data)
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<UpdateAccountRequest, UpdateAccountFailure>({
    callApi: () =>
      putMethod<UpdateAccountRequest>({
        pathName: apiRoute.settings.updateAccountSettings,
        token: cookies.token,
        request: lostOddProps<UpdateAccountRequest>(userState, viewResult?.data?.editable),
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
      if (status !== 401 && status !== 403) {
        viewResult.setLetCall(true)
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
    },
  })

  useEffect(() => {
    viewResult.setLetCall(true)
  }, [])

  const onchangeUserState = (newUpdate: Partial<UserResponseSuccess>) => {
    const newUserState = { ...userState }
    setUserState({ ...newUserState, ...newUpdate })
  }

  const accountInformation = useTranslation('accountInformation')

  const updateInformation = useTranslation('updateInformation')

  return viewResult.loading ? (
    <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <Loading />
    </div>
  ) : (
    <div>
      <h3>{accountInformation}</h3>
      <hr style={{ margin: '10px 0' }} />

      <UserForm
        user={userState}
        onchangeUserState={onchangeUserState}
        errorState={updateResult?.error?.result}
        editAble={getListEditAble(viewResult?.data?.editable)}
      />

      <Button
        style={{ marginTop: 20 }}
        onClick={() => {
          updateResult.setLetCall(true)
        }}
        size="md"
        disabled={viewResult.loading || updateResult.loading}
      >
        {updateResult.loading ? <Loading /> : <>{updateInformation}</>}
      </Button>
    </div>
  )
}
