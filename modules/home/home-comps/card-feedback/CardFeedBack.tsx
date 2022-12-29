import { CardBase } from '@/components'

export const CardFeedBack = () => {
  return (
    <CardBase
      wrapperStyle={{ border: '1px solid #e9ebee', borderBottom: '4px solid #75a8f9' }}
      title={{
        content: 'Meeru Island Resort & Spa',
        style: { color: '#5392f9' },
        hoveredStyle: { color: '#75a8f9' },
      }}
      subTitle={{
        content: 'in Greece',
        style: { color: '#737373' },
      }}
      description={{
        content:
          'We booked Hotel Eucalyptus through Agoda after reading a handful of reviews, and it was easily the best decision we made for our trip to Santorini.',
      }}
      child={<div>- Joyce from Canada</div>}
    />
  )
}
