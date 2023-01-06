export const LoginForm = () => {
  // const emailRef = useRef<FormElement>(null)
  // const passwordRef = useRef<FormElement>(null)
  // const router = useRouter()
  // const [, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  // const translate = useTranslationFunction()
  // const dispatch = useDispatch()

  // const resultForgotPassword = useApiCall({
  //   callApi: () =>
  //     postMethod(apiRoute.auth.forgotPassword, undefined, undefined, {
  //       email: emailRef?.current?.value || '',
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

  // const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
  //   callApi: () =>
  //     postMethod<LoginRequest>(apiRoute.auth.login, undefined, {
  //       username: emailRef.current ? emailRef.current.value : '',
  //       password: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
  //     }),
  //   handleSuccess(message, data) {
  //     if (data.needVerify) {
  //       router.push('/verify?type=verifyEmail')
  //     }
  //     if (data.verify2Fa) {
  //       router.push(`/verify?type=verify2FA&email=${emailRef.current?.value || ''}`)
  //     }
  //     if (!data.needVerify && !data.verify2Fa) {
  //       toast.success(translate(message))
  //       setCookie(TOKEN_AUTHENTICATION, data.token, {
  //         path: '/',
  //         expires: new Date(new Date().setDate(new Date().getDate() + 7)),
  //       })
  //       setCookie(USER_ID, data.userId, {
  //         path: '/',
  //         expires: new Date(new Date().setDate(new Date().getDate() + 7)),
  //       })
  //       dispatch(setIsLoggedIn(true))
  //       if (data.type === TypeAccount.INTERNAL) {
  //         router.push('/')
  //       }
  //       if (data.type === TypeAccount.EXTERNAL) {
  //         router.push('/home')
  //       }
  //     }
  //   },
  //   handleError(status, message) {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  // })

  // const { error, loading, setLetCall, handleReset } = result

  // const handleLogin = () => {
  //   setLetCall(true)
  // }

  // const usernameLabel = useTranslation('username')
  // const signIn = useTranslation('signIn')
  // const passwordLabel = useTranslation('password')
  // const forgotPassword = useTranslation('forgotPassword')

  return (
    <>
      {/* <Modal.Header>
        <Text id="modal-title" size={18}>
          {signIn}
        </Text>
      </Modal.Header>
      <Modal.Body>
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
        <Row justify="flex-end">
          <Button
            disabled={loading}
            auto
            light
            onClick={() => resultForgotPassword.setLetCall(true)}
          >
            {forgotPassword}?
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} auto onClick={handleLogin}>
          {loading ? <Loading /> : <>{signIn}</>}
        </Button>
      </Modal.Footer> */}
    </>
  )
}
