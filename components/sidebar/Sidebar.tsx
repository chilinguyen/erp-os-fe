import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useSelector } from 'react-redux'
import { NavBarItems } from './NavBarConstant'
import { RenderItemSideBar } from './RenderItemSideBar'
import { SideIconItem } from './SideIconItem'

interface ISideBar {
  isOpenSideBar: boolean
  setOpenSideBar: (v: boolean) => void
  pixel: number
}

export const SideBar = ({ isOpenSideBar, setOpenSideBar, pixel }: ISideBar) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  return (
    <>
      <div
        onClick={() => {
          setOpenSideBar(false)
        }}
        style={{
          position: pixel < 960 && isOpenSideBar ? 'fixed' : 'static',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          opacity: pixel < 960 && isOpenSideBar ? '20%' : 0,
          inset: 0,
          zIndex: pixel >= 960 ? 1 : 9999,
          transition: 'opacity 0.2s linear',
        }}
      />
      <div
        style={{
          display: 'flex',
          width: pixel >= 960 || isOpenSideBar ? 300 : 0,
          position: 'fixed',
          top: 60,
          left: 0,
          bottom: 0,
          zIndex: pixel >= 960 ? 2 : 10000,
          boxShadow: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
          fontWeight: 500,
          transition: 'all 0.2s linear',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60px',
            backgroundColor: themeValue[darkTheme].colors.primaryLight,
          }}
        >
          <SideIconItem />
        </div>
        <div
          style={{
            overflow: 'auto',
            backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
            width: 'calc(100% - 60px)',
          }}
        >
          {NavBarItems().map((item, index) => (
            <RenderItemSideBar
              key={item.path}
              item={item}
              hasDivide={index + 1 < NavBarItems().length}
              level={1}
            />
          ))}
        </div>
      </div>
    </>
  )
}
