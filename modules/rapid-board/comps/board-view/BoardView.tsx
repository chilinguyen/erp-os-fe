import React, { useState } from 'react'
import { listTask, progressList } from '../../inventory'
import RapidModal from '../rapid-modal/RapidModal'
import { TaskStatus } from '../task-status/TaskStatus'

export default function BoardView() {
  const [isDragOver, setDragOver] = useState(-1)
  const [listTaskState, setListTask] = useState(listTask)
  const [openModal, setOpenModal] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        paddingTop: 20,
        height: '90vh',
        width: '100%',
        backgroundColor: 'rgb(13, 17, 23)',
      }}
    >
      <RapidModal openModal={openModal} setOpenModal={setOpenModal} />

      <div style={{ fontWeight: 500, fontSize: 24, marginLeft: 10 }}>Progress Board</div>
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
              opentModalDetail={setOpenModal}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
