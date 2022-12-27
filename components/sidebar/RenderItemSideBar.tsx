import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { NavBarItemType } from '@/types'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

interface IRenderItemSideBar {
  item: NavBarItemType
  hasDivide: boolean
  level: number
}

export const RenderItemSideBar = ({ item, hasDivide, level }: IRenderItemSideBar) => {
  const router = useRouter()
  const [isShowCollapse, setShowCollapse] = useState(false)
  const refDiv = useRef<HTMLDivElement>(null)

  if (item?.children?.length) {
    return (
      <div key={item.path}>
        <div
          style={{
            borderBottom: hasDivide ? '1px solid #00000026' : '',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: level * 10,
            paddingRight: 10,
            display: 'flex',
            justifyContent: 'space-between',
            height: 'full',
            cursor: 'pointer',
          }}
          onClick={() => {
            setShowCollapse(!isShowCollapse)
          }}
        >
          {item.label}
          <div
            style={{
              transform: isShowCollapse ? 'rotate(-90deg)' : 'rotate(0deg)',
              transition: 'all 0.2s linear',
            }}
          >
            <MdOutlineArrowBackIosNew />
          </div>
        </div>
        <div
          style={{
            height: isShowCollapse ? refDiv.current?.offsetHeight : 0,
            transition: 'all 0.2s linear',
            overflow: 'hidden',
          }}
        >
          <div ref={refDiv}>
            {item.children.map((child) => (
              <RenderItemSideBar key={child.path} item={child} hasDivide level={level + 1} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      key={item.path}
      style={{
        borderBottom: hasDivide ? '1px solid #00000026' : '',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: level * 10,
        cursor: 'pointer',
      }}
      onClick={() => {
        router.push(item.path)
      }}
    >
      {item.label}
    </div>
  )
}
