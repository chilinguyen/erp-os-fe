import { convertValueToLabel, GenderList } from '@/lib'
import { PermissionRequest, PermissionResponse } from '@/types'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

export const listFunctionParseValue = () => {
  const genderList = GenderList()

  return {
    deleted: (value: number) => {
      if (value) return <AiOutlineCheckCircle color="green" />
      return <AiOutlineCloseCircle color="red" />
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
