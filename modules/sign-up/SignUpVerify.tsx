import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { authenticationSelector } from '@/redux/authentication'
import { postMethod } from '@/services'
import { Button, FormElement, Input, Loading, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStyles } from './sign-up.inventory'

export const SignUpVerify = () => {
  const codeRef = useRef<FormElement>(null)

  const router = useRouter()

  const translate = useTranslationFunction()

  const { signUpRequest } = useSelector(authenticationSelector)

  const { loading, setLetCall } = useApiCall({
    callApi: () =>
      postMethod(apiRoute.auth.verifySignUp, undefined, {
        email: signUpRequest.email,
        code: codeRef.current?.value || '',
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

  const resultResend = useApiCall({
    callApi: () =>
      postMethod(`${apiRoute.auth.verifySignUp}/resend`, undefined, { email: signUpRequest.email }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
    },
  })

  const handleVerify = () => {
    setLetCall(true)
  }

  const handleResend = () => {
    resultResend.setLetCall(true)
  }

  const verifyAccount = useTranslation('verifyAccount')
  const stepLabel = useTranslation('step')
  const resend = useTranslation('resend')
  const verify = useTranslation('verify')

  return (
    <>
      <Text size={18}>
        {stepLabel} 4:
        <Text b css={{ marginLeft: 10 }}>
          {verifyAccount}!
        </Text>
      </Text>
      <Input ref={codeRef} {...inputStyles({})} labelLeft="Code" />
      <Row justify="flex-end">
        <Button auto light onClick={handleResend}>
          {resend}
        </Button>
        <Button disabled={loading} auto onClick={handleVerify}>
          {loading ? <Loading /> : <>{verify}</>}
        </Button>
      </Row>
    </>
  )
}
