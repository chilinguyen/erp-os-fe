export interface PathResponse {
  id: string
  label: string
  path: string
  type: PathTypeEnum
  icon: string
  userId: string[]
}

export interface PathRequest {
  label: string
  path: string
  type: PathTypeEnum
  icon: string
  userId: string[]
}

export enum PathTypeEnum {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export interface PathListResponse {
  data: PathResponse[]
  page: number
  pageSize: number
  totalRows: number
}

export type PathRequestFailure = Record<keyof PathRequest, string>
