import { FloatTray } from '@/components'
import { SpeedDialType } from '@/types'
import { AiOutlineCloseSquare, AiOutlineDownSquare } from 'react-icons/ai'
import { BsSave } from 'react-icons/bs'
import { MdCancel, MdModeEditOutline } from 'react-icons/md'

interface IFloatTrayDetail {
  type: 'read' | 'update'
  handleSetTypeUpdate: Function
  handleChangeStatus: Function
  callUpdate: Function
  handleSetTypeRead: Function
  status: number
}

export const FloatTrayDetail = ({
  type,
  handleSetTypeUpdate,
  handleChangeStatus,
  status,
  callUpdate,
  handleSetTypeRead,
}: IFloatTrayDetail) => {
  const getSpeedDiaList = () => {
    let speedList: SpeedDialType[] = [
      {
        label:
          status === 0 ? (
            <AiOutlineDownSquare style={{ width: '80%', height: '80%' }} />
          ) : (
            <AiOutlineCloseSquare style={{ width: '80%', height: '80%' }} />
          ),
        function: handleChangeStatus,
        color: status === 0 ? 'success' : 'warning',
      },
    ]

    if (type === 'read') {
      speedList = [
        ...speedList,
        {
          label: <MdModeEditOutline style={{ width: '80%', height: '80%' }} />,
          function: handleSetTypeUpdate,
        },
        {
          label: <MdCancel style={{ width: '80%', height: '80%' }} />,
          router: '/user/management',
          color: 'warning',
        },
      ]
    }

    if (type === 'update') {
      speedList = [
        ...speedList,
        {
          label: <BsSave style={{ width: '60%', height: '60%' }} />,
          function: callUpdate,
          color: 'success',
        },
        {
          label: <MdCancel style={{ width: '80%', height: '80%' }} />,
          function: handleSetTypeRead,
          color: 'warning',
        },
      ]
    }

    return speedList
  }

  return <FloatTray buttonList={getSpeedDiaList()} />
}
