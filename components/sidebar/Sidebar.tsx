import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector, setIsUpdateSidebar } from '@/redux/general-settings'
import { setSidebar, ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { NavbarResponseSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Backdrop } from '../backdrop'
import { AccountInformation } from './AccountInformation'
import { RenderItemSideBar } from './RenderItemSideBar'
import { SideIconItem } from './SideIconItem'

interface ISideBar {
  isOpenSideBar: boolean
  setOpenSideBar: (v: boolean) => void
  pixel: number
}

export const SideBar = ({ isOpenSideBar, setOpenSideBar, pixel }: ISideBar) => {
  const { darkTheme, isUpdateSidebar } = useSelector(GeneralSettingsSelector)
  const { sidebar } = useSelector(ShareStoreSelector)
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()
  const dispatch = useDispatch()

  const translate = useTranslationFunction()

  const getDetailSidebar = useApiCall<NavbarResponseSuccess, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.navbar.getNavbarDetailName,
        token: cookies.token,
        params: {
          name: 'side-bar-icon',
        },
      }),
    handleSuccess(message, data) {
      dispatch(setSidebar(data.content))
      dispatch(setIsUpdateSidebar(false))
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  useEffect(() => {
    if (isUpdateSidebar) {
      getDetailSidebar.setLetCall(true)
    }
  }, [isUpdateSidebar])

  const childrenList =
    sidebar.find((item) =>
      item.childrenItem.find((childItem) => childItem.path.includes(router.pathname.split('/')[1]))
    )?.childrenItem || []

  const lengthSidebar = childrenList.length === 0 ? 300 : 60

  return (
    <>
      <Backdrop
        isShow={pixel < 1280 && isOpenSideBar}
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
          width: pixel >= 1280 || isOpenSideBar ? 300 : 0,
          position: 'fixed',
          top: 60,
          left: 0,
          bottom: 0,
          zIndex: pixel >= 960 ? 2 : 50,
          boxShadow: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
          fontWeight: 500,
          transition: 'all 0.2s linear',
          overflow: 'hidden',
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
        }}
      >
        {pixel < 1280 && !isOpenSideBar ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'transparent',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 1,
            }}
          />
        ) : null}
        <AccountInformation />

        <div
          style={{
            display: 'flex',
            marginTop: 10,
            height: '100%',
            borderTop: `1px solid ${themeValue[darkTheme].colors.border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: pixel >= 1280 || isOpenSideBar ? lengthSidebar : 0,
              alignItems: 'center',
            }}
          >
            {sidebar.map((item) => (
              <SideIconItem
                link={item.mainItem.path}
                image={item.mainItem.icon}
                label={item.mainItem.label}
                isLabel={childrenList.length === 0}
              />
            ))}
          </div>
          {childrenList.length > 0 && (
            <div
              style={{
                overflow: 'auto',
                width: 'calc(100% - 60px)',
                borderLeft: `1px solid ${themeValue[darkTheme].colors.border}`,
              }}
            >
              {childrenList.map((item, index) => (
                <RenderItemSideBar
                  key={item.path}
                  item={item}
                  hasDivide={index + 1 < childrenList.length}
                  level={1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
