import { DefaultLayout } from '@/components'
import { PermissionManagement } from '@/modules/permission'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const PermissionManagementPage: NextPageWithLayout = () => {
  return <PermissionManagement />
}

PermissionManagementPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default PermissionManagementPage
