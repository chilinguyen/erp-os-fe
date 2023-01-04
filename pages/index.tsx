import { DefaultLayout } from '@/components'
import { HomeModule } from '@/modules'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  return (
    <DefaultLayout useNavbar>
      <HomeModule />
    </DefaultLayout>
  )
}

export default Dashboard
