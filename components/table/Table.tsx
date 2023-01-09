import { HTMLAttributes, MouseEvent, useState } from 'react'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ActionType, ViewPointType } from '@/types'
import { NextRouter, useRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Loading } from '../loading'

interface ICustomTable extends HTMLAttributes<HTMLTableElement> {
  header: ViewPointType[]
  body: { [key: string]: any }[]
  listActions?: ActionType[]
  listFunctionParseValue?: { [key: string]: Function }
  handleChangeSelection?: Function
  loading?: boolean
  selectionMode?: 'single' | 'multiple' | 'none'
  selectedKeys?: string[]
}

export function CustomTable({
  body,
  header,
  handleChangeSelection,
  listActions,
  listFunctionParseValue,
  loading,
  selectionMode = 'none',
  selectedKeys,
  ...rest
}: ICustomTable) {
  const router = useRouter()
  const translate = useTranslationFunction()
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const [hoverId, setHoverId] = useState('')

  const detail = useTranslation('detail')

  const renderCell = (data: { [key: string]: any }, columnKey: React.Key) => {
    if (listFunctionParseValue?.[columnKey]) {
      return listFunctionParseValue[columnKey]!(data[columnKey])
    }

    if (typeof data?.[columnKey] === 'object') {
      return null
    }

    switch (columnKey) {
      case 'actions':
        return (
          listActions ?? [
            {
              content: detail,
              icon: <AiOutlineEye size={20} fill="#979797" />,
              func: (id: string, router: NextRouter) => {
                router.push(`/user/${id}`)
              },
            },
          ]
        ).map((action) => (
          <div style={{ cursor: 'pointer' }}>
            {/* <Tooltip content={action.content}> */}
            <div
              onClick={(e) => {
                action.func(data?.id, router)
                e.stopPropagation()
              }}
            >
              {action.icon}
            </div>
            {/* </Tooltip> */}
          </div>
        ))
      default:
        return data[columnKey]?.toString()
    }
  }

  const handleChange = (event: MouseEvent<HTMLTableRowElement>) => {
    const value = event.currentTarget.id
    if (handleChangeSelection) {
      switch (selectionMode) {
        case 'single':
          if (selectedKeys?.[0] === value) {
            handleChangeSelection([])
          } else {
            handleChangeSelection([value])
          }
          break
        case 'multiple':
          if (!!selectedKeys?.find((item) => item === value)) {
            handleChangeSelection(selectedKeys.filter((item) => item !== value))
          } else {
            handleChangeSelection([...(selectedKeys ?? []), value])
          }
          break
        default:
          handleChangeSelection(body.map((item) => item?.id ?? ''))
      }
    }
  }

  const getBackgroundColor = (itemId: string) => {
    if (!!selectedKeys?.find((item) => item === itemId)) {
      return themeValue[darkTheme].colors.blue200
    }
    if (hoverId === itemId) {
      return themeValue[darkTheme].colors.gray50
    }
    return undefined
  }

  const getTextColor = (itemId: string) => {
    if (!!selectedKeys?.find((item) => item === itemId)) {
      return themeValue[darkTheme].colors.primary
    }
    return themeValue[darkTheme].colors.gray900
  }

  if (loading)
    return (
      <div
        style={{ marginTop: 20, textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  return (
    <div style={{ width: '100%', overflow: 'auto', padding: '16px 12px', marginTop: 20 }}>
      <table {...rest}>
        <thead>
          <tr>
            <th
              style={{
                padding: '1px 1px 1px 16px',
                paddingLeft: '16px',
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px',
                backgroundColor: themeValue[darkTheme].colors.gray50,
              }}
            >
              {' '}
            </th>
            {header.map((itemHead, index) => (
              <th
                style={{
                  padding: `1px ${index === header.length - 1 ? '16px' : '1px'} 1px 1px`,
                  borderTopRightRadius: index === header.length - 1 ? '12px' : undefined,
                  borderBottomRightRadius: index === header.length - 1 ? '12px' : undefined,
                  fontSize: '12px',
                  backgroundColor: themeValue[darkTheme].colors.gray50,
                  color: themeValue[darkTheme].colors.gray700,
                }}
                key={itemHead.key}
              >
                {translate(itemHead.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((itemBody) => (
            <tr
              style={{
                color: getTextColor(itemBody?.id),
                backgroundColor: getBackgroundColor(itemBody?.id),
                cursor: 'default',
              }}
              onMouseEnter={() => {
                setHoverId(itemBody?.id)
              }}
              onMouseLeave={() => {
                setHoverId('')
              }}
              key={itemBody?.id}
              onClick={handleChange}
              id={itemBody?.id}
            >
              {[{ key: 'actions', label: '' }, ...header].map((itemHead, index) => (
                <td
                  style={{
                    whiteSpace: 'nowrap',
                    padding: `10px ${index === header.length ? '16px' : '10px'} 10px ${
                      index === 0 ? '16px' : '1px'
                    }`,
                    borderTopLeftRadius: index === 0 ? '12px' : undefined,
                    borderBottomLeftRadius: index === 0 ? '12px' : undefined,
                    borderTopRightRadius: index === header.length ? '12px' : undefined,
                    borderBottomRightRadius: index === header.length ? '12px' : undefined,
                  }}
                  key={itemHead.key}
                >
                  {renderCell(itemBody, itemHead.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
