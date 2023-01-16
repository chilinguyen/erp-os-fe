import { Rapid } from '@/types/rapidboard/Rapid'

export const progressList = [
  {
    title: 'TO DO',
    step: 1,
  },
  {
    title: 'DOING',
    step: 2,
  },
  {
    title: 'REVIEW',
    step: 3,
  },
  {
    title: 'DONE',
    step: 4,
  },
]

export const listTask = [
  { name: 'test 1', step: 1 },
  { name: 'test 2', step: 2 },
  { name: 'test 3', step: 3 },
  { name: 'test 4', step: 4 },
  { name: 'test 5', step: 2 },
  { name: 'test 6', step: 2 },
  { name: 'test 7', step: 3 },
]

const dataRow = [...Array(10)].map(() => [
  {
    title: 'Implement documentation',
    colspan: '7',
    value: '',
  },
  {
    title: 'Erik Tran',
    colspan: '1',
    value: '',
  },
  {
    title: 'Done',
    colspan: '1',
    value: '',
  },
  {
    title: '',
    colspan: '1',
    value: '',
  },
  {
    title: '10/01/2023',
    colspan: '1',
    value: '',
  },
  {
    title: '',
    colspan: '1',
    value: '',
  },
])
export const listTaskTable: Rapid[][] = [
  [
    {
      title: 'Title',
      colspan: '7',
      value: '',
    },
    {
      title: 'Assignees',
      colspan: '1',
      value: '',
    },
    {
      title: 'Status',
      colspan: '1',
      value: '',
    },
    {
      title: 'Description',
      colspan: '1',
      value: '',
    },
    {
      title: 'Due date',
      colspan: '1',
      value: '',
    },
    {
      title: '+',
      colspan: '1',
      value: '',
    },
  ],
  ...dataRow,
]
