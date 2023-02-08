import { SidebarItem } from '../redux'

export interface NavbarResponseSuccess {
  id: string
  name: string
  userIds: string[]
  content: SidebarItem[]
}
