import { DefaultLayout } from '@/components'
import { PermissionCreate } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const PermissionCreatePage: NextPageWithLayout = () => {
  return <PermissionCreate />
}

PermissionCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default PermissionCreatePage
