import { CommonResponseType, SignUpFailure } from '@/types'

export const SignUpStep2 = ({ error }: { error?: CommonResponseType<SignUpFailure> }) => {
  // const dispatch = useDispatch()
  // const translate = useTranslationFunction()

  // const { signUpRequest } = useSelector(authenticationSelector)

  // const stepLabel = useTranslation('step')
  // const personalInformation = useTranslation('personalInformation')
  // const lastName = useTranslation('lastName')
  // const firstName = useTranslation('firstName')

  // return (
  //   <>
  //     <Text size={18}>
  //       {stepLabel} 2:
  //       <Text b css={{ marginLeft: 10 }}>
  //         {personalInformation}
  //       </Text>
  //     </Text>
  //     <Input
  //       value={signUpRequest.firstName}
  //       onChange={(e) => dispatch(setSignUpRequest({ firstName: e.target.value }))}
  //       {...inputStyles({ error: error?.result?.firstName && translate(error.result.firstName) })}
  //       labelLeft={firstName}
  //     />
  //     <Input
  //       value={signUpRequest.lastName}
  //       onChange={(e) => dispatch(setSignUpRequest({ lastName: e.target.value }))}
  //       {...inputStyles({ error: error?.result?.lastName && translate(error.result.lastName) })}
  //       labelLeft={lastName}
  //     />
  //   </>
  // )
  return <>{error || null}</>
}
