import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SignUpPage = () => {
  const router = useRouter()
  useEffect(() => {
    if (router) {
      router.push('/login')
    }
  }, [])
  return null
  // return (
  //   <LoginLayout>
  //     <Modal open preventClose>
  //       <SignUpForm />
  //     </Modal>
  //   </LoginLayout>
  // )
}

export default SignUpPage
