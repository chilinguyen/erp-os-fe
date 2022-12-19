import { useTranslation } from '@/hooks'

export const Header = () => {
  const path = useTranslation('path')
  const label = useTranslation('label')
  const type = useTranslation('type')

  return [
    {
      key: 'path',
      name: path,
    },
    {
      key: 'label',
      name: label,
    },
    {
      key: 'type',
      name: type,
    },
  ]
}
