import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { PreAuthentication } from '@/modules/per-authentication/PreAuthentication'
import { authenticationSelector, setIsLoggedIn, setLoading } from '@/redux/authentication'
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
  const [accessPath, setAccessPath] = useState<String[]>()
  const { isLoggedIn } = useSelector(authenticationSelector)
  const dispatch = useDispatch()

  const outChatRoom = useApiCall({
    callApi: () => postMethod({ pathName: apiRoute.message.outChatRoom, token: cookies.token }),
  })

  const inChatRoom = useApiCall({
    callApi: () => postMethod({ pathName: apiRoute.message.toChatRoom, token: cookies.token }),
  })

  const loginWithGoogle = useApiCall<LoginResponseSuccess, {}>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.auth.loginWithGoogle,
        params: {
          idToken: googleToken,
        },
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
    preventLoadingGlobal: true,
  })

  const getAccessPath = useApiCall<string[], {}>({
    callApi: () => getMethod({ pathName: apiRoute.paths.getAccessPath, token: cookies.token }),
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

  const specialPath = ['403', '404']

  const resultAuthentication = () => {
    if (!isLoggedIn) return <PreAuthentication />
    if (specialPath.find((pathItem) => router.pathname === pathItem)) {
      return children
    }
    if (accessPath && !accessPath.find((pathItem) => router.pathname === pathItem)) {
      return <Component403 />
    }
    return children
  }

  useEffect(() => {
    if (router && !isFirstRender) {
      if (isLoggedIn) {
        dispatch(setLoading(false))
        getAccessPath.setLetCall(true)
      } else {
        setAccessPath(undefined)
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
    if (!isFirstRender && typeof google !== undefined) {
      if (!isLoggedIn) {
        /* @ts-ignore */
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_KEY,
          context: 'use',
          callback: (res: any) => {
            if (res?.credential) {
              dispatch(setLoading(true))
              setGoogleToken(res.credential)
            }
          },
        })
        /* @ts-ignore */
        google.accounts.id.prompt()
      } else {
        /* @ts-ignore */
        google.accounts.id.cancel()
      }
    }
  }, [isLoggedIn, isFirstRender])

  useEffect(() => {
    if (googleToken) {
      loginWithGoogle.setLetCall(true)
    }
  }, [googleToken])

  return <>{resultAuthentication()}</>
}
