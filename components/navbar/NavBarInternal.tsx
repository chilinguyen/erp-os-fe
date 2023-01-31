import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Search } from '../search'

interface INavbarInternal {
  setOpenSideBar: React.MouseEventHandler<HTMLDivElement>
  pixel: number
}

export const NavbarInternal = ({ setOpenSideBar, pixel }: INavbarInternal) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const router = useRouter()

  return (
    <div
      style={{
        backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
        boxShadow: themeValue[darkTheme].shadows.lg,
        height: '3.75rem',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '10px',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {pixel < 960 && (
          <div onClick={setOpenSideBar} style={{ width: 'fit-content', height: 'fit-content' }}>
            <AiOutlineMenu size={25} />
          </div>
        )}
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            router.push('/dashboard')
          }}
        >
          icon
        </div>
      </div>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Search />
      </div>
      <div
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
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
