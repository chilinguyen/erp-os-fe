import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { setLoading } from '@/redux/share-store'
import { getMethod } from '@/services'
import { NavbarResponseSuccess, PathListResponse, PathResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
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
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const [pathIds, setPathIds] = useState<string[]>([])
  const [pathContent, setPathContent] = useState<PathResponse[]>([])

  const dispatch = useDispatch()

  const translate = useTranslationFunction()

  const getDetailSidebar = useApiCall<NavbarResponseSuccess, string>({
    callApi: () =>
      getMethod(apiRoute.navbar.getNavbarDetailName, cookies.token, {
        name: 'side-bar-icon',
      }),
    handleSuccess(message, data) {
      setPathIds(data.content)
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  const getPathsList = useApiCall<PathListResponse, string>({
    callApi: () =>
      getMethod(apiRoute.paths.getPathList, cookies.token, {
        _id: String(pathIds),
      }),
    handleSuccess(message, data) {
      setPathContent(data.data)
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  const loading = getPathsList.loading || getDetailSidebar.loading

  useEffect(() => {
    getDetailSidebar.setLetCall(true)
  }, [])

  useEffect(() => {
    if (pathIds.length > 0) {
      getPathsList.setLetCall(true)
    }
  }, [pathIds])

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading])

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
            width: pixel >= 960 || isOpenSideBar ? '60px' : 0,
            backgroundColor: themeValue[darkTheme].colors.gray200,
            alignItems: 'center',
          }}
        >
          {pathContent.map((item) => (
            <SideIconItem link={item.path} image={item.icon} />
          ))}
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
