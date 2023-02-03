import { Modal } from '@/components'
import { LoginLayout } from '@/components/layout/LoginLayout'
import { useMemo, useState } from 'react'
import { LoginForm } from './login'
import { VerifyForm } from './verify'

export const PreAuthentication = () => {
  const [page, setPage] = useState<'login' | 'verify'>('login')
  const [verifyType, setVerifyType] = useState<'verifyEmail' | 'verify2FA'>('verifyEmail')
  const [email, setEmail] = useState<string>('')

  const components = {
    verify: <VerifyForm verifyType={verifyType} email={email} setPage={setPage} />,
    login: <LoginForm setEmail={setEmail} setPage={setPage} setVerifyType={setVerifyType} />,
  }

  const DisplayResult = useMemo(() => {
    return components[page]
  }, [page])

  return (
    <LoginLayout>
      <Modal open notBlur>
        {DisplayResult}
      </Modal>
    </LoginLayout>
  )
}
