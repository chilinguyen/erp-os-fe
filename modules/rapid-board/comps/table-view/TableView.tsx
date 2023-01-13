import * as React from 'react'

export interface TableViewProps {
  style?: string
}

export default function TableView() {
  return <div>{[1, 2, 3, 4].map(() => [1, 2, 3, 4].map(() => <div>asdas</div>))}</div>
}
