import { Button } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { PathRequest, PathResponse } from '@/types'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { DeletePathPopup } from '../delete/DeletePathPopup'
import { ModifierPath, PathRequestDefault } from '../inventory'

export const PathDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const { breakPoint } = useSelector(ShareStoreSelector)
  const router = useRouter()

  const [pathState, setPathState] = useState<PathRequest>(PathRequestDefault)

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

  const cancel = useTranslation('cancel')
  const breadCrumb = useGetBreadCrumb()

  useEffect(() => {
    if (router?.query?.id) {
      viewResult.setLetCall(true)
    }
  }, [router?.query?.id])

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
          </div>
        </div>
      </div>

      <ModifierPath
        editAble={{ userId: true }}
        pathState={pathState}
        handleChangeState={() => {}}
        errorState={{}}
      />
    </div>
  )
}
