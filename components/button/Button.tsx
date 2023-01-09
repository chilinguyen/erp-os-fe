import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ButtonHTMLAttributes, useMemo } from 'react'
import { useSelector } from 'react-redux'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'success' | 'secondary' | 'warning' | 'error' | 'gradient'
  light?: boolean
  auto?: boolean
}

export const Button = ({ color = 'primary', auto, light, disabled, onClick, ...rest }: IButton) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }

  const getBackgroundColor = useMemo(() => {
    if (light) return undefined
    if (disabled) return themeValue[darkTheme].colors.gray400
    return themeValue[darkTheme].colors[color]
  }, [light, disabled, darkTheme, color])

  const getTextColor = useMemo(() => {
    if (disabled) return themeValue[darkTheme].colors.gray900
    if (light)
      return color ? themeValue[darkTheme].colors[color] : themeValue[darkTheme].colors.gray900
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
        fontWeight: 500,
        borderRadius: '12px',
      }}
      type="button"
      onClick={handleClick}
      {...rest}
    />
  )
}
