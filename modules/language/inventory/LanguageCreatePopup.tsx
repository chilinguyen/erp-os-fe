import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { addNewLanguage } from '@/services'
import { AddNewLanguageRequest, LanguageRequest } from '@/types'
import { Button, Input, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { inputStylesLanguage } from './Language.inventory'

interface ILanguageCreatePopup {
  setLetCallList: Function
  updateStoreLanguage: Function
}

export const LanguageCreatePopup = ({
  setLetCallList,
  updateStoreLanguage,
}: ILanguageCreatePopup) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const translate = useTranslationFunction()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const [languageState, setLanguageState] = useState<AddNewLanguageRequest>({
    key: '',
    language: '',
  })

  const handleChangeState = (newUpdate: Partial<AddNewLanguageRequest>) => {
    const newLanguageState = { ...languageState }
    setLanguageState({ ...newLanguageState, ...newUpdate })
  }

  const createResult = useApiCall<LanguageRequest, Record<keyof LanguageRequest, string>>({
    callApi: () => addNewLanguage(cookies.token, languageState),
    handleSuccess(message) {
      toast.success(translate(message))
      handleClose()
      setLetCallList(true)
      updateStoreLanguage()
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  const labelButton = useTranslation('createNewLang')

  const labelKey = useTranslation('languageKey')

  const labelName = useTranslation('languageName')

  const cancel = useTranslation('cancel')

  const create = useTranslation('create')

  return (
    <>
      <Button
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
          <Input
            css={{ width: '100%' }}
            value={languageState.key}
            label={labelKey}
            onChange={(event) => {
              handleChangeState({
                key: event.currentTarget.value,
              })
            }}
            {...inputStylesLanguage({
              error: createResult?.error?.result.key && translate(createResult.error.result.key),
            })}
          />
          <Input
            css={{ width: '100%' }}
            value={languageState.language}
            label={labelName}
            onChange={(event) => {
              handleChangeState({
                language: event.currentTarget.value,
              })
            }}
            {...inputStylesLanguage({
              error:
                createResult?.error?.result.language &&
                translate(createResult.error.result.language),
            })}
          />
        </Modal.Body>

        <Modal.Footer justify="center">
          <Button disabled={createResult.loading} auto color="warning" onClick={handleClose}>
            {cancel}
          </Button>

          <Button
            disabled={createResult.loading}
            auto
            color="success"
            onClick={() => {
              createResult.setLetCall(true)
            }}
          >
            {create}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
