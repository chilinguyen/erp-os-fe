import { DefaultLayout } from '@/components'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const DashboardPage: NextPageWithLayout = () => {
  return <>dashboard</>
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default DashboardPage
