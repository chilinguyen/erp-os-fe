import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { UserListSuccess, ViewPointType } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { BsPersonPlus } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const UserManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const [page, setPage] = useState<number>(1)

  const createUserPascal = useTranslation('createUserPascal')

  const router = useRouter()

  const breadCrumb = useGetBreadCrumb()

  const result = useApiCall<UserListSuccess, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getListUser,
        token: cookies.token,
        params: { page: String(page) },
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
        pathName: apiRoute.table.getIgnoreFieldUser,
        token: cookies.token,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const handleRidrecCreate = () => {
    router.push('/user/create')
  }

  const { data, loading, setLetCall } = result

  useEffect(() => {
    setLetCall(true)
    resultTableHeader.setLetCall(true)
  }, [page])

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {breakPoint > 1 ? (
          <Button onClick={handleRidrecCreate}>{createUserPascal}</Button>
        ) : (
          <FloatButton
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              aspectRatio: '1',
            }}
            onClick={handleRidrecCreate}
          >
            <BsPersonPlus style={{ width: '70%', height: '70%' }} />
          </FloatButton>
        )}
      </div>
      <CustomTable
        header={resultTableHeader.data?.result ?? [{ key: '', label: '' }]}
        body={data ? data.result.data : []}
        loading={loading}
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
