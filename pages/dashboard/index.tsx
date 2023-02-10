import { DefaultLayout } from '@/components'

import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <div>dashboard</div>
      {/* <FloatButton>
        <BiPlusCircle style={{ width: '100%', height: '100%' }} />
      </FloatButton> */}
      {/* <SpeedDial
        options={[
          {
            function: () => {
              console.log('testtesttesttesttesttesttesttesttesttesttest')
            },
            label: 'testtesttesttesttesttesttesttesttesttesttest',
          },
          {
            function: () => {
              console.log('test1')
            },
            label: 'test1',
          },
        ]}
      >
        <BiPlusCircle style={{ width: '100%', height: '100%' }} />
      </SpeedDial> */}
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default DashboardPage
