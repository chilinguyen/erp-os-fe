import { Button, CustomTable, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { listFunctionParseValue } from '@/modules/permission/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { UserListSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
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

  const { data, loading, setLetCall } = result

  useEffect(() => {
    setLetCall(true)
  }, [page])

  const listFunctionParseValues = listFunctionParseValue()

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        <Button
          onClick={() => {
            router.push('/user/create')
          }}
        >
          {createUserPascal}
        </Button>
      </div>
      <CustomTable
        header={data?.viewPoints ?? [{ key: '', label: '' }]}
        body={data ? data.result.data : []}
        listFunctionParseValue={listFunctionParseValues}
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
