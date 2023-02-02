import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Search } from '../search'

interface INavbarInternal {
  setOpenSideBar: React.MouseEventHandler<HTMLDivElement>
  pixel: number
}

export const NavbarInternal = ({ setOpenSideBar, pixel }: INavbarInternal) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const router = useRouter()

  return (
    <div
      style={{
        backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
        boxShadow: themeValue[darkTheme].shadows.lg,
        height: '3.75rem',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '10px',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {pixel < 960 && (
          <div onClick={setOpenSideBar} style={{ width: 'fit-content', height: 'fit-content' }}>
            <AiOutlineMenu size={25} />
          </div>
        )}
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (router.pathname !== '/dashboard') {
              router.push('/dashboard')
            }
          }}
        >
          icon
        </div>
      </div>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Search />
      </div>
      <div
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 8,
        }}
      >
        <div
          style={{
            height: '70%',
            aspectRatio: '1/1',
            borderRadius: '100%',
            cursor: 'pointer',
            backgroundColor: themeValue[darkTheme].colors.gray100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            if (router.pathname !== '/settings') {
              router.push('/settings')
            }
          }}
        >
          <div
            style={{
              height: '70%',
              aspectRatio: '1/1',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KDTxwYXRoIGQ9Ik0yMC45IDUwLjlsMzAtMzBjMy41LjggNy4zLS4xIDEwLTIuOGMyLjctMi43IDMuNi02LjUgMi44LTEwTDU1IDE2LjdsLTYuMS0xLjZMNDcuMyA5TDU2IC4zYy0zLjUtLjgtNy4zLjEtMTAgMi44Yy0yLjcgMi43LTMuNiA2LjUtMi44IDEwbC0zMCAzMGMtMy41LS44LTcuMy4xLTEwIDIuOEMtMSA1MC0xIDU2LjggMy4xIDYwLjljNC4xIDQuMSAxMC45IDQuMSAxNSAwYzIuNy0yLjcgMy42LTYuNSAyLjgtMTBtLTguNyA4LjZsLTYuMS0xLjZsLTEuNi02LjFMOSA0Ny4zbDYuMSAxLjZsMS42IDYuMWwtNC41IDQuNSIgZmlsbD0iIzk0OTg5YiI+Cg08L3BhdGg+Cg08cGF0aCBmaWxsPSIjM2U0MzQ3IiBkPSJNMjguOCAyMS45bC01LjYgNS44bC01LjUtNS43bDUuNS01Ljh6Ij4KDTwvcGF0aD4KDTxnIGZpbGw9IiM5NDk4OWIiPgoNPHBhdGggZD0iTTE2LjcgNS4xTDYuOSAxNS4yYy0uNC40LS40IDEgMCAxLjNsMy43IDMuOGwzLjcgMy44Yy40LjQuOS40IDEuMyAwTDI1LjQgMTRjLjQtLjQuNC0xIDAtMS4zTDE4IDUuMWMtLjMtLjQtLjktLjQtMS4zIDAiPgoNPC9wYXRoPgoNPHBhdGggZD0iTS4zIDIyYy0uNC40LS40IDEgMCAxLjNMNy42IDMxYy40LjQuOS40IDEuMyAwYzAgMCAyLTIuMSAyLjEtMi4ybC04LjYtOC45QzIuMyAxOS45LjMgMjIgLjMgMjIiPgoNPC9wYXRoPgoNPC9nPgoNPGcgZmlsbD0iIzNlNDM0NyI+Cg08cGF0aCBkPSJNMTAuNSAyMC40bC0zLjctMy44czEuMiAyLjEtMiAyLjVjLTEuMy4yLTIuMS40LTIuNS44bDguNiA4LjljLjQtLjUuNi0xLjMuOC0yLjZjLjQtMy4zIDIuNC0yIDIuNC0ybC0zLjYtMy44Ij4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik0zOS42IDQuM0MyOS41LTYgMTguNCA1LjUgMTguNCA1LjVsNi41IDYuN3M2LjMtOC41IDE0LjItNi4xYy45LjMgMS43LjcgMiAuNWMuNC0uMy0uOC0xLjYtMS41LTIuMyI+Cg08L3BhdGg+Cg08L2c+Cg08cGF0aCBkPSJNMjYgMjQuOGwtMy42IDMuN3MxLjkgMyA1LjEgNi4zYzMuNSAzLjYgOC4yIDUuNyAxMi45IDEwLjVjNyA3LjIgMTIuOCAxNSAxNC45IDE3LjljLjggMS4xLjkgMSAxLjkgMGwzLTMuMUwyNiAyNC44IiBmaWxsPSIjZjJiMjAwIj4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik0yNiAyNC44bDMuNi0zLjdzMi45IDEuOSA2LjEgNS4yYzMuNSAzLjYgNS41IDguNSAxMC4yIDEzLjNjNyA3LjIgMTQuNSAxMy4yIDE3LjQgMTUuNGMxLjEuOCAxIDEgMCAybC0zIDMuMUwyNiAyNC44IiBmaWxsPSIjZmZjZTMxIj4KDTwvcGF0aD4KDTwvc3ZnPg=="
              layout="fill"
            />
          </div>
        </div>
        <div
          style={{
            height: '70%',
            aspectRatio: '1/1',
            position: 'relative',
            borderRadius: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src="https://thumbs.dreamstime.com/z/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
            layout="fill"
          />
        </div>
      </div>
    </div>
  )
}
