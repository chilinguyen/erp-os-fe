import { PathResponse } from '../paths'

export interface ShareStoreTypes {
  loading: number
  breakPoint: number
  language: {
    [key: string]: string
  }
  sidebar: SidebarItem[]
}

export interface SidebarItem {
  mainItem: PathResponse
  childrenItem: PathResponse[]
}
