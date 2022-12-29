import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { postMethod } from '@/services'
import { Avatar, Dropdown, Navbar } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useCookies } from 'react-cookie'
import { BsFillChatLeftDotsFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { NavBarItems } from './NavBarConstant'
import { RenderItemDesktop } from './RenderItemDesktop'

interface INavBar {
  isOpenSideBar: boolean
  setOpenSideBar: (v: boolean) => void
  useNavbar?: boolean
}

export const NavBar = ({ isOpenSideBar, setOpenSideBar, useNavbar }: INavBar) => {
  const [cookies, , removeCookie] = useCookies([TOKEN_AUTHENTICATION])
  const router = useRouter()

  const translate = useTranslationFunction()

  const logoutResult = useApiCall({
    callApi: () => postMethod(apiRoute.auth.logout, cookies.token),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      removeCookie(TOKEN_AUTHENTICATION)
      router.push('/login')
    },
  })

  const settings = useTranslation('settings')

  const signOut = useTranslation('signOut')

  return (
    <Navbar variant="sticky" maxWidth="fluid" css={{ zIndex: 1000 }}>
      <Navbar.Toggle
        isSelected={isOpenSideBar}
        onPress={() => {
          setOpenSideBar(!isOpenSideBar)
        }}
        showIn="sm"
      />
      <Navbar.Content enableCursorHighlight variant="underline" hideIn="sm">
        {useNavbar ? (
          NavBarItems().map((item) => (
            <Fragment key={item.path}>
              <RenderItemDesktop item={item} />
            </Fragment>
          ))
        ) : (
          <div />
        )}
      </Navbar.Content>
      {/* <Navbar.Collapse showIn="sm">
        {NavBarItems().map((item) => (
          <Fragment key={item.path}>
            <RenderItemMobile level={0} item={item} />
          </Fragment>
        ))}
      </Navbar.Collapse> */}
      <Navbar.Content>
        <div
          onClick={() => {
            router.push('/chat')
          }}
          style={{ cursor: 'pointer' }}
        >
          <BsFillChatLeftDotsFill />
        </div>
        <Dropdown isBordered>
          <Dropdown.Trigger>
            <Navbar.Item>
              <Avatar
                bordered
                as="button"
                color="primary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Navbar.Item>
          </Dropdown.Trigger>
          <Dropdown.Menu variant="light">
            <Dropdown.Item>
              <div onClick={() => router.push('/settings')}>{settings}</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                onClick={() => {
                  logoutResult.setLetCall(true)
                }}
              >
                {signOut}
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    </Navbar>
  )
}
