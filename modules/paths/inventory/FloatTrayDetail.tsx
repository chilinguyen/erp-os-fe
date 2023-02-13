import { FloatTray } from '@/components'
import { SpeedDialType } from '@/types'
import { FiSave } from 'react-icons/fi'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { MdModeEditOutline } from 'react-icons/md'
import { DeletePathPopup } from './DeletePathPopup'

interface IFloatTrayDetail {
  type: 'read' | 'update'
  handleSetTypeUpdate: Function
  handleSetTypeRead: Function
  id: string
  deleteSuccess: (value: boolean) => void
  callUpdate: Function
}

export const FloatTrayDetail = ({
  id,
  deleteSuccess,
  handleSetTypeUpdate,
  callUpdate,
  handleSetTypeRead,
  type,
}: IFloatTrayDetail) => {
  const getSpeedDiaList = () => {
    let speedList: SpeedDialType[] = [
      {
        label: <DeletePathPopup deleteId={[id]} setLetCallList={deleteSuccess} />,
        function: () => {},
        color: 'error',
      },
    ]

    if (type === 'read') {
      speedList = [
        ...speedList,
        {
          label: <MdModeEditOutline style={{ width: '50%', height: '50%' }} />,
          function: handleSetTypeUpdate,
        },
        {
          label: <IoArrowBackCircleOutline style={{ width: '60%', height: '60%' }} />,
          router: '/paths/management',
          color: 'warning',
        },
      ]
    }

    if (type === 'update') {
      speedList = [
        ...speedList,
        {
          label: <FiSave style={{ width: '60%', height: '60%' }} />,
          function: callUpdate,
        },
        {
          label: <IoArrowBackCircleOutline style={{ width: '60%', height: '60%' }} />,
          function: handleSetTypeRead,
          color: 'warning',
        },
      ]
    }

    return speedList
  }

  return <FloatTray buttonList={getSpeedDiaList()} />
}
