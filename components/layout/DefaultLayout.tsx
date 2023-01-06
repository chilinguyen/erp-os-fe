import { useResponsive } from '@/hooks'
import { useState } from 'react'
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

  return (
    <>
      {(!useNavbar || isOpenSideBar) && (
        <SideBar isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} pixel={pixel} />
      )}
      <div
        style={{
          width: !useNavbar && pixel >= 960 ? 'calc(100% - 300px)' : '100%',
          marginLeft: 'auto',
        }}
      >
        <div style={{ padding: '0 24px', margin: 'auto' }}>{children}</div>
      </div>
    </>
  )
}

export { DefaultLayout }
