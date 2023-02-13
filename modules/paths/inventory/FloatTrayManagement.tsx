import { FloatTray } from '@/components'
import { SpeedDialType } from '@/types'
import { IoIosCreate } from 'react-icons/io'
import { DeletePathPopup } from './DeletePathPopup'

interface IFloatTrayCreate {
  callCreate: Function
  pathSelectedId: string[]
  setPathSelectedId: (value: string[]) => void
  setLetCall: (value: boolean) => void
}

export const FloatTrayManagement = ({
  callCreate,
  pathSelectedId,
  setPathSelectedId,
  setLetCall,
}: IFloatTrayCreate) => {
  let speedList: SpeedDialType[] = [
    {
      label: <IoIosCreate style={{ width: '60%', height: '60%' }} />,
      function: callCreate,
      color: 'primary',
    },
  ]

  if (pathSelectedId.length !== 0) {
    speedList = [
      {
        label: (
          <DeletePathPopup
            deleteId={pathSelectedId}
            setDeleteId={setPathSelectedId}
            setLetCallList={setLetCall}
          />
        ),
        function: () => {},
        color: pathSelectedId.length === 0 ? 'primary' : 'error',
      },
      ...speedList,
    ]
  }

  return <FloatTray buttonList={speedList} />
}
