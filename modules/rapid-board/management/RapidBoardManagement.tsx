import { useState } from 'react'
import { TaskStatus } from '../comps'
import RapidTab from '../comps/rapid-tab/RapidTab'
import TableView from '../comps/table-view/TableView'
import { listTask, progressList } from '../inventory'

const dataTab = ['Process', 'Priority', 'Team']
export const RapidBoardManagement = () => {
  const [isDragOver, setDragOver] = useState(-1)
  const [listTaskState, setListTask] = useState(listTask)
  const [, setCurrentTab] = useState<string>(dataTab[0])
  const [view, setView] = useState<String>('BOARD')
  return (
    <RapidTab
      tabData={dataTab}
      tabItem={
        view === 'BOARD' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              paddingTop: 20,
              height: '90vh',
              width: '100%',
            }}
          >
            <div style={{ fontWeight: 500, fontSize: 24 }}>Progress Board</div>
            <div style={{ overflow: 'auto', height: '100%' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${progressList.length}, minmax(0, 1fr))`,
                  height: '100%',
                  gap: 5,
                  minWidth: progressList.length * 205 - 5,
                }}
              >
                {progressList.map((progress) => (
                  <TaskStatus
                    key={progress.step}
                    progress={progress}
                    isDragOver={isDragOver}
                    setDragOver={setDragOver}
                    listTaskState={listTaskState}
                    setListTaskState={setListTask}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <TableView />
        )
      }
      tabContainerStyle={{
        display: 'flex',
        margin: '30px 0px 30px 0px',
        padding: '0px 0px 0px 30px',
        borderBottom: '1px solid rgb(48,54,61)',
      }}
      tabStyle={{
        padding: '10px 0px 10px 0px',
        // borderLeft: '1px solid rgb(48,54,61)',
        // borderRight: '1px solid rgb(48,54,61)',
        width: '100px',
      }}
      tabItemStyle={{}}
      onHandleChangeTab={setCurrentTab}
      onHandleToggleView={setView}
    />
  )
}
