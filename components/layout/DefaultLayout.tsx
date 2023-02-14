import { useResponsive } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NavbarInternal } from '../navbar'
import { NotificationSidebar } from '../notification-sidebar'
import { SideBar } from '../sidebar'

const DefaultLayout = ({
  children,
  useNavbar,
}: {
  children: React.ReactNode
  useNavbar?: boolean
}) => {
  const pixel = useResponsive()
  const [isOpenSideBar, setOpenSideBar] = useState(false)
  const [isOpenNoti, setOpenNoti] = useState(false)

  const toggleSideBar = () => {
    setOpenSideBar(!isOpenSideBar)
    setOpenNoti(false)
  }

  const toggleNoti = () => {
    setOpenNoti(!isOpenNoti)
    setOpenSideBar(false)
  }

  const router = useRouter()

  useEffect(() => {
    setOpenSideBar(false)
    setOpenNoti(false)
  }, [router])

  const getWidthDiscard = () => {
    let thisWidth = 0
    if (pixel >= 1280) thisWidth += 600
    return thisWidth
  }

  return (
    <>
      {(!useNavbar || isOpenSideBar) && (
        <SideBar isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} pixel={pixel} />
      )}
      <NavbarInternal setOpenSideBar={toggleSideBar} setOpenNoti={toggleNoti} pixel={pixel} />
      <div
        style={{
          width: !useNavbar ? `calc(100% - ${getWidthDiscard()}px)` : '100%',
          marginLeft: pixel >= 1280 ? 'auto' : undefined,
          marginRight: pixel >= 1280 ? 'auto' : undefined,
          marginTop: '3.75rem',
        }}
      >
        <div style={{ padding: '0px 24px' }}>{children}</div>
      </div>
      {(!useNavbar || isOpenSideBar) && (
        <NotificationSidebar
          isOpenSideBar={isOpenNoti}
          setOpenSideBar={setOpenNoti}
          pixel={pixel}
        />
      )}
    </>
  )
}

export { DefaultLayout }
