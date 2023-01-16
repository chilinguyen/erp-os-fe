import { CardBase } from '@/components'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useSelector } from 'react-redux'

interface ITaskCard {
  task: { name: string; step: number }
  setDragOver: Function
  onClickTask: Function
}

export const TaskCard = ({ task, setDragOver, onClickTask }: ITaskCard) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

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
      onClick={() => onClickTask(true)}
    >
      <CardBase
        wrapperStyle={{
          padding: '8px 0 12px',
          backgroundColor: themeValue[darkTheme].colors.rapidBackgroundItem,
          borderRadius: '6px',
          border: `1px solid ${themeValue[darkTheme].colors.border}`,
          alignItems: 'start',
          cursor: 'all-scroll',
        }}
        hoveredStyle={{ border: '2px solid rgb(31, 111, 235)' }}
        title={{ content: task.name }}
      />
    </div>
  )
}
