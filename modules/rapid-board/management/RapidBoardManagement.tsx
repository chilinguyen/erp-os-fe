import { useState } from 'react'
import { TaskStatus } from '../comps'
import { listTask, progressList } from '../inventory'

export const RapidBoardManagement = () => {
  const [isDragOver, setDragOver] = useState(-1)
  const [listTaskState, setListTask] = useState(listTask)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 20, height: '90vh' }}
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
  )
}
