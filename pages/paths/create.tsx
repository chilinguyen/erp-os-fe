import { DefaultLayout } from '@/components'
import { PathCreate } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const PathCreatePage: NextPageWithLayout = () => {
  return <PathCreate />
}

PathCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default PathCreatePage
