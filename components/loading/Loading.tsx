import { AiOutlineLoading } from 'react-icons/ai'

interface ILoading {
  size?: number
}

export const Loading = ({ size }: ILoading) => {
  return <AiOutlineLoading size={size ?? 24} className="animate-spin" />
}
