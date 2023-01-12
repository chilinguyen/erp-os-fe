import { Modal } from '@/components'
import { LoginLayout } from '@/components/layout/LoginLayout'
import { LoginForm } from '@/modules'

const Login = () => {
  return (
    <LoginLayout>
      <Modal open preventClose ModalStyle={{ gap: '0.75rem' }}>
        <LoginForm />
      </Modal>
    </LoginLayout>
  )
}

export default Login
