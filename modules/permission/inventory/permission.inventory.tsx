import { convertValueToLabel, GenderList } from '@/lib'
import { PermissionRequest, PermissionResponse } from '@/types'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

export const listFunctionParseValue = () => {
  const genderList = GenderList()

  return {
    active: (value: number) => {
      if (value) return <AiOutlineCloseCircle color="red" />
      return <AiOutlineCheckCircle color="green" />
    },
    verified: (value: boolean) => {
      if (value) return <AiOutlineCheckCircle color="green" />
      return <AiOutlineCloseCircle color="red" />
    },
    verify2FA: (value: boolean) => {
      if (value) return <AiOutlineCheckCircle color="green" />
      return <AiOutlineCloseCircle color="red" />
    },
    gender: (value: number) => {
      return convertValueToLabel(value, genderList)
    },
  }
}

export const PermissionRequestDefault: PermissionRequest = {
  name: '',
  userId: [],
  viewPoints: {},
  editable: {},
  isServer: 0,
}

export const inputStylesPermission = ({ error }: { error?: string }) => {
  const initialValue: Partial<any> = {
    status: error ? 'error' : undefined,
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
  isServer: 0,
}
