import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { InputHTMLAttributes, useId, forwardRef, useRef } from 'react'
import { useSelector } from 'react-redux'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string
  clearable?: boolean
  status?: string
  underlined?: boolean
  labelLeft?: string
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ helperText, labelLeft, status, clearable, underlined, ...rest }, ref) => {
    const { darkTheme } = useSelector(GeneralSettingsSelector)

    const id = useId()
    const refLabelLeft = useRef<HTMLSpanElement>(null)

    return (
      <div className="flex flex-col gap-1 w-full min-w-content">
        <label htmlFor={id} className="relative flex justify-center items-center w-full">
          {labelLeft && (
            <span
              ref={refLabelLeft}
              className="px-2 border-r h-min w-min font-medium"
              style={{
                borderRightColor: themeValue[darkTheme].default.colors.gray600,
                color: themeValue[darkTheme].default.colors.gray600,
              }}
            >
              {labelLeft}
            </span>
          )}
          <input
            ref={ref}
            {...rest}
            className="focus:outline-none peer h-10 bg-transparent px-2"
            id={id}
            style={{
              width: `calc(100% - ${refLabelLeft?.current?.offsetWidth ?? 0}px)`,
              color: themeValue[darkTheme].default.colors.foreground,
            }}
          />
          {underlined ? (
            <>
              <hr
                className="absolute bottom-0 right-1/2 translate-x-1/2 h-[3px] z-[1] peer-focus:w-full w-0"
                style={{
                  transition: 'width 0.25s ease',
                  backgroundColor: themeValue[darkTheme].default.colors.foreground,
                }}
              />
              <hr
                className="absolute bottom-0 left-0 right-0 h-[2px] z-[0]"
                style={{
                  transition: 'opacity 0.25s ease',
                  backgroundColor: themeValue[darkTheme].default.colors.border,
                }}
              />
            </>
          ) : null}
        </label>
        {helperText && (
          <div className="pl-1" style={{ fontSize: '10px' }}>
            {helperText}
          </div>
        )}
      </div>
    )
  }
)
