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
          height: '50%',
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
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PgoNPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxMTcgMTE3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgoNPHRpdGxlLz4KDTxkZXNjLz4KDTxkZWZzLz4KDTxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgoNPGcgZmlsbC1ydWxlPSJub256ZXJvIiBpZD0iZXhpdCI+Cg08cGF0aCBkPSJNODIuNiw4OC40IEM4My40LDg5LjIgODQuNCw4OS42IDg1LjUsODkuNiBDODYuNiw4OS42IDg3LjYsODkuMiA4OC40LDg4LjQgTDExNS40LDYxLjQgQzExNS42LDYxLjIgMTE1LjgsNjEgMTE1LjksNjAuOCBDMTE1LjksNjAuOCAxMTYsNjAuNyAxMTYsNjAuNiBDMTE2LjEsNjAuNCAxMTYuMiw2MC4yIDExNi4zLDYwLjEgQzExNi4zLDYwIDExNi4zLDU5LjkgMTE2LjQsNTkuOSBDMTE2LjUsNTkuNyAxMTYuNSw1OS42IDExNi42LDU5LjQgQzExNi43LDU5LjEgMTE2LjcsNTguOSAxMTYuNyw1OC42IEMxMTYuNyw1OC4zIDExNi43LDU4LjEgMTE2LjYsNTcuOCBDMTE2LjYsNTcuNiAxMTYuNSw1Ny40IDExNi40LDU3LjMgQzExNi40LDU3LjIgMTE2LjQsNTcuMSAxMTYuMyw1Ny4xIEMxMTYuMiw1Ni45IDExNi4xLDU2LjcgMTE2LDU2LjUgQzExNiw1Ni41IDExNiw1Ni40IDExNS45LDU2LjQgQzExNS44LDU2LjIgMTE1LjYsNTYgMTE1LjQsNTUuOCBMODguNCwyOC44IEM4Ni44LDI3LjIgODQuMiwyNy4yIDgyLjYsMjguOCBDODEsMzAuNCA4MSwzMyA4Mi42LDM0LjYgTDEwMi42LDU0LjYgTDMxLjUsNTQuNiBDMjkuMiw1NC42IDI3LjQsNTYuNCAyNy40LDU4LjcgQzI3LjQsNjEgMjkuMiw2Mi44IDMxLjUsNjIuOCBMMTAyLjYsNjIuOCBMODIuNiw4Mi44IEM4MSw4NC4yIDgxLDg2LjggODIuNiw4OC40IFoiIGZpbGw9IiMxN0FCMTMiIGlkPSJTaGFwZSIvPgoNPHBhdGggZD0iTTQuNSwxMTYuNSBMNTguNSwxMTYuNSBDNjAuOCwxMTYuNSA2Mi42LDExNC43IDYyLjYsMTEyLjQgTDYyLjYsNzIuMSBDNjIuNiw2OS44IDYwLjgsNjggNTguNSw2OCBDNTYuMiw2OCA1NC40LDY5LjggNTQuNCw3Mi4xIEw1NC40LDEwOC4zIEw4LjYsMTA4LjMgTDguNiw4LjYgTDU0LjQsOC42IEw1NC40LDQ0LjggQzU0LjQsNDcuMSA1Ni4yLDQ4LjkgNTguNSw0OC45IEM2MC44LDQ4LjkgNjIuNiw0Ny4xIDYyLjYsNDQuOCBMNjIuNiw0LjUgQzYyLjYsMi4yIDYwLjgsMC40IDU4LjUsMC40IEw0LjUsMC40IEMyLjIsMC40IDAuNCwyLjIgMC40LDQuNSBMMC40LDExMi40IEMwLjUsMTE0LjcgMi4zLDExNi41IDQuNSwxMTYuNSBaIiBmaWxsPSIjNEE0QTRBIiBpZD0iU2hhcGUiLz4KDTwvZz4KDTwvZz4KDTwvc3ZnPg=="
        />
      </div>
      {isLabel && <div>{translate('signOut')}</div>}
    </div>
  )
}
