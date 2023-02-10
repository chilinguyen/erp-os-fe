import {
  PathResponse,
  PathTypeEnum,
  PermissionRequest,
  PermissionResponse,
  UserResponseSuccess,
  ViewPointType,
} from '@/types'

export const PathDefault: PathResponse = {
  id: '',
  path: '',
  label: '',
  type: PathTypeEnum.INTERNAL,
  icon: '',
  userId: [],
}

export const PermissionRequestDefault: PermissionRequest = {
  name: '',
  userId: [],
  viewPoints: {},
  editable: {},
  isServer: 0,
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

export const DefaultUser: UserResponseSuccess = {
  id: '',
  username: '',
  password: '',
  gender: 0,
  dob: '',
  address: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  tokens: {},
  created: '',
  modified: '',
  verified: false,
  verify2FA: false,
  active: 0,
  avatar: '',
  type: 'INTERNAL',
}

export const initUserRequest: ViewPointType[] = [
  { key: 'username', label: 'username' },
  { key: 'gender', label: 'gender' },
  { key: 'dob', label: 'dob' },
  { key: 'address', label: 'address' },
  { key: 'firstName', label: 'firstName' },
  { key: 'lastName', label: 'lastName' },
  { key: 'email', label: 'email' },
  { key: 'phone', label: 'phone' },
  { key: 'deleted', label: 'deleted' },
]
