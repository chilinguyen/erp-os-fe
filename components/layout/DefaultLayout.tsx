import { useResponsive } from '@/hooks'
import { NavBar } from '../navbar'
import { SideBar } from '../sidebar'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const pixel = useResponsive()

  return (
    <>
      <NavBar />
      {pixel >= 960 && <SideBar />}
      <div style={{ width: pixel >= 960 ? 'calc(100% - 300px)' : '100%', marginLeft: 'auto' }}>
        <div style={{ maxWidth: 1400, padding: '0 24px', margin: 'auto' }}>{children}</div>
      </div>
    </>
  )
}

export { DefaultLayout }
