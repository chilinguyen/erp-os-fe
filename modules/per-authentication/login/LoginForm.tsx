import { Button, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { encodeBase64, themeValue } from '@/lib'
import { authenticationSelector, setIsLoggedIn, setLoading } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { postMethod } from '@/services'
import { LoginRequest, LoginResponseFailure, LoginResponseSuccess } from '@/types'
import { useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStyles } from './login.inventory'

interface ILoginProps {
  setPage: (value: 'login' | 'verify') => void
  setVerifyType: (value: 'verifyEmail' | 'verify2FA') => void
  setEmail: (value: string) => void
}

export const LoginForm = ({ setPage, setVerifyType, setEmail }: ILoginProps) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()
  const dispatch = useDispatch()
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { isLoginLoading } = useSelector(authenticationSelector)

  const resultForgotPassword = useApiCall({
    callApi: () =>
      postMethod({
        pathName: apiRoute.auth.forgotPassword,
        params: {
          email: emailRef?.current?.value || '',
        },
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
      postMethod<LoginRequest>({
        pathName: apiRoute.auth.login,
        request: {
          username: emailRef.current ? emailRef.current.value : '',
          password: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
        },
      }),
    handleSuccess(message, data) {
      if (data.needVerify) {
        setVerifyType('verifyEmail')
        setPage('verify')
        setEmail(emailRef?.current?.value || '')
      }
      if (data.verify2Fa) {
        setVerifyType('verify2FA')
        setPage('verify')
        setEmail(emailRef?.current?.value || '')
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
      }
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    preventLoadingGlobal: true,
  })

  const { error, setLetCall, handleReset } = result

  const handleLogin = () => {
    setLetCall(true)
    dispatch(setLoading(true))
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
          disabled={isLoginLoading}
          styleType="light"
          onClick={() => resultForgotPassword.setLetCall(true)}
        >
          {forgotPassword}?
        </Button>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end', paddingTop: '1rem' }}>
        <Button disabled={isLoginLoading} onClick={handleLogin}>
          {isLoginLoading ? <Loading /> : <>{signIn}</>}
        </Button>
      </div>
    </>
  )
}
