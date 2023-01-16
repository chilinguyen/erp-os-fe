import { PathResponse } from '../paths'

export interface NavbarResponseSuccess {
  id: string
  name: string
  userIds: string[]
  content: {
    mainItem: PathResponse
    childrenItem: PathResponse[]
  }[]
}
