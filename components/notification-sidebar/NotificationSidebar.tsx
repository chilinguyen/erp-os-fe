import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector, setIsUpdateNotification } from '@/redux/general-settings'
import { setNotifications, ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { UserNotifications } from '@/types'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Backdrop } from '../backdrop'
import { NotificationItem } from './NotificationItem'

interface INotiSideBar {
  isOpenSideBar: boolean
  setOpenSideBar: (v: boolean) => void
  pixel: number
}

export const NotificationSidebar = ({ isOpenSideBar, setOpenSideBar, pixel }: INotiSideBar) => {
  const { darkTheme, isUpdateNotification } = useSelector(GeneralSettingsSelector)
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const { notifications } = useSelector(ShareStoreSelector)

  const translate = useTranslationFunction()
  const dispatch = useDispatch()

  const getDetailSidebar = useApiCall<UserNotifications[], string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.userNotification,
        token: cookies.token,
      }),
    handleSuccess(message, data) {
      dispatch(setNotifications(data))
      dispatch(setIsUpdateNotification(false))
      toast.info(data[0].content)
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    if (isUpdateNotification) {
      getDetailSidebar.setLetCall(true)
    }
  }, [isUpdateNotification])

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
          right: 0,
          bottom: 0,
          zIndex: pixel >= 1280 ? 2 : 50,
          boxShadow: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
          fontWeight: 500,
          transition: 'all 0.2s linear',
          overflow: 'auto',
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
        <div
          style={{
            width: '100%',
            height: '60px',
            aspectRatio: '1/1',
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 5,
            padding: '0px 20px',
            cursor: 'pointer',
            position: 'relative',
            borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
          }}
        >
          <h3>Notification</h3>
        </div>
        {notifications.map((item) => (
          <NotificationItem data={item} />
        ))}
      </div>
    </>
  )
}
