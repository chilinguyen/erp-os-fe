import { ViewPointType } from '../permission'

export interface CommonResponseType<T> {
  success: boolean
  result: T
  message: string
  statusCode: number
  viewPoints: ViewPointType[]
  editable: ViewPointType[]
}

export interface CommonListResultType<T> {
  data: T[]
  page: number
  pageSize: number
  totalRows: number
}

export type QueryParams = {
  id?: string
  page?: string
  pageSize?: string
  allParams?: { [key: string]: string }
  keySort?: string
  sortField?: string
} & { [key: string]: string | number }
