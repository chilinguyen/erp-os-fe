import { nextConfig } from '@/lib'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useEventSource = <T,>({
  eventUrl,
  eventName,
  handleConnected,
  handleError,
  token,
}: {
  eventUrl: string
  eventName: string
  token: string
  handleConnected?: () => void
  handleError?: (error: any) => void
}) => {
  const [evtSource, setEvtSource] = useState<EventSource>()
  const [evtData, setEvtData] = useState<T>()

  const serverUrl = nextConfig.apiBaseUrl

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new EventSource(`${serverUrl}/${eventUrl}?token=${token}`, {
        withCredentials: true,
      })
      setEvtSource(url)
    }
  }, [eventUrl])

  useEffect(() => {
    if (evtSource) {
      evtSource.onopen = () => {
        if (handleConnected) {
          handleConnected()
        }
      }

      evtSource.addEventListener(eventName, (event) => {
        const jsonData = JSON.parse(event.data)
        if (JSON.stringify(jsonData) !== JSON.stringify(evtData)) {
          setEvtData(jsonData)
        }
      })

      evtSource.onerror = (error: any) => {
        if (handleError) handleError(error)
        toast.error('Something when wrong')
      }
    }
    return () => {
      evtSource?.close()
    }
  }, [evtSource])

  return { evtData, evtSource }
}
