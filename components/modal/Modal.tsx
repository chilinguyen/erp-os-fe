import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

interface IModal {
  children: ReactNode
  open: boolean
  setOpen?: (v: boolean) => void
  preventClose?: boolean
  zIndex?: number
  ModalClassName?: string
  width?: number
}

export const Modal = ({
  children,
  open,
  setOpen,
  preventClose,
  zIndex,
  ModalClassName,
  width,
}: IModal) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleClose = () => {
    if (!preventClose && setOpen) setOpen(false)
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 overflow-auto bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: !open ? -1 : zIndex ?? undefined }}
    >
      <div
        className="fixed inset-0 overflow-auto bg-opacity-50 bg-black"
        style={{ zIndex: !open ? -1 : (zIndex ?? 0) - 1 }}
      />
      <div
        className={`rounded-2xl p-5 flex flex-col justify-center items-center ${ModalClassName}`}
        style={{
          width: '90%',
          maxWidth: width ?? 400,
          backgroundColor: themeValue[darkTheme].default.colors.backgroundContrast,
          boxShadow: themeValue[darkTheme].default.shadows.lg,
        }}
      >
        {children}
      </div>
    </div>
  )
}
