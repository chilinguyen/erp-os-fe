import { Button } from '@/components'
import { useTranslation } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { LanguageResponseSuccess } from '@/types'
import { BiExport } from 'react-icons/bi'
import { useSelector } from 'react-redux'

export const ExportLanguageFile = ({
  viewLanguageResult,
}: {
  viewLanguageResult: LanguageResponseSuccess[]
}) => {
  const { language, breakPoint } = useSelector(ShareStoreSelector)

  const labelExport = useTranslation('exportCSVLanguage')

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

  return (
    <a href={encodedUri} download="language">
      <Button
        style={{
          borderRadius: breakPoint > 1 ? undefined : '100%',
        }}
      >
        {breakPoint > 1 ? <>{labelExport}</> : <BiExport style={{ width: '80%', height: '80%' }} />}
      </Button>
    </a>
  )
}
