export const PermissionManagement = () => {
  // const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  // const translate = useTranslationFunction()

  // const [page, setPage] = useState<number>(1)

  // const router = useRouter()

  // const permissionManagementPascal = useTranslation('permissionManagementPascal')

  // const permissionCreatePascal = useTranslation('permissionCreatePascal')

  // const result = useApiCall<CommonListResultType<PermissionResponse>, String>({
  //   callApi: () =>
  //     getMethod(apiRoute.permissions.getListPermission, cookies.token, { page: page.toString() }),
  //   handleError(status, message) {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  // })

  // const { data, loading, setLetCall } = result

  // useEffect(() => {
  //   setLetCall(true)
  // }, [])

  // return (
  //   <>
  //     <Text showIn="sm" h2>
  //       {permissionManagementPascal}
  //     </Text>
  //     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //       <Text hideIn="sm" h1>
  //         {permissionManagementPascal}
  //       </Text>
  //       <Button
  //         onClick={() => {
  //           router.push('/permission/create')
  //         }}
  //         size="sm"
  //       >
  //         {permissionCreatePascal}
  //       </Button>
  //     </div>
  //     <CustomTable
  //       header={data?.viewPoints ?? []}
  //       body={data ? data.result.data : []}
  //       selectionMode="single"
  //       listFunctionParseValue={{}}
  //       loading={loading}
  //     >
  //       <>{null}</>
  //     </CustomTable>
  //     {!loading && (
  //       <Pagination
  //         shadow
  //         color="default"
  //         total={getTotalPage(data?.result.totalRows || 0, 10)}
  //         onChange={(number) => setPage(number)}
  //         page={page}
  //         css={{ marginTop: 20 }}
  //       />
  //     )}
  //   </>
  // )
  return null
}
