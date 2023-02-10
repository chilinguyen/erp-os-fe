import { useTranslation } from '@/hooks'
import { PathTypeEnum } from '@/types'

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
