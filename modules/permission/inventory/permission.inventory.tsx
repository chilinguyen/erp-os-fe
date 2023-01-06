import { convertValueToLabel, StatusList } from '@/lib'
import { PermissionRequest, PermissionResponse } from '@/types'

export const listFunctionParseValue = () => {
  const statusList = StatusList()

  return {
    deleted: (value: number) => {
      return convertValueToLabel(value, statusList)
    },
  }
}

export const PermissionRequestDefault: PermissionRequest = {
  name: '',
  userId: [],
  viewPoints: {},
  editable: {},
}

export const inputStylesPermission = ({ error }: { error?: string }) => {
  const initialValue: Partial<any> = {
    status: error ? 'error' : 'default',
    helperText: error || '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}

export const PermissionResponseDefault: PermissionResponse = {
  id: '',
  name: '',
  userId: [],
  created: '',
  modified: '',
  viewPoints: {},
  editable: {},
}
