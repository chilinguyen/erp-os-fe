import { CardBase } from '@/components'

interface ITaskCard {
  task: { name: string; step: number }
  setDragOver: Function
}

export const TaskCard = ({ task, setDragOver }: ITaskCard) => {
  return (
    <div
      onDragStart={(e) => {
        e.dataTransfer.setData('test', task.name)
      }}
      onDragEnd={() => {
        setDragOver(-1)
      }}
      draggable
      style={{ width: 'content', height: 'content' }}
    >
      <CardBase
        wrapperStyle={{
          padding: '8px 0 12px',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #cccccc',
          alignItems: 'start',
          cursor: 'all-scroll',
        }}
        hoveredStyle={{ backgroundColor: '#cccccc' }}
        title={{ content: task.name }}
      />
    </div>
  )
}
