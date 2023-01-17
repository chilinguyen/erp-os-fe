import { DefaultLayout } from '@/components'
import { UserCreate } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const UserCreatePage: NextPageWithLayout = () => {
  return <UserCreate />
}

UserCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default UserCreatePage
