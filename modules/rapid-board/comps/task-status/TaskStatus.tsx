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
}

export const TaskStatus = ({
  progress,
  setDragOver,
  isDragOver,
  listTaskState,
  setListTaskState,
}: ITaskStatus) => {
  return (
    <div
      style={{
        border: '1px solid #cccccc',
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDragOver === progress.step ? 'red' : 'rgb(246, 248, 250)',
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
            return <TaskCard key={task.name} task={task} setDragOver={setDragOver} />
          }
          return null
        })}
      </div>
      <div style={{ padding: 4 }}>Add item</div>
    </div>
  )
}
