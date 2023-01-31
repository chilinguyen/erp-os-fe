import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useGetBreadCrumb = () => {
  const [result, setResult] = useState<React.ReactNode[]>([])

  const router = useRouter()

  const content = router.pathname.substring(1, router.pathname.length).split('/')

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  useEffect(() => {
    const newResult: React.ReactNode[] = []
    content.forEach((item) => {
      if (item === content[content.length - 1]) {
        newResult.push(<div style={{ color: themeValue[darkTheme].colors.blue600 }}>{item}</div>)
      } else {
        newResult.push(<div>{item}</div>)
      }
      if (content.indexOf(item) !== content.length - 1) {
        newResult.push(<div>-</div>)
      }
    })
    setResult(newResult)
  }, [router])

  return (
    <div style={{ display: 'flex', gap: 10, overflow: 'auto' }}>{result.map((item) => item)}</div>
  )
}