import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { Rapid } from '@/types/rapidboard/Rapid'
import { useState } from 'react'
import { MdFilterList } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { listTaskTable } from '../../inventory'
import RapidModal from '../rapid-modal/RapidModal'

export interface TableViewProps {
  style?: string
}

export default function TableView() {
  const [openModal, setOpenModal] = useState(false)
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleGetTask = () => {
    setOpenModal(true)
  }

  return (
    <>
      <RapidModal openModal={openModal} setOpenModal={setOpenModal} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(12, minmax(0, 1fr))`,
          height: '100%',
          backgroundColor: themeValue[darkTheme].colors.backgroundSelectedTab,
          borderCollapse: 'collapse',
        }}
      >
        {listTaskTable.map((item, index) =>
          item.map((task: Rapid, index2) => (
            <div
              style={{
                gridColumn: `span ${task.colspan} / span ${task.colspan}`,
                borderLeft: `${index2 === 0 ? '1px solid rgb(48,54,61)' : 'none'}`,
                borderRight: '1px solid rgb(48,54,61)',
                borderBottom: '1px solid rgb(48,54,61)',
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                cursor: 'pointer',
              }}
              onClick={handleGetTask}
            >
              {index === 0 && index2 === 0 && (
                <div>
                  <MdFilterList />
                </div>
              )}
              {index !== 0 && index2 === 0 && <div>{index}</div>}
              <div>{task.title}</div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
