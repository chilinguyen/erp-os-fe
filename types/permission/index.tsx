export interface PermissionResponse {
  id: string
  name: string
  userId: string[]
  created: string
  modified: string
  viewPoints: ViewPointKey
  editable: ViewPointKey
  isServer: 0 | 1
}

export interface PermissionRequest {
  name?: string
  userId?: string[]
  viewPoints?: ViewPointKey
  editable?: ViewPointKey
  isServer?: 0 | 1
}

export type PermissionRequestFailure = Record<keyof PermissionRequest, string>

export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
