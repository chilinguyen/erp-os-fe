import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { SettingButton } from './SettingButton'
import { SignOutButton } from './SignOutButton'

export const AccountInformation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { darkTheme, accountInfo } = useSelector(GeneralSettingsSelector)

  return (
    <div
      style={{
        width: '100%',
        height: '120px',
        aspectRatio: '1/1',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '120px',
          display: 'flex',
          padding: '0 10px',
          justifyContent: 'left',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ height: '60%', aspectRatio: '1 / 1', position: 'relative' }}>
          <Image src={accountInfo.avatar} layout="fill" />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div>
            {accountInfo.firstName} {accountInfo.lastName}
          </div>
          <div
            style={{
              height: '40px',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: themeValue[darkTheme].colors.blue200,
              borderRadius: '100%',
            }}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: isOpen ? '100%' : 0,
          transition: 'all 0.2s linear',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <SettingButton />
        <SignOutButton />
      </div>
    </div>
  )
}
