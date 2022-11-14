import { useApiCall, useResponsive } from '@/hooks'
import { generateToken } from '@/lib'
import { GeneralSettingsSelector, setGeneralSettings, toggleTheme } from '@/redux/general-settings'
import { getGeneralSettings, updateGeneralSettings } from '@/services/settings.service'
import { GeneralSettingsResponseSuccess, UpdateGeneralFailure } from '@/types'
import { Container, Loading, Switch, Text } from '@nextui-org/react'
import { useCookies } from 'react-cookie'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const GeneralSettings = () => {
  const [cookie] = useCookies()

  const GeneralSettings = useSelector(GeneralSettingsSelector)
  const dispatch = useDispatch()

  const responsive = useResponsive()

  const viewResult = useApiCall<GeneralSettingsResponseSuccess, string>({
    callApi: () =>
      getGeneralSettings(generateToken({ userId: cookie.userId, deviceId: cookie.deviceId })),
    handleSuccess: (message, data) => {
      toast.success(message)
      dispatch(setGeneralSettings(data))
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(message)
      }
    },
  })

  const updateResult = useApiCall<GeneralSettingsResponseSuccess, UpdateGeneralFailure>({
    callApi: () =>
      updateGeneralSettings(
        generateToken({ userId: cookie.userId, deviceId: cookie.deviceId }),
        GeneralSettings
      ),
    handleSuccess: (message) => {
      toast.success(message)
    },
    handleError: (status, message) => {
      if (status) {
        toast.error(message)
      }
      if (status !== 401 && status !== 403) {
        viewResult.setLetCall(true)
      }
    },
  })

  return viewResult.loading ? (
    <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
      <Loading />
    </Container>
  ) : (
    <div>
      <Text h3>General Setting</Text>
      <hr style={{ margin: '10px 0' }} />

      <Text h5>Dark mode</Text>
      <Switch
        checked={GeneralSettings.darkTheme}
        onChange={() => {
          dispatch(toggleTheme())
          updateResult.setLetCall(true)
        }}
        iconOn={<MdDarkMode />}
        iconOff={<MdLightMode />}
        disabled={updateResult.loading || viewResult.loading || responsive < 3}
      />
    </div>
  )
}
