import { FloatTray } from '@/components'
import { SpeedDialType } from '@/types'
import { DictionaryCreatePopup } from './DictionaryCreatePopup'
import { ExportLanguageFile } from './ExportLanguageFile'
import { InputLanguageFile } from './InputLanguageFile'
import { LanguageCreatePopup } from './LanguageCreatePopup'

interface IFloatTrayDetail {
  viewLanguageresult: any
  getLanguage: any
  updateStoreLanguage: Function
}

export const FLoatTrayLanguage = ({
  viewLanguageresult,
  getLanguage,
  updateStoreLanguage,
}: IFloatTrayDetail) => {
  const getSpeedDiaList = () => {
    const speedList: SpeedDialType[] = [
      {
        label: (
          <DictionaryCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
            listKeyOfDictionary={[
              'key',
              ...(viewLanguageresult.data?.result.data.map((language: any) => language.key) ?? []),
            ]}
            listKeyExist={Object.keys(getLanguage.data?.result?.dictionary ?? {})}
          />
        ),
        function: () => {},
        color: 'primary',
      },
      {
        label: (
          <LanguageCreatePopup
            updateStoreLanguage={updateStoreLanguage}
            setLetCallList={viewLanguageresult.setLetCall}
          />
        ),
        function: () => {},
        color: 'primary',
      },
      {
        label: <InputLanguageFile setLetCall={viewLanguageresult.setLetCall} />,
        function: () => {},
        color: 'primary',
      },
      {
        label: (
          <ExportLanguageFile viewLanguageResult={viewLanguageresult.data?.result.data ?? []} />
        ),
        function: () => {},
        color: 'primary',
      },
    ]

    return speedList
  }

  return <FloatTray buttonList={getSpeedDiaList()} />
}
