import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { PathDefault } from '@/inventory'
import { getListEditAble, lostOddProps } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { PathRequest, PathRequestFailure, PathResponse } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ModifierPath, DeletePathPopup } from '../inventory'

export const PathDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const { breakPoint } = useSelector(ShareStoreSelector)
  const router = useRouter()

  const translate = useTranslationFunction()

  const [type, setType] = useState<'read' | 'update'>('read')
  const [pathState, setPathState] = useState<PathResponse>(PathDefault)

  const viewResult = useApiCall<PathResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.paths.getPathDetail,
        token: cookies.token,
        params: {
          id: router?.query?.id?.toString() ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setPathState(data)
    },
  })

  const updateResult = useApiCall<PathRequest, PathRequestFailure>({
    callApi: () =>
      putMethod<PathRequest>({
        pathName: apiRoute.paths.updatePath,
        token: cookies.token,
        params: { id: pathState.id },
        request: lostOddProps<PathRequest>(pathState, viewResult.data?.editable),
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      viewResult.setLetCall(true)
      setType('read')
    },
  })

  const cancel = useTranslation('cancel')
  const breadCrumb = useGetBreadCrumb()
  const saveLabel = useTranslation('save')
  const editLabel = useTranslation('edit')

  useEffect(() => {
    if (router?.query?.id) {
      viewResult.setLetCall(true)
    }
  }, [router?.query?.id])

  const onchangePathState = (newUpdate: Partial<PathResponse>) => {
    const newUserState = { ...pathState }
    setPathState({ ...newUserState, ...newUpdate })
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
        <div>
          <div style={{ display: 'flex', gap: 20 }}>
            {type === 'read' ? (
              <>
                <Button
                  onClick={() => {
                    setType('update')
                  }}
                >
                  {editLabel}
                </Button>
                <DeletePathPopup
                  deleteId={[router?.query?.id?.toString() ?? '']}
                  setLetCallList={() => {
                    router.push('/paths/management')
                  }}
                />
                <Button
                  color="warning"
                  onClick={() => {
                    router.push('/paths/management')
                  }}
                >
                  {cancel}
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
                    if (viewResult?.data?.result) setPathState(viewResult.data.result)
                    setType('read')
                    updateResult.handleReset()
                  }}
                  disabled={updateResult.loading}
                >
                  {cancel}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <ModifierPath
        editAble={type === 'update' ? getListEditAble(viewResult?.data?.editable) : {}}
        pathState={pathState}
        handleChangeState={onchangePathState}
        errorState={updateResult?.error?.result}
      />
    </div>
  )
}
