import { Button, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { putMethod } from '@/services'
import { DictionaryKey, LanguageResponseSuccess, UpdateDictionaryListRequest } from '@/types'
import { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { TiDelete } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const IOCsvLanguage = ({
  viewLanguageResult,
  setLetCall,
}: {
  viewLanguageResult: LanguageResponseSuccess[]
  setLetCall: Function
}) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const { language } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [open, setOpen] = useState(false)
  const [stateLanguage, setStateLanguage] = useState<UpdateDictionaryListRequest>([])
  const [uploadFileName, setUploadFileName] = useState<string>('')

  const labelInput = useTranslation('inputCSVLanguage')
  const labelExport = useTranslation('exportCSVLanguage')
  const overrideData = useTranslation('overrideData')
  const submit = useTranslation('submit')
  const cancel = useTranslation('cancel')

  const data = useApiCall<string, string>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.language.updateDictionaryList,
        token: cookies.token,
        request: stateLanguage,
      }),
    handleSuccess(message) {
      toast.success(translate(message))
      setLetCall(true)
      setStateLanguage([])
      setUploadFileName('')
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const headers = ['key'].concat(viewLanguageResult.map((language) => language.id) ?? [])
  const rows = Object.keys(language).map((key) => {
    return [key].concat(viewLanguageResult.map((language) => language.dictionary[key]) ?? [])
  })
  const csvContent = 'data:text/csv;charset=utf-8,'.concat(
    [headers]
      .concat(rows)
      .map((e) => e.join(','))
      .join('\n')
  )
  const encodedUri = encodeURI(csvContent)

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      setUploadFileName(e?.target?.files[0].name)
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = (event?.target?.result ?? '').toString()
        const headers = text.slice(0, text.indexOf('\n')).split(',')
        const rows = text.slice(text.indexOf('\n') + 1).split('\n')

        const newUpdate = headers.slice(1, headers.length).map((header, index) => {
          let dictionary: DictionaryKey = {}

          rows.forEach((row) => {
            const value = row.split(',')
            dictionary = { ...dictionary, [value[0]]: value[index + 1] }
          }, {})

          return { id: header, dictionary }
        })

        setStateLanguage(newUpdate)
        setOpen(true)
      }
      reader.readAsText(e.target.files[0])
    }
  }

  const handleDiscardFile = () => {
    setUploadFileName('')
    setStateLanguage([])
  }

  return (
    <>
      {uploadFileName ? (
        <Button size="sm" onClick={handleDiscardFile}>
          {uploadFileName}
          <TiDelete size={25} color="red" />
        </Button>
      ) : (
        <Button size="sm" style={{ position: 'relative' }}>
          <input
            style={{
              opacity: '0',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              position: 'absolute',
            }}
            type="file"
            id="csvFile"
            accept=".csv"
            onChange={handleUploadFile}
          />
          {labelInput}
        </Button>
      )}
      <a href={encodedUri} download="language">
        <Button size="sm">{labelExport}</Button>
      </a>

      <Modal open={open} preventClose>
        <h2>{labelExport}</h2>

        <h4>{overrideData}!</h4>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            auto
            styleType="flat"
            onClick={() => {
              setOpen(false)
              setStateLanguage([])
            }}
          >
            {cancel}
          </Button>
          <Button
            auto
            styleType="flat"
            onClick={() => {
              setOpen(false)
              data.setLetCall(true)
            }}
          >
            {submit}
          </Button>
        </div>
      </Modal>
    </>
  )
}
