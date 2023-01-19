import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { setIsLoggedIn } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { postMethod } from '@/services'
import Image from 'next/image'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const SignOutButton = (props: { isLabel: boolean }) => {
  const { isLabel } = props
  const [hover, setHover] = useState(false)
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [cookies, , removeCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const translate = useTranslationFunction()

  const dispatch = useDispatch()

  const signOutAction = useApiCall<string, string>({
    callApi: () => postMethod({ pathName: apiRoute.auth.logout, token: cookies.token }),
    handleSuccess(message) {
      toast.success(message)
      removeCookie(TOKEN_AUTHENTICATION)
      dispatch(setIsLoggedIn(false))
    },
    handleError(status, message) {
      if (status) toast.error(translate(message))
    },
  })

  return (
    <div
      style={{
        width: isLabel ? '100%' : '60px',
        height: '60px',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isLabel ? 'left' : 'center',
        gap: isLabel ? 20 : 0,
        padding: isLabel ? '0px 20px' : '',
        cursor: 'pointer',
        position: 'relative',
        borderBottom: isLabel ? `1px solid ${themeValue[darkTheme].colors.border}` : '',
        boxShadow: hover ? themeValue[darkTheme].shadows.md : undefined,
        border: hover
          ? `1px solid ${themeValue[darkTheme].colors.border}`
          : `1px solid ${themeValue[darkTheme].colors.backgroundContrast}`,
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {
        signOutAction.setLetCall(true)
      }}
    >
      <div
        style={{
          height: '70%',
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Image
          layout="fill"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0Y0QTAyNjsiIHBvaW50cz0iNDkxLjE3NiwyNTYgMzIzLjcyMywxMjguNjUyIDMzNi44NTEsMjE3LjkyOCAxNDAuMjkxLDIxNy45MjggMTQwLjI5MSwyOTYuNjk3IA0KCTMzNi44NTEsMjk2LjY5NyAzMjMuNzIzLDM4My4zNDggIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNjFBQ0QyOyIgZD0iTTM5MS4wMzksNjUuNjQxSDczLjMzN3YzODAuNzE4aDMxNy43MDN2NTIuNTEzSDQ2LjcxOGMtMTQuNTAxLDAtMjUuODk0LTExLjc1NS0yNS44OTQtMjYuMjU2VjM5LjM4NQ0KCWMwLTE0LjUwMSwxMS4zOTMtMjYuMjU2LDI1Ljg5NC0yNi4yNTZoMzQ0LjMyMVY2NS42NDF6Ii8+DQo8cGF0aCBkPSJNNDk5LjEyNCwyNDUuNTUxTDMzMS42NzEsMTE4LjIwMmMtNC4yNDgtMy4yMzEtMTAuMDI3LTMuNTY4LTE0LjYyMi0wLjg1NnMtNy4wOTEsNy45MzYtNi4zMTUsMTMuMjE1bDEwLjkxNyw3NC4yMzlIMTM5LjkyOA0KCWMtNy4yNDksMC0xMi43NjYsNS44NzgtMTIuNzY2LDEzLjEyOHY3OC43NjljMCw3LjI1MSw1LjUxNiwxMy4xMjgsMTIuNzY2LDEzLjEyOGgxODEuNjU2bC0xMC44NDEsNzEuNTU1DQoJYy0wLjgwMSw1LjI4NSwxLjY4MywxMC41Myw2LjI4MSwxMy4yNTdjMi4wNzMsMS4yMyw0LjM4OSwxLjgzOCw2LjY5OCwxLjgzOGMyLjgxMiwwLDUuNjExLTAuOTAyLDcuOTQ5LTIuNjc5bDE2Ny40NTMtMTI3LjM0OA0KCWMzLjI2NC0yLjQ4Myw1LjE4LTYuMzQ4LDUuMTgtMTAuNDQ5QzUwNC4zMDQsMjUxLjg5OSw1MDIuMzg4LDI0OC4wMzQsNDk5LjEyNCwyNDUuNTUxeiBNMzQxLjU1NSwzNTMuMjkzbDguMjc2LTU0LjYyOQ0KCWMwLjU3NC0zLjc4Mi0wLjUzMi03LjYyNi0zLjAyNi0xMC41MjZjLTIuNDkzLTIuOS02LjEyOC00LjU2OS05Ljk1NC00LjU2OUgxNTMuNDE5di01Mi41MTNoMTgzLjQzMw0KCWMzLjgxNSwwLDcuNDQxLTEuNjU5LDkuOTM1LTQuNTQ2YzIuNDkzLTIuODg3LDMuNjA4LTYuNzE2LDMuMDUyLTEwLjQ5MmwtOC40NDctNTcuNDM1TDQ2OS40ODgsMjU2TDM0MS41NTUsMzUzLjI5M3oiLz4NCjxwYXRoIGQ9Ik0zOTAuNjc3LDQzMy4yMzFIODYuNDY1Vjc4Ljc2OWgzMDQuMjEyYzcuMjQ5LDAsMTMuNDkxLTUuODc4LDEzLjQ5MS0xMy4xMjhWMTMuMTI4YzAtNy4yNTEtNi4yNC0xMy4xMjgtMTMuNDkxLTEzLjEyOA0KCUg0Ni43MThDMjUuMDAxLDAsNy42OTYsMTcuNjY4LDcuNjk2LDM5LjM4NXY0MzMuMjMxQzcuNjk2LDQ5NC4zMzIsMjUuMDAxLDUxMiw0Ni43MTgsNTEyaDM0My45NTkNCgljNy4yNDksMCwxMy40OTEtNS44NzcsMTMuNDkxLTEzLjEyOHYtNTIuNTEzQzQwNC4xNjgsNDM5LjEwOCwzOTcuOTI4LDQzMy4yMzEsMzkwLjY3Nyw0MzMuMjMxeiBNMzc3LjkxMSw0ODUuNzQ0SDQ2LjcxOA0KCWMtNy4yMzksMC0xMi43NjYtNS44ODktMTIuNzY2LTEzLjEyOFYzOS4zODVjMC03LjIzOSw1LjUyNy0xMy4xMjgsMTIuNzY2LTEzLjEyOGgzMzEuMTkzdjI2LjI1Nkg3Mi45NzQNCgljLTcuMjQ5LDAtMTIuNzY2LDUuODc3LTEyLjc2NiwxMy4xMjh2MzgwLjcxOGMwLDcuMjUxLDUuNTE2LDEzLjEyOCwxMi43NjYsMTMuMTI4aDMwNC45MzdWNDg1Ljc0NHoiLz4NCjwvc3ZnPg=="
        />
      </div>
      {isLabel && <div>{translate('signOut')}</div>}
    </div>
  )
}
