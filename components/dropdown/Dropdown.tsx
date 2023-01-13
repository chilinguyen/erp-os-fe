import { removeClassBody, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ColorType, OptionsType } from '@/types'
import { useRef, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Button } from '../button'

interface IDropdown<T> {
  disabled?: boolean
  options: OptionsType<T>[]
  button: string
  styleType?: 'flat' | 'light' | 'ghost' | 'default'
  color?: ColorType
  onClick: Function
  zIndex?: number
}

export const Dropdown = <T,>({
  disabled,
  options,
  button,
  color,
  styleType,
  onClick,
  zIndex,
}: IDropdown<T>) => {
  const [open, setOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const refChild = useRef<HTMLDivElement>(null)
  const [hoverItem, setHoverItem] = useState<T>()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    removeClassBody('overflow')
  }

  const getColor = (item: OptionsType<T>) => {
    if (hoverItem === item.value) {
      return themeValue[darkTheme].colors.blue200
    }
    return ''
  }

  const getPositionY = () => {
    if (typeof window !== 'undefined' && divRef.current && refChild.current) {
      const positionParent = divRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const heightParent = divRef.current.getBoundingClientRect().height
      const heightChild = refChild.current.getBoundingClientRect().height

      if (positionParent + heightParent + heightChild < windowHeight) {
        return positionParent + heightParent
      }

      return positionParent - heightChild
    }
    return 0
  }

  return (
    <div ref={divRef}>
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: !disabled && open ? '100vw' : 0,
          zIndex: zIndex ?? 49,
        }}
      />
      <Button
        color={color}
        styleType={styleType}
        onClick={() => {
          if (open) {
            handleClose()
          } else {
            handleOpen()
          }
        }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {button}
        <MdArrowDropDown />
      </Button>
      <div
        style={{
          position: 'fixed',
          top: getPositionY(),
          left: divRef.current?.getBoundingClientRect()?.left ?? 0,
          width: !disabled && open ? 'max-content' : 0,
          backgroundColor: themeValue[darkTheme].colors.gray200,
          boxShadow: themeValue[darkTheme].shadows.lg,
          zIndex: zIndex ?? 50,
          borderRadius: 10,
          overflow: 'hidden',
          maxHeight: '30vh',
          minWidth: 200,
        }}
        ref={refChild}
      >
        {options.map((item) => (
          <div
            style={{
              width: '100%',
              height: 40,
              padding: 10,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: getColor(item),
            }}
            onMouseMove={() => setHoverItem(item.value)}
            onMouseOut={() => setHoverItem(undefined)}
            onMouseDown={() => {
              onClick(item.value)
            }}
            onBlur={() => {}}
            key={item.value?.toString()}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
