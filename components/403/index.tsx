import { useTranslation } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { DefaultLayout } from '../layout'

export const Component403 = () => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { breakPoint } = useSelector(ShareStoreSelector)

  const forbidden = useTranslation('forbidden')
  return (
    <DefaultLayout>
      <div
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          paddingTop: breakPoint === 1 ? 100 : 150,
        }}
      >
        <div
          style={{
            width: breakPoint === 1 ? '100%' : '20%',
            position: 'relative',
            aspectRatio: '1/1',
          }}
        >
          <Image layout="fill" src="/undraw_access_denied_re_awnf.svg" />
        </div>
        <div
          style={{
            fontSize: breakPoint === 1 ? 40 : 50,
            color: themeValue[darkTheme].colors.gray900,
          }}
        >
          {forbidden}
        </div>
      </div>
    </DefaultLayout>
  )
}
