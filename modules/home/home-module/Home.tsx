import { CardsWithTitle } from '@/components'
import { CardExplore, CardFeedBack, CardProduct } from '../home-comps'
import { CardDestinations } from '../home-comps/card-destinations/CardDestinations'

export const HomeModule = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: 40 }}>
      <CardsWithTitle title="Featured homes recommended for you">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <CardProduct key={index} />
          ))}
      </CardsWithTitle>

      <CardsWithTitle title="Top destinations in Vietnam">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <CardDestinations key={index} />
          ))}
      </CardsWithTitle>

      <CardsWithTitle title="Explore more travel vacation rentals">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <CardExplore key={index} />
          ))}
      </CardsWithTitle>

      <CardsWithTitle title="Overheard from travelers">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <CardFeedBack key={index} />
          ))}
      </CardsWithTitle>
    </div>
  )
}
