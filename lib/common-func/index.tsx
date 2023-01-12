import { OptionsType, ViewPointType } from '@/types'

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString('base64')
}

export const encodeBase64Url = (data: string) => {
  return Buffer.from(data).toString('base64url')
}

export const decodeBase64 = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii')
}
const jwt = require('jsonwebtoken')

export const generateToken = (content: { userId: string; deviceId: string }) => {
  const contentJwt = {
    ...content,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000 + 60 * 60),
  }

  const token = jwt.sign(contentJwt, process.env.NEXT_PUBLIC_SECRET_JWT_KEY || '', {
    algorithm: 'HS512',
  })

  return `Bearer ${token}`
}

export const convertValueToLabel = <T,>(value: T, list: OptionsType<T>[]) => {
  return list.find((item) => item.value === value)?.label ?? ''
}

export const lostOddProps = <T extends {}>(source: Partial<T>, editable: ViewPointType[] = []) => {
  let target: Partial<T> = {}
  editable.forEach((key) => {
    if (source?.[key.key as keyof T] !== undefined) {
      target = { ...target, [key.key as keyof T]: source[key.key as keyof T] }
    }
  })

  return target
}

export const getListEditAble = (editable: ViewPointType[] = []) => {
  let listReturn = {}
  editable.forEach((key) => {
    listReturn = { ...listReturn, [key.key]: true }
  })
  return listReturn
}

export const getTotalPage = (totalRows: number, pageSize: number) => {
  if (totalRows <= pageSize) return 1
  return Math.round(totalRows / pageSize)
}

export const addClassBody = (className: string) => {
  if (typeof window !== undefined) {
    document.body.classList.add(className)
  }
}

export const removeClassBody = (className: string) => {
  if (typeof window !== undefined) {
    document.body.classList.remove(className)
  }
}
