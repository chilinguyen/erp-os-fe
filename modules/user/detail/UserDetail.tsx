import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultUser, UserForm } from '@/inventory'
import { getListEditAble, lostOddProps, StatusList } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { UserRequest, UserRequestFailure, UserResponseSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from '../inventory'

export const UserDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()

  const [type, setType] = useState<'read' | 'update'>('read')
  const [UserState, setUserState] = useState<UserResponseSuccess>(DefaultUser)

  const { breakPoint } = useSelector(ShareStoreSelector)

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getDetailUser,
        token: cookies.token,
        params: {
          id: router?.query?.id?.toString() ?? '1',
        },
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
      putMethod<UserRequest>({
        pathName: apiRoute.user.updateUser,
        token: cookies.token,
        params: { id: UserState.id },
        request: lostOddProps<UserRequest>(UserState, viewResult.data?.editable),
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      viewResult.setLetCall(true)
    },
  })

  const changeStatus = useApiCall<UserResponseSuccess, string>({
    callApi: () => {
      return putMethod({
        pathName: apiRoute.user.changeStatus,
        token: cookies.token,
        params: {
          id: router?.query?.id?.toString() ?? '1',
        },
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
      setType('read')
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

  const statusList = StatusList()

  const breadCrumb = useGetBreadCrumb()

  if (viewResult.loading)
    return (
      <div
        style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  const handleChangeStatus = () => {
    changeStatus.setLetCall(true)
  }

  const handleSetTypeUpdate = () => {
    setType('update')
  }

  const callUpdate = () => {
    updateResult.setLetCall(true)
  }

  const handleSetTypeRead = () => {
    if (viewResult?.data?.result) setUserState(viewResult.data.result)
    setType('read')
    updateResult.handleReset()
  }

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
        {breakPoint > 1 ? (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button
              color={UserState.active !== 0 ? 'success' : 'warning'}
              onClick={handleChangeStatus}
            >
              {statusList.find((item) => item.value !== UserState.active)?.label ?? ''}
            </Button>
            <div style={{ display: 'flex', gap: 10 }}>
              {type === 'read' ? (
                <>
                  <Button onClick={handleSetTypeUpdate}>{editLabel}</Button>
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
                  <Button color="primary" onClick={callUpdate} disabled={updateResult.loading}>
                    {updateResult.loading ? <Loading /> : <>{saveLabel}</>}
                  </Button>
                  <Button
                    color="warning"
                    onClick={handleSetTypeRead}
                    disabled={updateResult.loading}
                  >
                    {cancelLabel}
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <FloatTrayDetail
            type={type}
            handleChangeStatus={handleChangeStatus}
            handleSetTypeUpdate={handleSetTypeUpdate}
            callUpdate={callUpdate}
            handleSetTypeRead={handleSetTypeRead}
            status={UserState.active}
          />
        )}
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
