import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { generateToken, getListEditAble, lostOddProps } from '@/lib'
import { DefaultUser, UserForm } from '@/modules/user/inventory'
import { getDetailUser } from '@/services'
import { updateAccountSettings } from '@/services/settings.service'
import { UpdateAccountFailure, UpdateAccountRequest, UserResponseSuccess } from '@/types'
import { Button, Container, Loading, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { initUpdateAccountRequest } from './settings.inventory'

export const UpdateAccount = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const [userState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getDetailUser({
        id: cookies.userId,
        token: cookies.token,
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
      updateAccountSettings(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.token,
        }),
        lostOddProps<UpdateAccountRequest>(initUpdateAccountRequest, userState)
      ),
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
    <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
      <Loading />
    </Container>
  ) : (
    <div>
      <Text h3>{accountInformation}</Text>
      <hr style={{ margin: '10px 0' }} />

      <UserForm
        user={userState}
        onchangeUserState={onchangeUserState}
        errorState={updateResult?.error?.result}
        editAble={getListEditAble(initUpdateAccountRequest)}
      />

      <Button
        style={{ marginTop: 20 }}
        color="default"
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
