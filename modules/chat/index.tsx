import { ShareStoreSelector } from '@/redux/share-store'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ChatContent, ChatUserList } from './inventory'

export default function ChatRoom() {
  const { breakPoint } = useSelector(ShareStoreSelector)

  const [userChoose, setUserChoose] = useState({ id: '', name: '', avt: '' })

  return (
    <div
      style={{
        padding: breakPoint !== 1 ? 40 : 10,
        height: '92vh',
        display: 'flex',
      }}
    >
      {breakPoint !== 1 || !userChoose.id ? (
        <ChatUserList userChooseId={userChoose?.id} setUserChoose={setUserChoose} />
      ) : null}
      {breakPoint !== 1 || userChoose.id ? (
        <ChatContent user={userChoose} setUserChoose={setUserChoose} />
      ) : null}
    </div>
  )
}
