import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { decodeBase64, encodeBase64 } from '@/lib'
import { login } from '@/services'
import { LoginResponseFailure, LoginResponseSuccess } from '@/types'
import { Button, FormElement, Input, Loading, Modal, Row, Text, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { inputStyles } from './login.inventory'

export const LoginForm = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()
  const emailRef = useRef<FormElement>(null)
  const passwordRef = useRef<FormElement>(null)
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies([DEVICE_ID, USER_ID])
  console.log(isDark)
  const handleChangeTheme = () => {
    if (isDark) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
    callApi: () =>
      login({
        username: emailRef.current ? emailRef.current.value : '',
        password: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
      }),
    handleSuccess(message) {
      toast.success(message)
      router.push('/')
    },
  })

  const { error, data, loading, setLetCall, handleReset } = result

  const handleLogin = () => {
    setLetCall(true)
  }

  const handleSignUp = () => {
    router.push('/sign-up')
  }

  useEffect(() => {
    if (data) {
      setCookie(DEVICE_ID, data.result.deviceId, { path: '/' })
      setCookie(USER_ID, data.result.userId, { path: '/' })
      router.push('/')
    }
  }, [data])

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Sign in
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={emailRef}
          {...inputStyles({ error: error?.result?.username })}
          labelLeft="username"
          onFocus={handleReset}
        />
        <Input
          ref={passwordRef}
          {...inputStyles({ error: error?.result?.password })}
          type="password"
          labelLeft="password"
          onFocus={handleReset}
        />
        <Row justify="flex-end">
          <Button auto light>
            Forgot password?
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onClick={handleChangeTheme}>
          Change theme
        </Button>
        <Button auto onClick={handleSignUp}>
          Sign up
        </Button>
        <Button disabled={loading} auto onClick={handleLogin}>
          {loading ? <Loading /> : <>Sign in</>}
        </Button>
      </Modal.Footer>
    </>
  )
}