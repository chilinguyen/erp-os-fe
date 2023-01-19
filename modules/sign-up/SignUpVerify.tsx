export const SignUpVerify = () => {
  // const codeRef = useRef<FormElement>(null)

  // const router = useRouter()

  // const translate = useTranslationFunction()

  // const { signUpRequest } = useSelector(authenticationSelector)

  // const { loading, setLetCall } = useApiCall({
  //   callApi: () =>
  //     postMethod({
  //       pathName: apiRoute.auth.verifySignUp,
  //       params: {
  //         email: signUpRequest.email,
  //         code: codeRef.current?.value || '',
  //       },
  //     }),
  //   handleError(status, message) {
  //     if (status === 400) {
  //       toast.error(translate(message))
  //     }
  //   },
  //   handleSuccess(message) {
  //     toast.success(translate(message))
  //     router.push('/login')
  //   },
  // })

  // const resultResend = useApiCall({
  //   callApi: () =>
  //     postMethod({
  //       pathName: `${apiRoute.auth.verifySignUp}/resend`,
  //       params: {
  //         email: signUpRequest.email,
  //       },
  //     }),
  //   handleError(status, message) {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  //   handleSuccess(message) {
  //     toast.success(translate(message))
  //   },
  // })

  // const handleVerify = () => {
  //   setLetCall(true)
  // }

  // const handleResend = () => {
  //   resultResend.setLetCall(true)
  // }

  // const verifyAccount = useTranslation('verifyAccount')
  // const stepLabel = useTranslation('step')
  // const resend = useTranslation('resend')
  // const verify = useTranslation('verify')

  // return (
  //   <>
  //     <Text size={18}>
  //       {stepLabel} 4:
  //       <Text b css={{ marginLeft: 10 }}>
  //         {verifyAccount}!
  //       </Text>
  //     </Text>
  //     <Input ref={codeRef} {...inputStyles({})} labelLeft="Code" />
  //     <Row justify="flex-end">
  //       <Button auto light onClick={handleResend}>
  //         {resend}
  //       </Button>
  //       <Button disabled={loading} auto onClick={handleVerify}>
  //         {loading ? <Loading /> : <>{verify}</>}
  //       </Button>
  //     </Row>
  //   </>
  // )
  return <>abc</>
}
