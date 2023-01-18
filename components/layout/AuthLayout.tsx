import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { authenticationSelector, setIsLoggedIn } from '@/redux/authentication'
import { getMethod, postMethod } from '@/services'
import { LoginResponseSuccess, TypeAccount } from '@/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Component403 } from '../403'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const [chatStatus, setChatStatus] = useState<string>('out')
  const translate = useTranslationFunction()
  const [googleToken, setGoogleToken] = useState('')
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [accessPath, setAccessPath] = useState<String[]>([])
  const { isLoggedIn } = useSelector(authenticationSelector)
  const dispatch = useDispatch()

  const outChatRoom = useApiCall({
    callApi: () => postMethod(apiRoute.message.outChatRoom, cookies.token),
  })

  const inChatRoom = useApiCall({
    callApi: () => postMethod(apiRoute.message.toChatRoom, cookies.token),
  })

  const loginWithGoogle = useApiCall<LoginResponseSuccess, {}>({
    callApi: () =>
      postMethod(apiRoute.auth.loginWithGoogle, undefined, undefined, {
        idToken: googleToken,
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
    handleSuccess(message, data) {
      if (data.needVerify) {
        router.push('/verify?type=verifyEmail')
      }
      if (!data.needVerify && !data.verify2Fa) {
        toast.success(translate(message))
        setCookie(TOKEN_AUTHENTICATION, data.token, {
          path: '/',
          expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        })
        setCookie(USER_ID, data.userId, {
          path: '/',
          expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        })
        if (data.type === TypeAccount.INTERNAL) {
          router.push('/dashboard')
        }
        if (data.type === TypeAccount.EXTERNAL) {
          router.push('/')
        }
        dispatch(setIsLoggedIn(true))
      }
    },
  })

  const getAccessPath = useApiCall<string[], {}>({
    callApi: () => getMethod(apiRoute.paths.getAccessPath, cookies.token, undefined),
    handleError(status, message) {
      toast.error(translate(message))
    },
    handleSuccess(message, data) {
      setAccessPath(data)
    },
  })

  useEffect(() => {
    const onClose = () => {
      if (isLoggedIn) {
        outChatRoom.setLetCall(true)
      }
    }

    onClose()

    window.addEventListener('beforeunload', onClose)

    return () => {
      window.removeEventListener('beforeunload', onClose)
    }
  }, [])

  useEffect(() => {
    if (router.asPath.includes('chat') && isLoggedIn && isFirstRender) {
      if (chatStatus !== 'in') {
        inChatRoom.setLetCall(true)
        setChatStatus('in')
      }
    } else if (chatStatus !== 'out') {
      outChatRoom.setLetCall(true)
      setChatStatus('out')
    }
  }, [isLoggedIn, router, isFirstRender])

  const ignoreAccessPath = ['login', 'forgot-password', 'verify']

  const resultAuthentication = () => {
    if (!isFirstRender && router) {
      if (router.pathname.includes('403')) {
        return <Component403 />
      }
      if (router.pathname.includes('404')) {
        return children
      }
      if (!isLoggedIn) {
        if (!!ignoreAccessPath.find((localPath) => router.pathname.includes(localPath)))
          return children
        return null
      }
      if (!!accessPath.find((pathItem) => router.pathname === pathItem)) {
        return children
      }
      return <Component403 />
    }
    return <>logo</>
  }

  useEffect(() => {
    if (router && !isFirstRender) {
      if (
        isLoggedIn &&
        !!ignoreAccessPath.find((localPath) => router.pathname.includes(localPath))
      ) {
        router.push('/dashboard')
        return
      }
      if (
        !isLoggedIn &&
        !ignoreAccessPath.find((localPath) => router.pathname.includes(localPath))
      ) {
        router.push('/login')
      }
      if (isLoggedIn) {
        getAccessPath.setLetCall(true)
      }
    }
  }, [isLoggedIn, isFirstRender, router])

  useEffect(() => {
    if (cookies.token) {
      dispatch(setIsLoggedIn(true))
    } else {
      dispatch(setIsLoggedIn(false))
    }
    setIsFirstRender(false)
  }, [])

  useEffect(() => {
    /* global google */
    /* @ts-ignore */
    if (typeof google !== undefined && !isLoggedIn && !isFirstRender) {
      /* @ts-ignore */
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_KEY,
        context: 'use',
        callback: (res: any) => {
          if (res?.credential) {
            setGoogleToken(res.credential)
          }
        },
      })
      /* @ts-ignore */
      google.accounts.id.prompt()
    }
    /* @ts-ignore */
    if (google && isLoggedIn) {
      /* @ts-ignore */
      google.accounts.id.cancel()
    }
  }, [isLoggedIn, isFirstRender])

  useEffect(() => {
    if (googleToken) {
      loginWithGoogle.setLetCall(true)
    }
  }, [googleToken])

  return <>{resultAuthentication()}</>
}
