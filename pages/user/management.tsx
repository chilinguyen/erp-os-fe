import { DefaultLayout } from '@/components'
import { UserManagement } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const UserManagementPage: NextPageWithLayout = () => {
  return <UserManagement />
}

UserManagementPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default UserManagementPage
