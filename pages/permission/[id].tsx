import { DefaultLayout } from '@/components'
import { PermissionDetail } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const PermissionPage: NextPageWithLayout = () => {
  return <PermissionDetail />
}

PermissionPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default PermissionPage
