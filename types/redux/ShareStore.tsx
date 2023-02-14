import { PathResponse } from '../paths'
import { UserNotifications } from '../user'

export interface ShareStoreTypes {
  loading: number
  breakPoint: number
  language: {
    [key: string]: string
  }
  sidebar: SidebarItem[]
  notifications: UserNotifications[]
}

export interface SidebarItem {
  mainItem: PathResponse
  childrenItem: PathResponse[]
}
