export const LanguageManagement = () => {
  // const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  // const translate = useTranslationFunction()

  // const viewLanguageresult = useApiCall<CommonListResultType<LanguageResponseSuccess>, String>({
  //   callApi: () => getMethod(apiRoute.language.getLanguageList, cookies.token),
  //   handleError(status, message) {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  // })

  // const dispatch = useDispatch()

  // const { languageKey } = useSelector(GeneralSettingsSelector)

  // const getLanguage = useApiCall<LanguageResponseSuccess, string>({
  //   callApi: () =>
  //     getMethod(apiRoute.language.getLanguageByKey, cookies.token, { key: languageKey }),
  //   handleError(status, message) {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  //   handleSuccess(message, data) {
  //     dispatch(setLanguage(data.dictionary))
  //   },
  // })

  // const updateStoreLanguage = () => {
  //   getLanguage.setLetCall(true)
  // }

  // useEffect(() => {
  //   viewLanguageresult.setLetCall(true)
  // }, [])

  return (
    <>
      {/* <Text showIn="sm" h2>
        {useTranslation('langMangPascal')}
      </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text hideIn="sm" h1>
          {useTranslation('langMangPascal')}
        </Text>
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <DictionaryCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
            listKeyOfDictionary={[
              'key',
              ...(viewLanguageresult.data?.result.data.map((language) => language.key) ?? []),
            ]}
            listKeyExist={Object.keys(getLanguage.data?.result?.dictionary ?? {})}
          />
          <LanguageCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
          />
          <IOCsvLanguage
            viewLanguageResult={viewLanguageresult.data?.result.data ?? []}
            setLetCall={viewLanguageresult.setLetCall}
          />
        </div>
      </div>

      {viewLanguageresult.loading ? (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Loading size="md" />
        </div>
      ) : (
        <Collapse.Group>
          {viewLanguageresult.data?.result.data.map((language) => (
            <Collapse title={language.language}>
              <OneLanguage
                updateStoreLanguage={updateStoreLanguage}
                language={language}
                setLetCallList={viewLanguageresult.setLetCall}
              />
            </Collapse>
          ))}
        </Collapse.Group>
      )} */}
    </>
  )
}
