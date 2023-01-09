import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'

interface IModal {
  children: ReactNode
  open: boolean
  setOpen?: (v: boolean) => void
  preventClose?: boolean
  zIndex?: number
  ModalStyle?: CSSProperties
  width?: number
}

export const Modal = ({
  children,
  open,
  setOpen,
  preventClose,
  zIndex,
  ModalStyle,
  width,
}: IModal) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleClose = () => {
    if (!preventClose && setOpen) setOpen(false)
  }

  return (
    <div
      onClick={handleClose}
      style={{
        zIndex: !open ? -1 : zIndex ?? undefined,
        position: 'fixed',
        inset: 0,
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          zIndex: !open ? -1 : (zIndex ?? 0) - 1,
          position: 'fixed',
          inset: 0,
          overflow: 'auto',
          backgroundColor: 'black',
          opacity: '50%',
        }}
      />
      <div
        style={{
          width: '90%',
          maxWidth: width ?? 400,
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
          boxShadow: themeValue[darkTheme].shadows.lg,
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          ...ModalStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}
