import { Button } from '@/components'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Page403 = () => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const router = useRouter()

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
      }}
    >
      <div style={{ width: '20%', position: 'relative', aspectRatio: '1/1' }}>
        <Image layout="fill" src="/undraw_access_denied_re_awnf.svg" />
      </div>
      <div style={{ fontSize: 50, color: themeValue[darkTheme].colors.gray900 }}>ACCESS DENIED</div>
      <Button
        onClick={() => {
          router.push('/')
        }}
      >
        Back to dashboard
      </Button>
    </div>
  )
}

export default Page403
