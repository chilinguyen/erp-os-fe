import { DefaultLayout } from '@/components'
import { LanguageManagement } from '@/modules/language'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const LanguageManagementPage: NextPageWithLayout = () => {
  return <LanguageManagement />
}

LanguageManagementPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default LanguageManagementPage
