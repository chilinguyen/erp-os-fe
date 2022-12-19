export interface PathResponse {
  id: string
  label: string
  path: string
  type: PathTypeEnum
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
