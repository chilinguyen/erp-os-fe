import { useTranslation } from '@/hooks'
import { OptionsType } from '@/types'

export const GenderList = () => {
  const male = useTranslation('male')

  const female = useTranslation('female')

  return [
    {
      value: 0,
      label: male,
    },
    {
      value: 1,
      label: female,
    },
  ] as OptionsType<number>[]
}

export const StatusList = () => {
  const activeLabel = useTranslation('active')

  const deactivated = useTranslation('deactivated')

  return [
    {
      value: 0,
      label: activeLabel,
    },
    {
      value: 1,
      label: deactivated,
    },
  ] as OptionsType<number>[]
}

export const StatusListBoolean = () => {
  const activeLabel = useTranslation('active')

  const deactivated = useTranslation('deactivated')

  return [
    {
      value: true,
      label: activeLabel,
    },
    {
      value: false,
      label: deactivated,
    },
  ] as OptionsType<boolean>[]
}

export const AccessStatus = () => {
  const activeLabel = useTranslation('active')

  const deactivated = useTranslation('deactivated')

  return [
    {
      value: 0,
      label: activeLabel,
    },
    {
      value: 1,
      label: deactivated,
    },
  ] as OptionsType<number>[]
}

export const formatDate = 'yyyy-MM-dd'

export const colorObj = {
  primary: '#0072F5',
  secondary: '#7828C8',
  success: '#17C964',
  warning: '#F5A524',
  error: '#31260',
  gradient: 'linear-gradient(112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%)',
  black: '#000',
  white: '#fff',
}
