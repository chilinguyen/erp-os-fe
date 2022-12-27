import { useResponsive } from '@/hooks'
import { useState } from 'react'
import { NavBar } from '../navbar'
import { SideBar } from '../sidebar'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const pixel = useResponsive()
  const [isOpenSideBar, setOpenSideBar] = useState(false)

  return (
    <>
      <NavBar isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} />
      <SideBar isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} pixel={pixel} />
      <div style={{ width: pixel >= 960 ? 'calc(100% - 300px)' : '100%', marginLeft: 'auto' }}>
        <div style={{ padding: '0 24px', margin: 'auto' }}>{children}</div>
      </div>
    </>
  )
}

export { DefaultLayout }
