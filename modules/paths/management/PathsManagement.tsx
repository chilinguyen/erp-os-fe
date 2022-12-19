import { CustomTable } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { getTotalPage } from '@/lib'
import { getMethod } from '@/services'
import { CommonListResultType, PathResponse } from '@/types'
import { Pagination, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { CreatePathPopup } from '../create/CreatePathPopup'
import { DeletePathPopup } from '../delete/DeletePathPopup'
import { Header } from './management.inventory'

export const PathsManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const [pathSelectedId, setPathSelectedId] = useState<string[]>([])

  const [page, setPage] = useState<number>(1)

  const pathsPascal = useTranslation('path')

  const result = useApiCall<CommonListResultType<PathResponse>, String>({
    callApi: () => getMethod(apiRoute.paths.getPathList, cookies.token, { page: page.toString() }),
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

  const header = Header()

  return (
    <>
      <Text showIn="sm" h2>
        {pathsPascal}
      </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text hideIn="sm" h1>
          {pathsPascal}
        </Text>
        <div style={{ display: 'flex', gap: 5 }}>
          <CreatePathPopup callList={setLetCall} />
          <DeletePathPopup
            deleteId={pathSelectedId}
            setDeleteId={setPathSelectedId}
            setLetCallList={setLetCall}
          />
        </div>
      </div>
      <CustomTable<PathResponse>
        header={header}
        body={data ? data.result.data : []}
        selectionMode="single"
        listFunctionParseValue={{}}
        loading={loading}
        handleChangeSelection={setPathSelectedId}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          shadow
          color="default"
          total={getTotalPage(data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
          page={page}
          css={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
