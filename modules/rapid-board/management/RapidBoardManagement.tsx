import { useState } from 'react'
import BoardView from '../comps/board-view/BoardView'
import RapidTab from '../comps/rapid-tab/RapidTab'
import TableView from '../comps/table-view/TableView'

const dataTab = ['Process', 'Priority', 'Team']
export const RapidBoardManagement = () => {
  const [, setCurrentTab] = useState<string>(dataTab[0])
  const [view, setView] = useState<String>('BOARD')
  return (
    <RapidTab
      tabData={dataTab}
      tabItem={view === 'BOARD' ? <BoardView /> : <TableView />}
      tabContainerStyle={{
        display: 'flex',
        margin: '30px 0px 0px 0px',
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
