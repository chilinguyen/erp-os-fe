import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { UserNotifications } from '@/types'
import { useSelector } from 'react-redux'

interface INotiItem {
  data: UserNotifications
}

export const NotificationItem = ({ data }: INotiItem) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <div
      style={{
        width: '100%',
        height: '60px',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 5,
        padding: '0px 20px',
        cursor: 'pointer',
        position: 'relative',
        borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 'bold' }}>{data ? data.sendTime : 'error'}</div>
      <div>{data ? data.content : 'error'}</div>
    </div>
  )
}
