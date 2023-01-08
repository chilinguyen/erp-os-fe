import * as DarkTheme from './dark-theme'
import * as LightTheme from './light-theme'

export const themeValue = {
  dark: DarkTheme,
  light: LightTheme,
}

export type ThemeKey = keyof typeof themeValue
