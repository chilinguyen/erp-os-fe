import { useTranslation } from '@/hooks'
import { PathRequest, PathTypeEnum } from '@/types'

export const inputStylesPath = ({ error }: { error?: string }) => {
  const initialValue: Partial<any> = {
    status: error ? 'error' : undefined,
    helperText: error || '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}

export const PathTypeList = () => {
  const internal = useTranslation('internal')

  const external = useTranslation('external')

  return [
    {
      value: PathTypeEnum.INTERNAL,
      label: internal,
    },
    {
      value: PathTypeEnum.EXTERNAL,
      label: external,
    },
  ]
}

export const PathRequestDefault: PathRequest = {
  path: '',
  label: '',
  type: PathTypeEnum.INTERNAL,
  icon: '',
  userId: [],
}
