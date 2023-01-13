import { addClassBody, removeClassBody, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { OptionsType } from '@/types'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '../input'

interface ISelectCustom<T> {
  value: T
  onChange: (value: T) => void
  label?: string
  disabled?: boolean
  buttonProps: Partial<any>
  options: OptionsType<T>[]
  zIndex?: number
}

export const SelectCustom = <T,>({
  value,
  onChange,
  label,
  disabled,
  options,
  buttonProps,
  zIndex,
}: ISelectCustom<T>) => {
  const [open, setOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const [hoverItem, setHoverItem] = useState<T>()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const refChild = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    setOpen(true)
    addClassBody('overflow')
  }

  const handleClose = () => {
    setOpen(false)
    removeClassBody('overflow')
  }

  const getColor = (item: OptionsType<T>) => {
    if (value === item.value) {
      return themeValue[darkTheme].colors.blue400
    }
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
    <div ref={divRef} style={{ width: '100%' }}>
      <Input
        value={options.find((item) => item.value === value)?.label}
        label={label}
        readOnly
        onFocus={handleOpen}
        onBlur={handleClose}
        {...buttonProps}
      />
      <div
        style={{
          position: 'fixed',
          top: getPositionY(),
          left: divRef.current?.getBoundingClientRect()?.left ?? 0,
          width: !disabled && open ? '100%' : 0,
          backgroundColor: themeValue[darkTheme].colors.gray200,
          boxShadow: themeValue[darkTheme].shadows.lg,
          zIndex: zIndex ?? 50,
          borderRadius: 10,
          overflow: 'hidden',
          maxHeight: '30vh',
        }}
        ref={refChild}
      >
        {options.map((item) => (
          <div
            style={{
              width: '100%',
              height: 40,
              paddingLeft: 10,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: getColor(item),
            }}
            onMouseMove={() => setHoverItem(item.value)}
            onMouseOut={() => setHoverItem(undefined)}
            onMouseDown={() => {
              onChange(item.value)
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
