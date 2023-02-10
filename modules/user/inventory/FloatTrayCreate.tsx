import { FloatTray } from '@/components'
import { CiSaveDown1 } from 'react-icons/ci'
import { MdCancel } from 'react-icons/md'

interface IFloatTrayCreate {
  directManagement: Function
  callCreate: Function
}

export const FloatTrayCreate = ({ directManagement, callCreate }: IFloatTrayCreate) => {
  return (
    <FloatTray
      buttonList={[
        {
          label: <CiSaveDown1 style={{ width: '80%', height: '80%' }} />,
          function: callCreate,
          color: 'success',
        },
        {
          label: <MdCancel style={{ width: '80%', height: '80%' }} />,
          function: directManagement,
          color: 'warning',
        },
      ]}
    />
  )
}
