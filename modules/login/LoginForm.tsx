import { Button, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { encodeBase64, themeValue } from '@/lib'
import { setIsLoggedIn } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { postMethod } from '@/services'
import { LoginRequest, LoginResponseFailure, LoginResponseSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStyles } from './login.inventory'

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()
  const dispatch = useDispatch()
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const resultForgotPassword = useApiCall({
    callApi: () =>
      postMethod(apiRoute.auth.forgotPassword, undefined, undefined, {
        email: emailRef?.current?.value || '',
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
    },
  })

  const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
    callApi: () =>
      postMethod<LoginRequest>(apiRoute.auth.login, undefined, {
        username: emailRef.current ? emailRef.current.value : '',
        password: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
      }),
    handleSuccess(message, data) {
      if (data.needVerify) {
        router.push('/verify?type=verifyEmail')
      }
      if (data.verify2Fa) {
        router.push(`/verify?type=verify2FA&email=${emailRef.current?.value || ''}`)
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
        dispatch(setIsLoggedIn(true))
        // if (data.type === TypeAccount.INTERNAL) {
        //   router.push('/dashboard')
        // }
        // if (data.type === TypeAccount.EXTERNAL) {
        //   router.push('/')
        // }
      }
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const { error, loading, setLetCall, handleReset } = result

  const handleLogin = () => {
    setLetCall(true)
  }

  const usernameLabel = useTranslation('username')
  const signIn = useTranslation('signIn')
  const passwordLabel = useTranslation('password')
  const forgotPassword = useTranslation('forgotPassword')

  return (
    <>
      <div
        style={{
          color: themeValue[darkTheme].colors.foreground,
          fontSize: '1.125rem',
          paddingBottom: '1rem',
        }}
      >
        {signIn}
      </div>
      <Input
        ref={emailRef}
        {...inputStyles({ error: error?.result?.username && translate(error.result.username) })}
        labelLeft={usernameLabel}
        onFocus={handleReset}
      />
      <Input
        ref={passwordRef}
        {...inputStyles({ error: error?.result?.password && translate(error.result.password) })}
        type="password"
        labelLeft={passwordLabel}
        onFocus={handleReset}
      />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button
          disabled={loading}
          styleType="light"
          onClick={() => resultForgotPassword.setLetCall(true)}
        >
          {forgotPassword}?
        </Button>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end', paddingTop: '1rem' }}>
        <Button disabled={loading} onClick={handleLogin}>
          {loading ? <Loading /> : <>{signIn}</>}
        </Button>
      </div>
    </>
  )
}
