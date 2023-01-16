import Image from 'next/image'
import { useRouter } from 'next/router'

interface SidebarIconProps {
  link: string
  image: string
}

export const SideIconItem = (props: SidebarIconProps) => {
  const { link, image } = props

  const router = useRouter()
  return (
    <div
      style={{
        width: '70%',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => {
        router.push(link)
      }}
    >
      <Image layout="fill" src={image} />
    </div>
  )
}
