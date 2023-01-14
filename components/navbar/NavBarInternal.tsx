import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { Search } from '../search'

export const NavbarInternal = () => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <div
      style={{
        backgroundColor: themeValue[darkTheme].colors.gray200,
        height: '3.75rem',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '10px',
      }}
    >
      <div style={{ width: 'fit-content' }}>icon</div>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Search />
      </div>
      <div
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            height: '70%',
            aspectRatio: '1/1',
            position: 'relative',
            borderRadius: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src="https://thumbs.dreamstime.com/z/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
            layout="fill"
          />
        </div>
      </div>
    </div>
  )
}
