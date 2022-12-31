import { RecommendedDataType } from '@/components/mock-data/MockDataType'
import { CardBase } from '@/components'

interface CardDestinationsProps {
  data: RecommendedDataType
}
export const CardDestinations = ({ data }: CardDestinationsProps) => {
  if (!data) return null
  return (
    // <CardBase
    //   image={{
    //     content: '/test/explore-travel/test1.jpg',
    //     style: { borderRadius: '100%' },
    //     hoveredStyle: { scale: '110%' },
    //   }}
    <CardBase
      image={{
        content: data.imageUrl,
        style: { borderRadius: '100%' },
        hoveredStyle: { scale: '110%' },
      }}
      title={{ content: data.name, style: { padding: '8px 8px 0' } }}
      subTitle={{
        content: data.properties.concat(' chỗ ở'),
        style: { padding: '4px 8px 8px' },
      }}
    />
  )
}
