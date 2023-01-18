import { Button, CustomTable, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, PermissionResponse } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const PermissionManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const permissionManagementPascal = useTranslation('permissionManagementPascal')

  const permissionCreatePascal = useTranslation('permissionCreatePascal')

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<PermissionResponse>, String>({
    callApi: () =>
      getMethod(apiRoute.permissions.getListPermission, cookies.token, { page: page.toString() }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const { data, loading, setLetCall } = result

  useEffect(() => {
    setLetCall(true)
  }, [])

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{permissionManagementPascal}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>
          {permissionManagementPascal}
        </h1>
        <Button
          onClick={() => {
            router.push('/permission/create')
          }}
          size="sm"
        >
          {permissionCreatePascal}
        </Button>
      </div>
      <CustomTable
        header={data?.viewPoints ?? []}
        body={data ? data.result.data : []}
        listFunctionParseValue={{}}
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          total={data?.result.totalRows || 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
