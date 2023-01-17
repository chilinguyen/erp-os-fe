import { DefaultLayout } from '@/components'
import { Settings } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const SettingsPage: NextPageWithLayout = () => {
  return <Settings />
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default SettingsPage
