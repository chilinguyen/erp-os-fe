import { Button, CustomTable, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, PathResponse, ViewPointType } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DeletePathPopup } from '../inventory'

export const PathsManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()
  const router = useRouter()

  const [pathSelectedId, setPathSelectedId] = useState<string[]>([])

  const [page, setPage] = useState<number>(1)

  const { breakPoint } = useSelector(ShareStoreSelector)

  const breadCrumb = useGetBreadCrumb()

  const pathsCreatePascal = useTranslation('createNewPath')

  const result = useApiCall<CommonListResultType<PathResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.paths.getPathList,
        token: cookies.token,
        params: { page: page.toString() },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const resultTableHeader = useApiCall<ViewPointType[], String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.table.getIgnoreFieldPath,
        token: cookies.token,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const { data, loading, setLetCall } = result

  useEffect(() => {
    resultTableHeader.setLetCall(true)
  }, [])

  useEffect(() => {
    setLetCall(true)
  }, [page])

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        <div style={{ display: 'flex', gap: 5 }}>
          <Button
            onClick={() => {
              router.push('/paths/create')
            }}
          >
            {pathsCreatePascal}
          </Button>
          <DeletePathPopup
            deleteId={pathSelectedId}
            setDeleteId={setPathSelectedId}
            setLetCallList={setLetCall}
          />
        </div>
      </div>
      <CustomTable
        header={resultTableHeader.data?.result ?? [{ key: '', label: '' }]}
        body={data ? data.result.data : []}
        selectionMode="single"
        loading={loading}
        handleChangeSelection={setPathSelectedId}
        selectedKeys={pathSelectedId}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          total={data?.result?.totalRows ?? 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
