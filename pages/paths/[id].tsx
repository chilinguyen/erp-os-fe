import { DefaultLayout } from '@/components'
import { PathDetail } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const PathDetailPage: NextPageWithLayout = () => {
  return <PathDetail />
}

PathDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default PathDetailPage
