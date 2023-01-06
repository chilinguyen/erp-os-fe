import { TiDelete } from 'react-icons/ti'

interface IDeleteDictionaryPopup {
  dictionaryKey: string
  setLetCallList: Function
  updateStoreLanguage: Function
}

export const DeleteDictionaryPopup = ({
  dictionaryKey,
  setLetCallList,
  updateStoreLanguage,
}: IDeleteDictionaryPopup) => {
  // const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  // const [open, setOpen] = useState(false)

  // const translate = useTranslationFunction()

  // const handleClose = () => {
  //   setOpen(false)
  // }

  // const deleteResult = useApiCall({
  //   callApi: () =>
  //     putMethod(apiRoute.language.deleteDictionaryKey, cookies.token, { key: dictionaryKey }),
  //   handleSuccess(message) {
  //     toast.success(translate(message))
  //     setOpen(false)
  //     setLetCallList(true)
  //     updateStoreLanguage()
  //   },
  //   handleError(status, message) {
  //     if (status) toast.error(translate(message))
  //   },
  // })

  // const deleteLabel = useTranslation('delete')
  // const cancel = useTranslation('cancel')
  // const deleteKeyLabel = useTranslation('deleteKeyLabel')

  return (
    <>
      <TiDelete style={{ cursor: 'pointer' }} size={25} color="red" onClick={() => {}} />
      {dictionaryKey}
      {updateStoreLanguage}
      {setLetCallList}
      {/* <Modal open={open} onClose={handleClose} blur>
        <Modal.Header>
          <Text h2 id="modal-title">
            {deleteLabel} {dictionaryKey}
          </Text>
        </Modal.Header>

        <Modal.Body>{deleteKeyLabel}</Modal.Body>

        <Modal.Footer justify="center">
          <Button disabled={deleteResult.loading} auto color="warning" onClick={handleClose}>
            {cancel}
          </Button>

          <Button
            disabled={deleteResult.loading}
            auto
            color="success"
            onClick={() => {
              deleteResult.setLetCall(true)
            }}
          >
            {deleteLabel}
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}
