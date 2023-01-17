import { DefaultLayout } from '@/components'
import { PathsManagement } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const PathsPage: NextPageWithLayout = () => {
  return <PathsManagement />
}

PathsPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default PathsPage
