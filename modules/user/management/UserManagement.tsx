import { useEffect } from 'react'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { UserListSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { listFunctionParseValue } from '@/modules/permission/inventory'
import { Button, CustomTable } from '@/components'

export const UserManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  // const [page, setPage] = useState<number>(1)

  const userManagementPascal = useTranslation('userManagementPascal')

  const createUserPascal = useTranslation('createUserPascal')

  const router = useRouter()

  const result = useApiCall<UserListSuccess, String>({
    callApi: () => getMethod(apiRoute.user.getListUser, cookies.token, { page: '1' }),
    // callApi: () => getMethod(apiRoute.user.getListUser, cookies.token, { page: page.toString() }),
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
  // }, [page])

  const listFunctionParseValues = listFunctionParseValue()

  return (
    <>
      {/* <Text showIn="sm" h2>
        {userManagementPascal}
      </Text> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{userManagementPascal}</h1>
        <Button
          onClick={() => {
            router.push('/user/create')
          }}
          // size="sm"
          auto
        >
          {createUserPascal}
        </Button>
      </div>
      <CustomTable
        header={data?.viewPoints ?? [{ key: '', label: '' }]}
        body={data ? data.result.data : []}
        selectionMode="single"
        listFunctionParseValue={listFunctionParseValues}
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      {/* {!loading && (
        <Pagination
          shadow
          color="default"
          total={getTotalPage(data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
          page={page}
          css={{ marginTop: 20 }}
        />
      )} */}
    </>
  )
  return null
}
