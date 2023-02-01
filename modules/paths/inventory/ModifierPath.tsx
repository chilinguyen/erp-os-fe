import { Input, SelectCustom, UploadFileBase64 } from '@/components'
import { useTranslation } from '@/hooks'
import { formatSVGBase64 } from '@/lib'
import { UserTablePermission } from '@/modules/permission/inventory'
import { PathRequest, PathRequestFailure, PathResponse, PathTypeEnum } from '@/types'
import Image from 'next/image'
import { inputStylesPath, PathTypeList } from './Iventory'

interface IModifierPath {
  handleChangeState: (newUpdate: Partial<PathResponse>) => void
  pathState: PathResponse
  editAble?: Partial<Record<keyof PathRequest, boolean>>
  errorState?: Partial<PathRequestFailure>
}

export const ModifierPath = ({
  handleChangeState,
  pathState,
  editAble,
  errorState,
}: IModifierPath) => {
  const pathsPascal = useTranslation('path')
  const label = useTranslation('label')
  const type = useTranslation('type')
  const uploadIcon = useTranslation('uploadIcon')

  const setListUser = (listUser: string[]) => {
    handleChangeState({ userId: listUser })
  }

  const setIconPath = (iconPath: string) => {
    handleChangeState({ icon: `${formatSVGBase64}${iconPath}` })
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <UploadFileBase64
          handleUploadFile={setIconPath}
          labelInput={uploadIcon}
          id="uploadIconPath"
          accept=".svg"
          disabled={!editAble?.icon}
        />
        <div style={{ position: 'relative', width: 32, aspectRatio: 1 }}>
          {pathState.icon ? <Image src={pathState.icon} layout="fill" /> : 'No icon'}
        </div>
      </div>
      <Input
        style={{ width: '100%' }}
        value={pathState.path}
        label={pathsPascal}
        onChange={(event) => {
          handleChangeState({ path: event.target.value })
        }}
        {...inputStylesPath({
          error: errorState?.path,
        })}
        readOnly={!editAble?.path}
      />
      <Input
        style={{ width: '100%' }}
        value={pathState.label}
        label={label}
        onChange={(event) => {
          handleChangeState({ label: event.target.value })
        }}
        {...inputStylesPath({
          error: errorState?.label,
        })}
        readOnly={!editAble?.label}
      />
      <SelectCustom<PathTypeEnum>
        value={pathState.type}
        onChange={(value) => {
          handleChangeState({ type: value })
        }}
        label={type}
        options={PathTypeList()}
        buttonProps={{
          ...inputStylesPath({
            error: errorState?.type,
          }),
          width: '100%',
        }}
        disabled={!editAble?.type}
      />
      <UserTablePermission
        listUser={pathState.userId}
        setListUser={setListUser}
        editAble={editAble?.userId}
      />
    </div>
  )
}
