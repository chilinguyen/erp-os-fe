import { CustomTable } from '@/components/table'
import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { getListUser } from '@/services'
import { UserListSuccess, UserResponseSuccess } from '@/types'
import { Button, Container, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { header, listActions } from './management.inventory'

export const UserManagement = () => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])

  const router = useRouter()

  const result = useApiCall<UserListSuccess, String>({
    callApi: () =>
      getListUser(
        generateToken({
          userId: cookies.userId,
          deviceId: cookies.deviceId,
        })
      ),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
  })

  const { data, loading, setLetCall } = result

  useEffect(() => {
    setLetCall(true)
  }, [])

  return (
    <>
      {loading ? (
        <Container css={{ textAlign: 'center', marginTop: 20 }} justify="center">
          <Loading />
        </Container>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text h1>Create User</Text>
            <Button
              onClick={() => {
                router.push('/user/create')
              }}
            >
              Save
            </Button>
          </div>
          <CustomTable<UserResponseSuccess>
            header={header}
            body={data ? data.result.data : []}
            listActions={listActions}
            selectionMode="single"
          >
            <>{null}</>
          </CustomTable>
        </>
      )}
    </>
  )
}
