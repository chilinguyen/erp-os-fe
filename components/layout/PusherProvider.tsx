import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { authenticationSelector } from '@/redux/authentication'
import {
  GeneralSettingsSelector,
  setIsUpdateAccess,
  setIsUpdateNotification,
  setUserConfig,
} from '@/redux/general-settings'
import { getMethod } from '@/services'
import { UserConfig } from '@/types'
import Pusher from 'pusher-js'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const PusherProvider = ({ children }: { children: React.ReactNode }) => {
  const { accountConfig } = useSelector(GeneralSettingsSelector)
  const { isLoggedIn } = useSelector(authenticationSelector)

  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const dispatch = useDispatch()

  useEffect(() => {
    if (window) {
      const nav = window.navigator.userAgent
      if (!nav.toLowerCase().includes('iphone') && accountConfig.notificationId) {
        /* @ts-ignore */
        const beamsClient = new PusherPushNotifications.Client({
          instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID,
        })

        beamsClient.start().then(() => beamsClient.addDeviceInterest(accountConfig.notificationId))
      }
      if (accountConfig.channelId && accountConfig.eventId) {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || '', {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
        })

        const channel = pusher.subscribe(accountConfig.channelId)
        channel.bind(accountConfig.eventId, function (data: any) {
          if (data.isUpdateAccessPath) dispatch(setIsUpdateAccess(data.isUpdateAccessPath))
          if (data.isUpdateNotification)
            dispatch(setIsUpdateNotification(data.isUpdateNotification))
        })
      }
    }
  }, [accountConfig])

  const resultUserConfig = useApiCall<UserConfig, string>({
    callApi: () => getMethod({ pathName: apiRoute.user.userConfig, token: cookies.token }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message, data) {
      dispatch(setUserConfig(data))
    },
  })

  useEffect(() => {
    if (isLoggedIn) {
      resultUserConfig.setLetCall(true)
    }
  }, [isLoggedIn])

  return <>{children}</>
}
