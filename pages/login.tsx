import { Modal } from '@/components'
import { LoginLayout } from '@/components/layout/LoginLayout'
import { LoginForm } from '@/modules'

const Login = () => {
  return (
    <LoginLayout>
      <Modal open preventClose ModalClassName="gap-3">
        <LoginForm />
      </Modal>
    </LoginLayout>
  )
}

export default Login
