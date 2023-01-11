import { Collapse, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { PermissionRequest, PermissionRequestFailure, ViewPointKey } from '@/types'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStylesPermission } from './permission.inventory'
import { UserTablePermission } from './UserTable'
import { ViewPointPermission } from './ViewPointPermission'

interface IModifierPermission {
  handleChangeState: (newUpdate: Partial<PermissionRequest>) => void
  permissionState: PermissionRequest
  editAble?: Partial<Record<keyof PermissionRequest, boolean>>
  errorState?: Partial<PermissionRequestFailure>
}

export const ModifierPermission = ({
  errorState,
  handleChangeState,
  permissionState,
  editAble,
}: IModifierPermission) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const setListUser = (listUser: string[]) => {
    handleChangeState({ userId: listUser })
  }
  const setViewPoints = (listView: ViewPointKey) => {
    handleChangeState({ viewPoints: { ...permissionState.viewPoints, ...listView } })
  }

  const setEditAble = (listView: ViewPointKey) => {
    handleChangeState({ editable: { ...permissionState.editable, ...listView } })
  }

  const permissionName = useTranslation('permissionName')

  const selectUser = useTranslation('selectUser')

  const selectViewPoint = useTranslation('selectViewPoint')

  const selectEditable = useTranslation('selectEditable')

  const viewPointsResult = useApiCall<ViewPointKey, String>({
    callApi: () => getMethod(apiRoute.permissions.getViewPointsSelect, cookies.token),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const editAblesResult = useApiCall<ViewPointKey, String>({
    callApi: () => getMethod(apiRoute.permissions.getEditableSelect, cookies.token),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  useEffect(() => {
    viewPointsResult.setLetCall(true)
    editAblesResult.setLetCall(true)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${breakPoint > 1 ? 2 : 1}, minmax(0, 1fr))`,
          gap: 40,
        }}
      >
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            style={{ width: '100%' }}
            value={permissionState.name}
            label={permissionName}
            readOnly={!editAble?.name}
            onChange={(event) => {
              handleChangeState({
                name: event.currentTarget.value,
              })
            }}
            {...inputStylesPermission({ error: errorState?.name && translate(errorState.name) })}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
        <div>
          <Collapse title={selectUser}>
            <UserTablePermission
              editAble={editAble?.userId}
              listUser={permissionState?.userId ?? []}
              setListUser={setListUser}
            />
          </Collapse>

          <Collapse title={selectViewPoint}>
            {viewPointsResult.loading ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: 20,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Loading />
              </div>
            ) : (
              Object.keys(viewPointsResult?.data?.result ?? []).map((viewPoint) => (
                <Collapse key={viewPoint} title={viewPoint}>
                  <ViewPointPermission
                    listViewPoint={viewPointsResult.data?.result?.[viewPoint] ?? []}
                    listViewChecked={permissionState.viewPoints?.[viewPoint] ?? []}
                    setListViewPoint={setViewPoints}
                    editAble={editAble?.viewPoints}
                    keyObj={viewPoint}
                  />
                </Collapse>
              ))
            )}
          </Collapse>

          <Collapse title={selectEditable}>
            {editAblesResult.loading ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: 20,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Loading />
              </div>
            ) : (
              Object.keys(editAblesResult?.data?.result ?? []).map((viewPoint) => (
                <Collapse key={viewPoint} title={viewPoint}>
                  <ViewPointPermission
                    listViewPoint={editAblesResult.data?.result?.[viewPoint] ?? []}
                    listViewChecked={permissionState.editable?.[viewPoint] ?? []}
                    setListViewPoint={setEditAble}
                    editAble={editAble?.editable}
                    keyObj={viewPoint}
                  />
                </Collapse>
              ))
            )}
          </Collapse>
        </div>
      </div>
    </div>
  )
}
