import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { setLoading } from '@/redux/share-store'
import { getMethod } from '@/services'
import { NavbarResponseSuccess, PathResponse } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Backdrop } from '../backdrop'
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
  const [pathContent, setPathContent] = useState<
    {
      mainItem: PathResponse
      childrenItem: PathResponse[]
    }[]
  >([])

  const router = useRouter()

  const dispatch = useDispatch()

  const translate = useTranslationFunction()

  const getDetailSidebar = useApiCall<NavbarResponseSuccess, string>({
    callApi: () =>
      getMethod(apiRoute.navbar.getNavbarDetailName, cookies.token, {
        name: 'side-bar-icon',
      }),
    handleSuccess(message, data) {
      setPathContent(data.content)
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  const { loading } = getDetailSidebar

  useEffect(() => {
    getDetailSidebar.setLetCall(true)
  }, [])

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading])

  const childrenList =
    pathContent.find((item) => router.asPath.includes(item.mainItem.path))?.childrenItem || []

  const lengthSidebar = childrenList.length > 0 ? 300 : 60

  return (
    <>
      <Backdrop
        isShow={pixel < 960 && isOpenSideBar}
        zIndex={49}
        style={{
          top: 60,
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          backgroundColor: 'transparent',
        }}
        onClick={() => {
          setOpenSideBar(false)
        }}
      />
      <div
        style={{
          display: 'flex',
          width: pixel >= 960 || isOpenSideBar ? lengthSidebar : 0,
          position: 'fixed',
          top: 60,
          left: 0,
          bottom: 0,
          zIndex: pixel >= 960 ? 2 : 50,
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
            backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
            alignItems: 'center',
            borderRight: `1px solid ${themeValue[darkTheme].colors.border}`,
          }}
        >
          {pathContent.map((item) => (
            <SideIconItem link={item.mainItem.path} image={item.mainItem.icon} />
          ))}
        </div>
        <div
          style={{
            overflow: 'auto',
            backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
            width: 'calc(100% - 60px)',
          }}
        >
          {childrenList.length > 0 &&
            childrenList.map((item, index) => (
              <RenderItemSideBar
                key={item.path}
                item={item}
                hasDivide={index + 1 < childrenList.length}
                level={1}
              />
            ))}
        </div>
      </div>
    </>
  )
}
