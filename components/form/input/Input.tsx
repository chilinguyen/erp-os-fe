import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { PseudoType } from '@/types'
import { InputHTMLAttributes, useId, forwardRef, useRef, useState } from 'react'
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

    const [pseudo, setPseudo] = useState<PseudoType>('none')

    const handleFocus = () => {
      setPseudo('focus')
    }

    const handleBlur = () => {
      setPseudo('none')
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%',
          minWidth: 'content',
        }}
      >
        <label
          htmlFor={id}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {labelLeft && (
            <span
              ref={refLabelLeft}
              style={{
                color: themeValue[darkTheme].default.colors.gray600,
                padding: '0 0.5rem',
                borderRight: `1px solid ${themeValue[darkTheme].default.colors.gray600}`,
                height: 'min-content',
                width: 'min-content',
                fontWeight: 500,
              }}
            >
              {labelLeft}
            </span>
          )}
          <input
            ref={ref}
            {...rest}
            id={id}
            style={{
              width: `calc(100% - ${refLabelLeft?.current?.offsetWidth ?? 0}px)`,
              color: themeValue[darkTheme].default.colors.foreground,
              height: '2.5rem',
              background: 'transparent',
              padding: '0 0.5rem',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {underlined ? (
            <>
              <hr
                style={{
                  transition: 'width 0.25s ease',
                  backgroundColor: themeValue[darkTheme].default.colors.foreground,
                  position: 'absolute',
                  bottom: 0,
                  right: '50%',
                  translate: '50% 0',
                  height: '0.188rem',
                  zIndex: 1,
                  width: pseudo === 'focus' ? '100%' : '0',
                }}
              />
              <hr
                style={{
                  transition: 'opacity 0.25s ease',
                  backgroundColor: themeValue[darkTheme].default.colors.border,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '0.125rem',
                  zIndex: 0,
                  opacity: pseudo === 'focus' ? '0' : '100%',
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