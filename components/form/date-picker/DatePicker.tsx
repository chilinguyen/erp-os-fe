import { addClassBody, removeClassBody, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '../input'
import { DayModal, getDayString, MonthModal, YearModal } from './inventory'

interface IDatePicker {
  value?: Date | string
  onChange: Function
  label: string
  buttonProps: HTMLAttributes<HTMLInputElement>
  disable?: boolean
}

export const DatePicker = ({ value, label, onChange, buttonProps, disable }: IDatePicker) => {
  const nowDay = value ? new Date(value) : new Date()
  const [year, setYear] = useState(nowDay.getFullYear())
  const [month, setMonth] = useState(nowDay.getMonth() + 1)
  const [day, setDay] = useState(nowDay.getDate())

  const [type, setType] = useState<'day' | 'month' | 'year' | ''>('')
  const divRef = useRef<HTMLDivElement>(null)

  const [yearRange, setYearRange] = useState(year - (year % 10))

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const refChild = useRef<HTMLDivElement>(null)

  const handleChaneMonth = (newMonth: number) => {
    if (newMonth > 0 && newMonth < 13) {
      setMonth(newMonth)
    }
  }

  useEffect(() => {
    if (year - yearRange > 10) setYearRange(year - (year % 10))
  }, [year])

  useEffect(() => {
    if (!value) {
      onChange(getDayString(day, month, year))
    }
  }, [value])

  const getPositionY = () => {
    if (typeof window !== 'undefined' && divRef.current && refChild.current) {
      const positionParent = divRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const heightParent = divRef.current.getBoundingClientRect().height
      const heightChild = refChild.current.getBoundingClientRect().height
      if (positionParent + heightParent + heightChild < windowHeight) {
        return positionParent + heightParent
      }

      return positionParent - heightChild
    }
    return 0
  }

  const handleSetType = (v: 'day' | 'month' | 'year' | '') => {
    setType(v)
    if (v === '') {
      removeClassBody('overflow')
    } else {
      addClassBody('overflow')
    }
  }

  const obj = {
    year: (
      <YearModal
        year={year}
        yearRange={yearRange}
        setYear={setYear}
        setYearRange={setYearRange}
        setType={handleSetType}
      />
    ),
    month: (
      <MonthModal
        year={year}
        setYear={setYear}
        month={month}
        setMonth={handleChaneMonth}
        setType={handleSetType}
      />
    ),
    day: (
      <DayModal
        year={year}
        setYear={setYear}
        month={month}
        setMonth={handleChaneMonth}
        setType={handleSetType}
        day={day}
        setDay={setDay}
        onChange={onChange}
      />
    ),
    '': null,
  }

  return (
    <>
      {type !== '' && (
        <div
          style={{
            position: 'fixed',
            opacity: 0,
            backgroundColor: 'transparent',
            width: '100vw',
            height: '100vh',
            inset: 0,
            zIndex: 101,
          }}
          onClick={() => {
            handleSetType('')
          }}
        />
      )}
      <div
        onClick={() => {
          if (!disable) {
            handleSetType('day')
          }
        }}
        ref={divRef}
        style={{ width: '100%', position: 'relative', zIndex: 101 }}
      >
        <Input
          value={getDayString(nowDay.getDate(), nowDay.getMonth() + 1, nowDay.getFullYear())}
          label={label}
          readOnly
          {...buttonProps}
        />
        <div
          onClick={(event) => {
            event.stopPropagation()
          }}
          style={{
            position: 'fixed',
            top: getPositionY(),
            left: divRef.current?.getBoundingClientRect()?.left ?? 0,
            width: type !== '' ? 375 : 0,
            backgroundColor: themeValue[darkTheme].colors.gray200,
            boxShadow: type !== '' ? themeValue[darkTheme].shadows.lg : '',
            zIndex: 101,
            borderRadius: 10,
            minHeight: 260,
          }}
          ref={refChild}
        >
          {obj[type]}
        </div>
      </div>
    </>
  )
}
