interface IDictionaryCreatePopup {
  listKeyOfDictionary: string[]
  setLetCallList: Function
  updateStoreLanguage: Function
  listKeyExist: string[]
}

export const DictionaryCreatePopup = ({
  setLetCallList,
  listKeyOfDictionary,
  updateStoreLanguage,
  listKeyExist,
}: IDictionaryCreatePopup) => {
  // const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  // const [dictionaryState, setDictionaryState] = useState<DictionaryKey>({})

  // const [open, setOpen] = useState(false)
  // const [checkKeyExist, setCheckKeyExist] = useState(false)

  // const translate = useTranslationFunction()

  // const handleClose = () => {
  //   setOpen(false)
  // }

  // const createResult = useApiCall<DictionaryKey, Record<keyof DictionaryKey, string>>({
  //   callApi: () => postMethod(apiRoute.language.addNewDictionary, cookies.token, dictionaryState),
  //   handleSuccess(message) {
  //     toast.success(translate(message))
  //     handleClose()
  //     setLetCallList(true)
  //     updateStoreLanguage()
  //   },
  //   handleError(status, message) {
  //     if (status) toast.error(translate(message))
  //   },
  // })

  // useEffect(() => {
  //   let newDictionaryState: DictionaryKey = {}
  //   listKeyOfDictionary.forEach((key) => {
  //     newDictionaryState = { ...newDictionaryState, [key]: '' }
  //   })
  //   setDictionaryState(newDictionaryState)
  // }, [listKeyOfDictionary])

  // const labelButton = useTranslation('createNewDict')

  // const cancel = useTranslation('cancel')

  // const create = useTranslation('create')

  // const keyExist = useTranslation('keyExist')

  return (
    <>
      {/* <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
      >
        {labelButton}
      </Button>
      <Modal open={open} onClose={handleClose} blur preventClose>
        <Modal.Header>
          <Text h2 id="modal-title">
            {labelButton}
          </Text>
        </Modal.Header>

        <Modal.Body>
          {checkKeyExist ? (
            <div style={{ textAlign: 'center' }}>{keyExist}</div>
          ) : (
            listKeyOfDictionary.map((key) => (
              <Input
                css={{ width: '100%' }}
                value={dictionaryState[key] ?? ''}
                label={key}
                onChange={(event) => {
                  setDictionaryState({
                    ...dictionaryState,
                    [key]: event.currentTarget.value,
                  })
                }}
                {...inputStylesLanguage({
                  error:
                    createResult?.error?.result.key && translate(createResult.error.result.key),
                })}
              />
            ))
          )}
        </Modal.Body>

        <Modal.Footer justify="center">
          <Button
            disabled={createResult.loading}
            auto
            color="warning"
            onClick={() => {
              if (checkKeyExist) {
                setCheckKeyExist(false)
              } else {
                handleClose()
              }
            }}
          >
            {cancel}
          </Button>

          <Button
            disabled={createResult.loading}
            auto
            color="success"
            onClick={() => {
              if (listKeyExist.includes(dictionaryState.key) && !checkKeyExist) {
                setCheckKeyExist(true)
              } else {
                createResult.setLetCall(true)
              }
            }}
          >
            {create}
          </Button>
        </Modal.Footer>
      </Modal> */}
      {setLetCallList}
      {listKeyOfDictionary}
      {updateStoreLanguage}
      {listKeyExist}
    </>
  )
}
