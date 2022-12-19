import { SelectCustom } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { postMethod } from '@/services'
import { PathRequest, PathTypeEnum } from '@/types'
import { Button, Input, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { inputStylesPath, PathTypeList } from '../inventory'

interface ICreatePathPopup {
  callList: (v: boolean) => void
}

export const CreatePathPopup = ({ callList }: ICreatePathPopup) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const [pathState, setPathState] = useState<PathRequest>({
    path: '',
    label: '',
    type: PathTypeEnum.INTERNAL,
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setPathState({ path: '', label: '', type: PathTypeEnum.INTERNAL })
    setOpen(false)
  }

  const createResult = useApiCall<PathRequest, PathRequest>({
    callApi: () => postMethod(apiRoute.paths.addNewPath, cookies.token, pathState),
    handleSuccess(message) {
      toast.success(translate(message))
      callList(true)
      handleClose()
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const pathsPascal = useTranslation('path')
  const cancel = useTranslation('cancel')
  const create = useTranslation('create')
  const pathsCreatePascal = useTranslation('createNewPath')
  const label = useTranslation('label')
  const type = useTranslation('type')

  return (
    <>
      <Button onClick={handleOpen} size="sm">
        {pathsCreatePascal}
      </Button>
      <Modal open={open} onClose={handleClose} blur preventClose>
        <Modal.Header>
          <Text h2 id="modal-title">
            {pathsCreatePascal}
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Input
            css={{ width: '100%' }}
            value={pathState.path}
            label={pathsPascal}
            onChange={(event) => {
              setPathState({ ...pathState, path: event.target.value })
            }}
            {...inputStylesPath({
              error: createResult?.error?.result.path && translate(createResult.error.result.path),
            })}
          />
          <Input
            css={{ width: '100%' }}
            value={pathState.label}
            label={label}
            onChange={(event) => {
              setPathState({ ...pathState, label: event.target.value })
            }}
            {...inputStylesPath({
              error:
                createResult?.error?.result.label && translate(createResult.error.result.label),
            })}
          />
          <SelectCustom<PathTypeEnum>
            value={pathState.type}
            onChange={(value) => {
              setPathState({ ...pathState, type: value })
            }}
            label={type}
            options={PathTypeList()}
            buttonProps={{
              ...inputStylesPath({
                error:
                  createResult?.error?.result.type && translate(createResult.error.result.type),
              }),
              width: '100%',
            }}
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
