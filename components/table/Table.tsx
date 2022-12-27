import { useTranslation, useTranslationFunction } from '@/hooks'
import { ActionType, ViewPointType } from '@/types'
import { Col, Container, Loading, Row, Table, TableProps, Tooltip } from '@nextui-org/react'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'

interface ICustomTable {
  header: ViewPointType[]
  body: { [key: string]: any }[]
  listActions?: ActionType[]
  listFunctionParseValue?: { [key: string]: Function }
  handleChangeSelection?: Function
  loading?: boolean
}

export function CustomTable({
  header,
  body,
  listActions,
  listFunctionParseValue,
  handleChangeSelection,
  loading,
  ...props
}: ICustomTable & TableProps) {
  const router = useRouter()
  const translate = useTranslationFunction()

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
          <Row justify="center" align="center">
            {(
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
              <Col key={action.content} css={{ d: 'flex' }}>
                <Tooltip content={action.content}>
                  <div
                    onClick={(e) => {
                      action.func(data?.id, router)
                      e.stopPropagation()
                    }}
                  >
                    {action.icon}
                  </div>
                </Tooltip>
              </Col>
            ))}
          </Row>
        )
      default:
        return data[columnKey]?.toString()
    }
  }

  const handleChange = (keys: 'all' | Set<React.Key>) => {
    if (handleChangeSelection) {
      if (keys === 'all') {
        handleChangeSelection(body.map((item) => item?.id ?? ''))
      } else {
        handleChangeSelection(Array.from(keys))
      }
    }
  }

  return loading ? (
    <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
      <Loading />
    </Container>
  ) : (
    <Table
      aria-label="Example table with dynamic content"
      onSelectionChange={handleChange}
      {...props}
    >
      <Table.Header columns={[{ key: 'actions', label: '' }].concat(header)}>
        {(column) => (
          <Table.Column key={column.key}>
            {column?.label ? translate(column.label) : ''}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={body}>
        {(item) => (
          <Table.Row key={item?.id}>
            {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}
