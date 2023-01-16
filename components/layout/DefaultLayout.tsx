import { useResponsive } from '@/hooks'
import { useState } from 'react'
import { NavbarInternal } from '../navbar'
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

  const toggleSideBar = () => {
    setOpenSideBar(!isOpenSideBar)
  }

  return (
    <>
      {(!useNavbar || isOpenSideBar) && (
        <SideBar isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} pixel={pixel} />
      )}
      <NavbarInternal setOpenSideBar={toggleSideBar} pixel={pixel} />
      <div
        style={{
          width: !useNavbar && pixel >= 960 ? 'calc(100% - 300px)' : '100%',
          marginLeft: 'auto',
          marginTop: '3.75rem',
        }}
      >
        <div style={{ padding: '0px 24px' }}>{children}</div>
      </div>
    </>
  )
}

export { DefaultLayout }
