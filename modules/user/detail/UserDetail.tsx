import { Button, Dropdown, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { getListEditAble, lostOddProps, StatusList } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { UserRequest, UserRequestFailure, UserResponseSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DefaultUser, UserForm } from '../inventory'

export const UserDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()

  const [type, setType] = useState<'read' | 'update'>('read')
  const [UserState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const { breakPoint } = useSelector(ShareStoreSelector)

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getMethod(apiRoute.user.getDetailUser, cookies.token, {
        id: router?.query?.id?.toString() ?? '1',
      }),
    handleSuccess: (message, data) => {
      setUserState(data)
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<UserRequest, UserRequestFailure>({
    callApi: () =>
      putMethod<UserRequest>(
        apiRoute.user.updateUser,
        cookies.token,
        { id: UserState.id },
        lostOddProps<UserRequest>(UserState, viewResult.data?.editable)
      ),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/user/management')
    },
  })

  const changeStatus = useApiCall<UserResponseSuccess, string>({
    callApi: () => {
      return putMethod(apiRoute.user.changeStatus, cookies.token, {
        id: router?.query?.id?.toString() ?? '1',
      })
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess: (message) => {
      toast.success(translate(message))
      viewResult.setLetCall(true)
    },
  })

  useEffect(() => {
    if (router?.query?.id) {
      viewResult.setLetCall(true)
    }
  }, [router])

  const onchangeUserState = (newUpdate: Partial<UserResponseSuccess>) => {
    const newUserState = { ...UserState }
    setUserState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const editLabel = useTranslation('edit')

  const userDetail = useTranslation('userDetail')

  const userEdit = useTranslation('userEdit')

  const statusList = StatusList()

  if (viewResult.loading)
    return (
      <div
        style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>
        {type === 'read' ? userDetail : userEdit}
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
          {type === 'read' ? userDetail : userEdit}
        </h1>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {/* <Dropdown isDisabled={changeStatus.loading} isBordered>
            <Dropdown.Button
              size="sm"
              color={UserState.deleted === 0 ? 'success' : 'warning'}
              css={{ width: 144 }}
            >
              {statusList.find((item) => item.value === UserState.deleted)?.label}
            </Dropdown.Button>
            <Dropdown.Menu
              disallowEmptySelection
              selectedKeys={new Set([UserState.deleted.toString()])}
              selectionMode="single"
            >
              {statusList
                .filter((item) => item.value !== UserState.deleted)
                .map((item) => (
                  <Dropdown.Item key={item.value}>
                    <div
                      onClick={() => {
                        changeStatus.setLetCall(true)
                      }}
                    >
                      {item.label}
                    </div>
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown> */}
          <Dropdown
            button={statusList.find((item) => item.value === UserState.deleted)?.label ?? ''}
            color={UserState.deleted === 0 ? 'success' : 'warning'}
            onClick={() => {
              changeStatus.setLetCall(true)
            }}
            options={statusList}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            {type === 'read' ? (
              <>
                <Button
                  onClick={() => {
                    setType('update')
                  }}
                >
                  {editLabel}
                </Button>
                <Button
                  color="warning"
                  onClick={() => {
                    router.push('/user/management')
                  }}
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
                  disabled={updateResult.loading}
                >
                  {updateResult.loading ? <Loading /> : <>{saveLabel}</>}
                </Button>
                <Button
                  color="warning"
                  onClick={() => {
                    if (viewResult?.data?.result) setUserState(viewResult.data.result)
                    setType('read')
                    updateResult.handleReset()
                  }}
                  disabled={updateResult.loading}
                >
                  {cancelLabel}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <UserForm
          user={UserState}
          onchangeUserState={onchangeUserState}
          errorState={updateResult?.error?.result}
          editAble={type === 'update' ? getListEditAble(viewResult?.data?.editable) : {}}
        />
      </div>
    </div>
  )
}
