import { OptionsType } from '@/types'
import { useRef, useState } from 'react'

interface ISelectCustom<T> {
  value: T
  onChange: (value: T) => void
  label?: string
  disabled?: boolean
  buttonProps: Partial<any>
  options: OptionsType<T>[]
}

export const SelectCustom = <T,>({
  value,
  onChange,
  label,
  disabled,
  options,
  buttonProps,
}: ISelectCustom<T>) => {
  const [open, setOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const [hoverItem, setHoverItem] = useState<T>()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getColor = (item: OptionsType<T>) => {
    if (value === item.value) {
      return 'blue'
    }
    if (hoverItem === item.value) {
      return 'black'
    }
    return ''
  }

  return (
    <>
      {handleOpen}
      {handleClose}
      {buttonProps}
      {label}
      <div ref={divRef} style={{ width: '100%', position: 'relative' }}>
        {/* <Input
        value={options.find((item) => item.value === value)?.label}
        label={label}
        readOnly
        onFocus={handleOpen}
        onBlur={handleClose}
        {...buttonProps}
      /> */}
        {!disabled && open && (
          <div
            style={{
              position: 'absolute',
              top: divRef?.current?.clientHeight,
              left: 0,
              width: 375,
              backgroundColor: 'blue',
              boxShadow: 'black',
              zIndex: 101,
              borderRadius: 10,
            }}
          >
            {options.map((item) => (
              <div
                style={{
                  width: '100',
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
        )}
      </div>
    </>
  )
}
