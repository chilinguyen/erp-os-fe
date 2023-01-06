export const GeneralSettings = () => {
  // const [cookie] = useCookies([TOKEN_AUTHENTICATION])
  // const translate = useTranslationFunction()

  // const generalSettingsState = useSelector(GeneralSettingsSelector)
  // const dispatch = useDispatch()

  // const viewResult = useApiCall<GeneralSettingsResponseSuccess, string>({
  //   callApi: () => getMethod(apiRoute.settings.getGeneralSettings, cookie.token),
  //   handleSuccess: (message, data) => {
  //     toast.success(translate(message))
  //     dispatch(setGeneralSettings(data))
  //   },
  //   handleError: (status, message) => {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  // })

  // const updateResult = useApiCall<GeneralSettingsResponseSuccess, UpdateGeneralFailure>({
  //   callApi: () => {
  //     const { darkTheme, ...rest } = generalSettingsState
  //     return putMethod<GeneralSettingsResponseSuccess>(
  //       apiRoute.settings.updateGeneralSettings,
  //       cookie.token,
  //       rest
  //     )
  //   },
  //   handleSuccess: (message) => {
  //     toast.success(translate(message))
  //   },
  //   handleError: (status, message) => {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //     if (status !== 401 && status !== 403) {
  //       viewResult.setLetCall(true)
  //     }
  //   },
  // })

  // const generalSetting = useTranslation('generalSetting')

  // return viewResult.loading ? (
  //   <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
  //     <Loading />
  //   </Container>
  // ) : (
  //   <div>
  //     <Text h3>{generalSetting}</Text>
  //     <hr style={{ margin: '10px 0' }} />

  //     <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
  //       <SettingLanguage
  //         languageKey={generalSettingsState.languageKey}
  //         setLetCallUpdate={updateResult.setLetCall}
  //         disabled={updateResult.loading}
  //       />
  //     </div>
  //   </div>
  // )
  return null
}
