import { DefaultLayout } from '@/components'
import { UserDetail } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const UserDetailPage: NextPageWithLayout = () => {
  return <UserDetail />
}

UserDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default UserDetailPage
