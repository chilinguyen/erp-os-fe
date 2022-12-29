import { CardBase } from '@/components'

export const CardExplore = () => {
  return (
    <CardBase
      hoveredStyle={{ boxShadow: '0 1px 6px 2px rgb(0 0 0 / 20%)' }}
      wrapperStyle={{ border: '1px solid #dddfe2', alignItems: 'start' }}
      image={{ content: '/test/explore-travel/test1.jpg' }}
      title={{ content: 'Apartments', style: { padding: '8px 8px 0' } }}
      subTitle={{
        content: '156,786 properties',
        style: { padding: '4px 8px 8px' },
      }}
    />
  )
}
