import { colorObj, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ButtonHTMLAttributes, useMemo } from 'react'
import { useSelector } from 'react-redux'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof colorObj
  light?: boolean
  auto?: boolean
}

export const Button = ({ color, auto, light, disabled, onClick, ...rest }: IButton) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }

  const getBackgroundColor = useMemo(() => {
    if (light) return undefined
    if (disabled) return themeValue[darkTheme].default.colors.gray400
    return colorObj[color ?? 'primary']
  }, [light, disabled, darkTheme, color])

  const getTextColor = useMemo(() => {
    if (disabled) return themeValue[darkTheme].default.colors.gray900
    if (light) return color ? colorObj[color] : themeValue[darkTheme].default.colors.gray900
    return 'white'
  }, [color, light, disabled, darkTheme])

  return (
    <button
      style={{
        backgroundColor: getBackgroundColor,
        width: light || auto ? 'content' : '100%',
        color: getTextColor,
        padding: '0 20px',
        height: '40px',
        border: disabled ? '1px solid #D7DBDF' : undefined,
        cursor: disabled ? 'default' : 'pointer',
      }}
      className="font-medium rounded-xl"
      type="button"
      onClick={handleClick}
      {...rest}
    />
  )
}
