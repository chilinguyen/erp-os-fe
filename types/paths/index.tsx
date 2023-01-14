export interface PathResponse {
  id: string
  label: string
  path: string
  type: PathTypeEnum
  icon: string
}

export interface PathRequest {
  label: string
  path: string
  type: PathTypeEnum
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
