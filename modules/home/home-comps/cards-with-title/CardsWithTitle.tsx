import { CardBase } from '@/components'
import { ReactNode } from 'react'

interface ICardsWithTitle {
  title: string
  children: ReactNode
}

export const CardsWithTitle = ({ title, children }: ICardsWithTitle) => {
  return (
    <CardBase
      wrapperStyle={{ gap: 24 }}
      title={{ content: title, style: { fontSize: '24px', textAlign: 'center' } }}
      child={<CardBase wrapperStyle={{ flexDirection: 'row', gap: 32 }} child={children} />}
    />
  )
}
