import { CardBase } from '@/components'

export const CardDestinations = () => {
  return (
    <CardBase
      image={{
        content: '/test/explore-travel/test1.jpg',
        style: { borderRadius: '100%' },
        hoveredStyle: { scale: '110%' },
      }}
      title={{ content: 'Ho Chi Minh City', style: { padding: '8px 8px 0' } }}
      subTitle={{
        content: '156,786 properties',
        style: { padding: '4px 8px 8px' },
      }}
    />
  )
}
