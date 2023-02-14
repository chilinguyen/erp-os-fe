import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import { useRouter } from 'next/router'
import React from 'react'
import { CgMenuRound } from 'react-icons/cg'
import { IoNotificationsCircleOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Search } from '../search'

interface INavbarInternal {
  setOpenSideBar: React.MouseEventHandler<HTMLDivElement>
  setOpenNoti: React.MouseEventHandler<HTMLDivElement>
  pixel: number
}

export const NavbarInternal = ({ setOpenSideBar, pixel, setOpenNoti }: INavbarInternal) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { breakPoint } = useSelector(ShareStoreSelector)

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
        zIndex: 5,
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
        {pixel < 1280 && (
          <div onClick={setOpenSideBar} style={{ width: 'fit-content', height: 'fit-content' }}>
            <CgMenuRound size={25} />
          </div>
        )}
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (router.pathname !== '/dashboard') {
              router.push('/dashboard')
            }
          }}
        >
          icon
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {breakPoint > 2 && <Search />}
      </div>
      <div
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 8,
        }}
      >
        {pixel < 1280 && (
          <div onClick={setOpenNoti} style={{ width: 'fit-content', height: 'fit-content' }}>
            <IoNotificationsCircleOutline size={25} />
          </div>
        )}
      </div>
    </div>
  )
}
