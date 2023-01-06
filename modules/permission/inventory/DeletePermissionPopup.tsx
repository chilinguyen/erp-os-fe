export const DeletePermissionPopup = () => {
  // const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  // const [open, setOpen] = useState(false)
  // const router = useRouter()

  // const translate = useTranslationFunction()

  // const handleClose = () => {
  //   setOpen(false)
  // }

  // const deleteResult = useApiCall<string, string>({
  //   callApi: () =>
  //     putMethod(apiRoute.permissions.deletePermission, cookies.token, {
  //       id: router?.query?.id?.toString() ?? '1',
  //     }),
  //   handleError(status, message) {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  //   handleSuccess(message) {
  //     toast.success(translate(message))
  //     router.push('/permission/management')
  //   },
  // })

  // const deleteLabel = useTranslation('delete')
  // const cancel = useTranslation('cancel')
  // const deleteKeyLabel = useTranslation('deleteKeyLabel')

  return (
    <>
      {null}
      {/* <Button
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
        color="error"
      >
        {deleteLabel}
      </Button>
      <Modal open={open} onClose={handleClose} blur>
        <Modal.Header>
          <Text h2 id="modal-title">
            {deleteLabel}
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
