import { Button, Input, Loading, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { setIsLoggedIn } from '@/redux/authentication'
import { postMethod } from '@/services'
import { LoginResponseSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStyles } from './verify.inventory'

export const VerifyForm = () => {
  const [isCode, setIsCode] = useState<boolean>(false)
  const router = useRouter()
  const [, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const verifyLabel = useTranslation(router?.query.type === 'verify2FA' ? '2FALabel' : 'EmailLabel')
  const emailLabel = useTranslation('email')
  const codeLabel = useTranslation('codeLabel')
  const signIn = useTranslation('signIn')
  const submit = useTranslation('submit')
  const send = useTranslation('send')
  const resend = useTranslation('resend')

  const translate = useTranslationFunction()

  const handleLogin = () => {
    router.push('/login')
  }

  useEffect(() => {
    if (router?.query.type === 'verify2FA') {
      setEmail(router?.query.email?.toString() || '')
      setIsCode(true)
    }
  }, [router])

  const verify2FACall = useApiCall<LoginResponseSuccess, string>({
    callApi: () =>
      postMethod(apiRoute.auth.verify2FA, undefined, undefined, {
        email,
        code,
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
      // if (data.type === TypeAccount.INTERNAL) {
      //   router.push('/dashboard')
      // }
      // if (data.type === TypeAccount.EXTERNAL) {
      //   router.push('/home')
      // }
    },
  })

  const verifyEmail = useApiCall<string, string>({
    callApi: () =>
      postMethod(apiRoute.auth.verifySignUp, undefined, undefined, {
        email,
        code,
      }),
    handleError(status, message) {
      if (status === 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/login')
    },
  })

  const resultResendEmail = useApiCall<string, string>({
    callApi: () =>
      postMethod(`${apiRoute.auth.verifySignUp}/resend`, undefined, undefined, { email }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      if (message) {
        toast.success(translate(message))
        setIsCode(true)
      }
    },
  })

  const resultResend2FA = useApiCall<string, string>({
    callApi: () =>
      postMethod(`${apiRoute.auth.verifySignUp}/resend`, undefined, undefined, { email }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      if (message) {
        toast.success(translate(message))
        setIsCode(true)
      }
    },
  })

  const handleSubmit = () => {
    if (router?.query.type === 'verify2FA') verify2FACall.setLetCall(true)
    if (router?.query.type === 'verifyEmail') verifyEmail.setLetCall(true)
  }

  const handleReset = () => {
    if (router?.query.type === 'verify2FA') verify2FACall.handleReset()
    if (router?.query.type === 'verifyEmail') verifyEmail.handleReset()
  }

  const handleResend = () => {
    if (router?.query.type === 'verify2FA') resultResend2FA.setLetCall(true)
    if (router?.query.type === 'verifyEmail') resultResendEmail.setLetCall(true)
  }

  const loading =
    resultResend2FA.loading ||
    verifyEmail.loading ||
    verify2FACall.loading ||
    resultResendEmail.loading

  return (
    <Modal open>
      <h3>{verifyLabel}</h3>

      <div>
        {!isCode ? (
          <Input
            {...inputStyles({})}
            labelLeft={emailLabel}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleReset}
          />
        ) : (
          <>
            <Input
              {...inputStyles({})}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              labelLeft={codeLabel}
              onFocus={handleReset}
            />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                disabled={resultResend2FA.loading || resultResendEmail.loading}
                auto
                styleType="light"
                onClick={handleResend}
              >
                {resend}?
              </Button>
            </div>
          </>
        )}
      </div>

      <div>
        <Button disabled={loading} auto onClick={handleLogin}>
          {signIn}
        </Button>
        {isCode ? (
          <Button disabled={loading} auto onClick={handleSubmit}>
            {loading ? <Loading /> : <>{submit}</>}
          </Button>
        ) : (
          <Button disabled={loading} auto onClick={() => resultResendEmail.setLetCall(true)}>
            {loading ? <Loading /> : <>{send}</>}
          </Button>
        )}
      </div>
    </Modal>
  )
}
