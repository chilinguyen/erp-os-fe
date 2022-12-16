import { useTranslation } from '@/hooks'
import { OptionsType } from '@/types'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

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

export const nextConfig = {
  apiBaseUrl: publicRuntimeConfig.API_BASE_URL,
  secretJWTKey: publicRuntimeConfig.SECRET_JWT_KEY,
}
