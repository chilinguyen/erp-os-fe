import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useEventSource, useResponsive, useScroll, useTranslation } from '@/hooks'
import { generateToken } from '@/lib'
import { getMethod, postMethod } from '@/services'
import { CommonListResultType, MessageResponse } from '@/types'
import { Button, Input, Loading, useTheme } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { MdSend } from 'react-icons/md'

interface IChatContent {
  user: { id: string; name: string; avt: string }
  setUserChoose: Function
}

export const ChatContent = ({ setUserChoose, user }: IChatContent) => {
  const breakPoint = useResponsive()

  const [messages, setMessages] = useState<MessageResponse[]>([])

  const [message, setMessage] = useState<string>('')

  const [cookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const { theme } = useTheme()

  const writeMessage = useTranslation('writeMessage')

  const getOldMessages = useApiCall<CommonListResultType<MessageResponse>, string>({
    callApi: () =>
      getMethod(apiRoute.message.getOldMessage, cookie.token, { page: '1', id: user.id }),
  })

  useEffect(() => {
    if (getOldMessages.data) setMessages(getOldMessages.data.result.data)
  }, [getOldMessages.data])

  const sendMessages = useApiCall<MessageResponse, string>({
    callApi: () =>
      postMethod(apiRoute.message.sendMessage, cookie.token, { message }, { id: user.id }),
    handleSuccess(message, data) {
      const newMessages = messages.filter((item) => item.id !== '')
      newMessages.push(data)
      setMessages(newMessages)
      setMessage('')
    },
  })

  const getLastMessage = useEventSource<MessageResponse>({
    eventUrl: apiRoute.message.getLastMessage,
    eventName: 'get-last-message',
    token: generateToken(cookie.token),
  })

  useEffect(() => {
    if (getLastMessage.evtData) {
      const checkMessages = messages.find((item) => item.id === getLastMessage.evtData?.id)
      if (!checkMessages) {
        const newMessages = messages.filter((item) => item.id !== '')
        newMessages.push(getLastMessage.evtData)
        setMessages(newMessages)
      }
    }
  }, [getLastMessage.evtData])

  const rightMessages = (input: MessageResponse) => {
    if (input.receiveId === user.id && input.sendId === cookie.userId) return true
    if (input.sendId === user.id && input.receiveId === cookie.userId) return true
    return false
  }

  useEffect(() => {
    if (user.id) getOldMessages.setLetCall(true)
  }, [user])

  const refChat = useScroll(messages)

  if (!user.id) return null

  const getContent = () => {
    if (getOldMessages.loading)
      return (
        <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      )
    return messages.length > 0 && messages[0].id !== '' ? (
      messages
        .filter((item) => rightMessages(item))
        .sort((a, b) => {
          const dateA = new Date(a.created).getTime()
          const dateB = new Date(b.created).getTime()
          return dateA - dateB
        })
        .map((chat, index) => {
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: chat.sendId === cookie.userId ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  maxWidth: 'max-content',
                  marginLeft: 20,
                  padding: '10px 20px',
                  borderRadius: 20,
                  backgroundColor:
                    chat.sendId !== cookie.userId
                      ? theme?.colors.accents5.value
                      : theme?.colors.blue500.value,
                  fontSize: 20,
                }}
              >
                {chat.context}
              </div>
            </div>
          )
        })
    ) : (
      <div style={{ width: '100%', textAlign: 'center' }}>No message</div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          borderBottom: '1px solid',
          borderColor: theme?.colors.accents1.value,
          paddingLeft: 20,
          height: breakPoint === 1 ? 60 : 150,
        }}
      >
        <AiOutlineArrowLeft
          onClick={() => {
            setUserChoose({ id: '', name: '', avt: '' })
          }}
          style={{ fontSize: 30, color: theme?.colors.blue500.value, fontWeight: 700 }}
        />
        <div style={{ fontSize: 30 }}>{user.name}</div>
      </div>
      <div
        ref={refChat}
        className="hide-scrollbar"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          height: ` calc(100% - ${breakPoint === 1 ? 60 + 80 : 150 + 80}px)`,
          overflow: 'auto',
        }}
      >
        {getContent()}
      </div>
      <Input
        css={{ fontSize: 20, width: '100%', padding: 5, height: '80px' }}
        placeholder={writeMessage}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        contentRight={
          <Button
            auto
            style={{ padding: 10 }}
            icon={<MdSend size={24} />}
            onClick={() => {
              if (message) {
                sendMessages.setLetCall(true)
              }
            }}
            disabled={!message}
          />
        }
      />
    </div>
  )
}
