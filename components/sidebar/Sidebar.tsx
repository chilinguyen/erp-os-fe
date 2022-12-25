import { NavBarItems } from '../navbar/NavBarConstant'
import { RenderItemSideBar } from './RenderItemSideBar'

export const SideBar = () => {
  return (
    <div
      style={{
        width: 300,
        position: 'fixed',
        top: 76,
        left: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 900,
        boxShadow: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
        overflow: 'auto',
        fontWeight: 500,
      }}
    >
      {NavBarItems().map((item, index) => (
        <RenderItemSideBar
          key={item.path}
          item={item}
          hasDivide={index + 1 < NavBarItems().length}
          level={1}
        />
      ))}
    </div>
  )
}
