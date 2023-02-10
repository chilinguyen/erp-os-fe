import { Button, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { setIsLoggedIn, setLoading } from '@/redux/authentication'
import { postMethod } from '@/services'
import { LoginResponseSuccess } from '@/types'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

interface IVerifyFormProps {
  setPage: (value: 'login' | 'verify') => void
  email: string
  verifyType: 'verifyEmail' | 'verify2FA'
}

export const VerifyForm = ({ setPage, email, verifyType }: IVerifyFormProps) => {
  const [, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const dispatch = useDispatch()

  const [code, setCode] = useState<string>('')

  const verifyLabel = useTranslation(verifyType === 'verify2FA' ? '2FALabel' : 'EmailLabel')
  const codeLabel = useTranslation('codeLabel')
  const signIn = useTranslation('signIn')
  const submit = useTranslation('submit')
  const resend = useTranslation('resend')

  const translate = useTranslationFunction()

  const handleLogin = () => {
    setPage('login')
  }

  const verify2FACall = useApiCall<LoginResponseSuccess, string>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.auth.verify2FA,
        params: {
          email,
          code,
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message, data) {
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
      dispatch(setLoading(false))
    },
  })

  const verifyEmail = useApiCall<string, string>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.auth.verifySignUp,
        params: {
          email,
          code,
        },
      }),
    handleError(status, message) {
      if (status === 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      setPage('login')
      dispatch(setLoading(false))
    },
  })

  const resultResendEmail = useApiCall<string, string>({
    callApi: () =>
      postMethod({ pathName: `${apiRoute.auth.verifySignUp}/resend`, params: { email } }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      if (message) {
        toast.success(translate(message))
      }
    },
  })

  const resultResend2FA = useApiCall<string, string>({
    callApi: () => postMethod({ pathName: `${apiRoute.auth.verify2FA}/resend`, params: { email } }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      if (message) {
        toast.success(translate(message))
      }
    },
  })

  const handleSubmit = () => {
    if (verifyType === 'verify2FA') verify2FACall.setLetCall(true)
    if (verifyType === 'verifyEmail') verifyEmail.setLetCall(true)
  }

  const handleReset = () => {
    if (verifyType === 'verify2FA') verify2FACall.handleReset()
    if (verifyType === 'verifyEmail') verifyEmail.handleReset()
  }

  const handleResend = () => {
    if (verifyType === 'verify2FA') resultResend2FA.setLetCall(true)
    if (verifyType === 'verifyEmail') resultResendEmail.setLetCall(true)
  }

  const loading =
    resultResend2FA.loading ||
    verifyEmail.loading ||
    verify2FACall.loading ||
    resultResendEmail.loading

  return (
    <>
      <h3>{verifyLabel}</h3>

      <Input
        {...inputStyles({})}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        labelLeft={codeLabel}
        onFocus={handleReset}
        clearable
      />
      <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
        <Button
          disabled={resultResend2FA.loading || resultResendEmail.loading}
          styleType="light"
          onClick={handleResend}
        >
          {resend}?
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'end', width: '100%' }}>
        <Button disabled={loading} onClick={handleLogin}>
          {signIn}
        </Button>
        <Button disabled={loading} onClick={handleSubmit}>
          {loading ? <Loading /> : <>{submit}</>}
        </Button>
      </div>
    </>
  )
}
