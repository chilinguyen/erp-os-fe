import { useTranslation } from '@/hooks'
import { NavBarItemType } from '@/types'
import { useMemo } from 'react'

export const NavBarItems = () => {
  const dashboardPascal = useTranslation('dashboardPascal')

  const userPascal = useTranslation('userPascal')

  const userManagementPascal = useTranslation('userManagementPascal')

  const createUserPascal = useTranslation('createUserPascal')

  const permissionPascal = useTranslation('permissionPascal')

  const permissionManagementPascal = useTranslation('permissionManagementPascal')

  const permissionCreatePascal = useTranslation('permissionCreatePascal')

  const languagePascal = useTranslation('languagePascal')

  const langMangPascal = useTranslation('langMangPascal')

  const pathsPascal = useTranslation('path')

  const result = useMemo(() => {
    return [
      {
        label: dashboardPascal,
        path: '/',
      },
      {
        label: userPascal,
        path: '/user',
        children: [
          { label: userManagementPascal, path: '/user/management' },
          { label: createUserPascal, path: '/user/create' },
        ],
      },
      {
        label: permissionPascal,
        path: '/permission',
        children: [
          { label: permissionManagementPascal, path: '/permission/management' },
          { label: permissionCreatePascal, path: '/permission/create' },
        ],
      },
      {
        label: languagePascal,
        path: '/language',
        children: [{ label: langMangPascal, path: '/language/management' }],
      },
      {
        label: pathsPascal,
        path: '/paths',
      },
    ]
  }, [
    dashboardPascal,
    userPascal,
    userManagementPascal,
    createUserPascal,
    permissionPascal,
    permissionCreatePascal,
    languagePascal,
    langMangPascal,
    permissionManagementPascal,
    pathsPascal,
  ])

  return result as NavBarItemType[]
}
