export const PathsManagement = () => {
  // const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  // const translate = useTranslationFunction()

  // const [pathSelectedId, setPathSelectedId] = useState<string[]>([])

  // const [page, setPage] = useState<number>(1)

  // const pathsPascal = useTranslation('path')

  // const result = useApiCall<CommonListResultType<PathResponse>, String>({
  //   callApi: () => getMethod(apiRoute.paths.getPathList, cookies.token, { page: page.toString() }),
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

  return (
    <>
      {/* <Text showIn="sm" h2>
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
      <CustomTable
        header={data?.viewPoints ?? [{ key: '', label: '' }]}
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
      )} */}
    </>
  )
}
