import { AiFillCaretDown } from 'react-icons/ai'
import { TbTable } from 'react-icons/tb'
import { CiViewBoard } from 'react-icons/ci'
import { CSSProperties, ReactNode, useState } from 'react'

export interface RapidTabProps {
  tabData: string[]
  tabItem: ReactNode
  tabContainerStyle?: CSSProperties
  tabStyle?: CSSProperties
  tabItemStyle?: CSSProperties
  onHandleChangeTab?: Function
  onHandleToggleView?: Function
}

export default function RapidTab(props: RapidTabProps) {
  const {
    tabData,
    tabItem,
    tabStyle,
    tabContainerStyle,
    tabItemStyle,
    onHandleChangeTab,
    onHandleToggleView,
  } = props
  const [tab, setTab] = useState(tabData[0])
  const [openModal, setOpenModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  if (!onHandleChangeTab) return null
  const handleSetTab = (item: string) => {
    onHandleChangeTab(item)
    setTab(item)
  }
  const handleChangeTab = () => {
    setOpenModal(!openModal)
  }
  const handleBlurModal = () => {
    setOpenModal(false)
  }
  const handleToggleView = (view: string) => {
    if (onHandleToggleView) {
      onHandleToggleView(view)
      handleBlurModal()
    }
  }
  const handleChangeCurrentTab = (tab: string, index: number) => {
    handleSetTab(tab)
    setCurrentIndex(index)
  }
  return (
    <div>
      <div style={{ ...tabContainerStyle }}>
        <div
          onClick={handleBlurModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: openModal ? '100vw' : 0,
            zIndex: 9,
          }}
        />

        {tabData.map((item: string, index: number) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                key={index}
                style={{
                  borderTop: `${tab === item ? '1px solid rgb(48,54,61)' : 'none'}`,
                  borderLeft: `${tab === item ? '1px solid rgb(48,54,61)' : 'none'}`,
                  borderRight: `${tab === item ? '1px solid rgb(48,54,61)' : 'none'}`,
                  borderTopRightRadius: `${tab === item ? '6px' : 'none'}`,
                  borderTopLeftRadius: `${tab === item ? '6px' : 'none'}`,
                  backgroundColor: `${tab === item ? 'rgb(13, 17, 23)' : 'black'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  position: 'relative',
                  marginBottom: -1,
                  ...tabStyle,
                }}
                onClick={() => handleChangeCurrentTab(item, index)}
              >
                <div>{item}</div>
                {tab === item && (
                  <div onBlur={handleBlurModal}>
                    <AiFillCaretDown onClick={handleChangeTab} />
                  </div>
                )}
                {openModal && tab === item && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 30,
                      right: '-300%',
                      zIndex: 10,
                      border: '1px solid rgb(48,54,61)',
                      borderRadius: 6,
                      padding: 20,
                      background: 'rgb(15,18,22)',
                      width: 320,
                    }}
                  >
                    <div>Layout</div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 20,
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: 100,
                          border: '1px solid rgb(48,54,61)',
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '10px 20px 10px 20px',
                        }}
                        onClick={() => handleToggleView('TABLE')}
                      >
                        <TbTable style={{ width: 32, height: 32 }} />
                        <div>Table</div>
                      </div>
                      <div
                        style={{
                          width: 100,
                          border: '1px solid rgb(48,54,61)',
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '10px 20px 10px 20px',
                        }}
                        onClick={() => handleToggleView('BOARD')}
                      >
                        <CiViewBoard style={{ width: 32, height: 32 }} />
                        <div>Board</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {tab !== item && index !== currentIndex - 1 && (
                <hr style={{ border: '1px solid rgb(48,54,61)', height: 20 }} />
              )}
            </div>
          )
        })}
      </div>
      <div style={{ ...tabItemStyle }}>{tabItem}</div>
    </div>
  )
}
