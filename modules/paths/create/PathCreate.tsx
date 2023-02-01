import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { PathRequest, PathRequestFailure } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ModifierPath, PathRequestDefault } from '../inventory'

export const PathCreate = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()
  const { breakPoint } = useSelector(ShareStoreSelector)
  const router = useRouter()

  const [pathState, setPathState] = useState<PathRequest>(PathRequestDefault)

  const createResult = useApiCall<PathRequest, PathRequestFailure>({
    callApi: () =>
      postMethod({ pathName: apiRoute.paths.addNewPath, token: cookies.token, request: pathState }),
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/paths/management')
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const handleChangeState = (NewUpdate: Partial<PathRequest>) => {
    const newState = { ...pathState, ...NewUpdate }
    setPathState(newState)
  }

  const cancel = useTranslation('cancel')
  const breadCrumb = useGetBreadCrumb()
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
              router.push('/paths/management')
            }}
            disabled={createResult.loading}
          >
            {cancel}
          </Button>
        </div>
      </div>

      <ModifierPath
        editAble={{ icon: true, label: true, path: true, type: true, userId: true }}
        pathState={pathState}
        handleChangeState={handleChangeState}
        errorState={createResult?.error?.result}
      />
    </div>
  )
}
