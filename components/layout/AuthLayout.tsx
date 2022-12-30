import { apiRoute } from '@/constants/apiRoutes'
import { GOOGLE_ID, TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { resetSignUpRequest } from '@/redux/authentication'
import { postMethod } from '@/services'
import { LoginResponseSuccess, TypeAccount } from '@/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Modal403 } from '../modals'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_AUTHENTICATION, GOOGLE_ID, USER_ID])
  const [chatStatus, setChatStatus] = useState<string>('out')
  const translate = useTranslationFunction()
  const [googleToken, setGoogleToken] = useState('')
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
          router.push('/')
        }
        if (data.type === TypeAccount.EXTERNAL) {
          router.push('/home')
        }
      }
      removeCookie(GOOGLE_ID)
    },
  })
  useEffect(() => {
    const onClose = () => {
      if (cookies.token) {
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
    if (router.asPath.includes('chat') && cookies.token) {
      if (chatStatus !== 'in') {
        inChatRoom.setLetCall(true)
        setChatStatus('in')
      }
    } else if (chatStatus !== 'out') {
      outChatRoom.setLetCall(true)
      setChatStatus('out')
    }
  }, [cookies, router])

  useEffect(() => {
    if (
      router &&
      !router.asPath.includes('login') &&
      !router.asPath.includes('forgot-password') &&
      !router.asPath.includes('sign-up') &&
      !router.asPath.includes('verify')
    ) {
      if (!cookies.token) {
        router.push('/login')
      }
    }
    if (
      (router && router.asPath.includes('login')) ||
      router.asPath.includes('forgot-password') ||
      router.asPath.includes('sign-up') ||
      router.asPath.includes('verify')
    ) {
      if (cookies.token) {
        router.push('/')
      }
      dispatch(resetSignUpRequest())
    }
  }, [router, cookies])

  useEffect(() => {
    /* global google */
    /* @ts-ignore */
    if (google && !cookies.token) {
      /* @ts-ignore */
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_KEY,
        context: 'Login into franchise',
        callback: (res: any) => {
          if (res?.credential) {
            setGoogleToken(res.credential)
          }
        },
      })
      /* @ts-ignore */
      google.accounts.id.prompt()
    }
  }, [cookies.token])

  useEffect(() => {
    if (googleToken) {
      loginWithGoogle.setLetCall(true)
    }
  }, [googleToken])
  return (
    <>
      <Modal403 />
      {children}
    </>
  )
}
