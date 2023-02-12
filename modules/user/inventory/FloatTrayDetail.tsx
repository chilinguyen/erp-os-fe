import { FloatTray } from '@/components'
import { SpeedDialType } from '@/types'
import { BiCheckCircle } from 'react-icons/bi'
import { FiSave } from 'react-icons/fi'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { MdModeEditOutline } from 'react-icons/md'

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
            <BiCheckCircle style={{ width: '60%', height: '60%' }} />
          ) : (
            <IoMdCloseCircleOutline style={{ width: '70%', height: '70%' }} />
          ),
        function: handleChangeStatus,
        color: status === 0 ? 'success' : 'warning',
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
          router: '/user/management',
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
          color: 'success',
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
