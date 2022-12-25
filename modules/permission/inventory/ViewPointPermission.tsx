import { useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { ViewPointType } from '@/types'
import { Checkbox } from '@nextui-org/react'
import { useSelector } from 'react-redux'

interface IViewPointPermission {
  listViewPoint: ViewPointType[]
  listViewChecked: ViewPointType[]
  setListViewPoint: Function
  editAble?: boolean
  keyObj: string
}

export const ViewPointPermission = ({
  listViewPoint,
  listViewChecked,
  setListViewPoint,
  editAble,
  keyObj,
}: IViewPointPermission) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      {listViewPoint.map((viewPoint) => (
        <div
          key={viewPoint.key}
          style={{ gridColumn: 'span 1 / span 1', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Checkbox
            isSelected={
              listViewChecked?.find((viewChecked) => viewChecked.key === viewPoint.key) && true
            }
            onChange={() => {
              if (listViewChecked.find((viewChecked) => viewChecked.key === viewPoint.key)) {
                setListViewPoint({
                  [keyObj]: listViewChecked.filter((item) => item.key !== viewPoint.key),
                })
                return
              }
              setListViewPoint({
                [keyObj]: [...listViewChecked, viewPoint],
              })
            }}
            isReadOnly={!editAble}
          >
            {translate(viewPoint.label)}
          </Checkbox>
        </div>
      ))}
    </div>
  )
}
