import { PathResponse } from '../paths'

export interface NavbarResponseSuccess {
  id: string
  name: string
  userIds: string[]
  mainSidebar: PathResponse[]
  childrenSidebar: PathResponse[]
}
