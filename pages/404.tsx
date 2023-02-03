import { DefaultLayout } from '@/components'
import { useTranslation } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import Image from 'next/image'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'

const Page404 = () => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { breakPoint } = useSelector(ShareStoreSelector)

  const notFound = useTranslation('notFound')

  return (
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
        <Image layout="fill" src="/undraw_void_-3-ggu.svg" />
      </div>
      <div
        style={{
          fontSize: breakPoint === 1 ? 40 : 50,
          color: themeValue[darkTheme].colors.gray900,
        }}
      >
        {notFound}
      </div>
    </div>
  )
}

Page404.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Page404
