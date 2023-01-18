import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useSelector } from 'react-redux'
import { TaskCard } from '../task-card/TaskCard'

interface ITaskStatus {
  progress: {
    title: string
    step: number
  }
  setDragOver: Function
  isDragOver: number
  listTaskState: {
    name: string
    step: number
  }[]
  setListTaskState: Function
  opentModalDetail: Function
}

export const TaskStatus = ({
  progress,
  setDragOver,
  isDragOver,
  listTaskState,
  setListTaskState,
  opentModalDetail,
}: ITaskStatus) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <div
      style={{
        border: `1px solid ${themeValue[darkTheme].colors.border}`,
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:
          isDragOver === progress.step
            ? themeValue[darkTheme].colors.gray200
            : themeValue[darkTheme].colors.gray50,
      }}
      onDragOver={(event) => {
        event.preventDefault()
        setDragOver(progress.step)
      }}
      onDrop={(e) => {
        e.preventDefault()
        const name = e.dataTransfer.getData('test')
        setListTaskState(
          listTaskState.map((item) => {
            if (item.name === name) {
              return { ...item, step: progress.step }
            }
            return item
          })
        )
        setDragOver(-1)
      }}
    >
      <div style={{ padding: '10px 4px', fontWeight: 500 }}>{progress.title}</div>
      <div
        style={{
          height: '100%',
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {listTaskState.map((task) => {
          if (task.step === progress.step) {
            return (
              <TaskCard
                key={task.name}
                task={task}
                setDragOver={setDragOver}
                onClickTask={opentModalDetail}
              />
            )
          }
          return null
        })}
      </div>
      <div style={{ padding: 4 }}>Add item</div>
    </div>
  )
}
