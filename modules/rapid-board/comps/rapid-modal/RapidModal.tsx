import { Button, Input } from '@/components'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import {
  AiOutlineClose,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { BiBold, BiHeading, BiItalic } from 'react-icons/bi'
import { BsArchive, BsEmojiSmile, BsImage } from 'react-icons/bs'
import { FiEye } from 'react-icons/fi'
import { MdDeleteOutline, MdOpenInNew } from 'react-icons/md'
import { RiFileCopyLine } from 'react-icons/ri'
import { VscIssueReopened } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { RapidDefaultModal } from './components/rapid-defaul-modal/RapidDefaultModal'

export interface RapidModalProps {
  openModal: boolean
  setOpenModal: (v: boolean) => void
}

export default function RapidModal({ openModal, setOpenModal }: RapidModalProps) {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  return (
    <div>
      <RapidDefaultModal
        open={openModal}
        setOpen={setOpenModal}
        ModalStyle={{ height: '100%' }}
        width="100%"
      >
        <div
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: themeValue[darkTheme].colors.backgroundSelectedTab,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: themeValue[darkTheme].colors.gray500,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <div>Implement documentation</div>
              <AiOutlineClose onClick={() => setOpenModal(false)} style={{ cursor: 'pointer' }} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: themeValue[darkTheme].colors.foreground,
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: 24,
              }}
            >
              <div>Implement documentation</div>
              <Button
                style={{
                  border: `1px solid ${themeValue[darkTheme].colors.border}`,
                  backgroundColor: themeValue[darkTheme].colors.backgroundReopen,
                  color: themeValue[darkTheme].colors.foreground,
                }}
              >
                Edit
              </Button>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              AdenTroy
              <p style={{ color: themeValue[darkTheme].colors.gray500 }}>opened 19 days ago</p>
            </div>
          </div>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '70%' }}>
              <div
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingBottom: 20,
                  borderRight: `1px solid ${themeValue[darkTheme].colors.border}`,
                  borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'rgb(201, 209, 217)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    AdenTroy
                    <p style={{ color: themeValue[darkTheme].colors.gray500 }}>19 days ago</p>
                  </div>
                  <div>Edit</div>
                </div>
                <div style={{ color: themeValue[darkTheme].colors.gray500, fontStyle: 'italic' }}>
                  No description provided
                </div>
                <div style={{ marginTop: 20 }}>
                  <BsEmojiSmile />
                </div>
              </div>
              <div
                style={{
                  backgroundColor: themeValue[darkTheme].colors.backgroundModal,
                  borderRight: `1px solid ${themeValue[darkTheme].colors.border}`,
                  padding: '30px 20px 30px 20px',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    border: `1px solid ${themeValue[darkTheme].colors.border}`,
                    borderRadius: '6px',
                    backgroundColor: themeValue[darkTheme].colors.backgroundSelectedTab,
                    padding: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <FiEye />
                      <div
                        style={{
                          width: '40%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <BiHeading />
                        </div>
                        <div>
                          <BiBold />
                        </div>
                        <div>
                          <BiItalic />
                        </div>
                        <div>
                          <AiOutlineUnorderedList />
                        </div>
                        <div>
                          <AiOutlineOrderedList />
                        </div>
                        <div>
                          <AiOutlineLink />
                        </div>
                      </div>
                    </div>
                    <Input
                      value=""
                      label=""
                      placeholder="Leave a comment"
                      style={{ height: '100px' }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <BsImage />
                        <div>Add files</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Button
                          style={{
                            border: `1px solid ${themeValue[darkTheme].colors.border}`,
                            backgroundColor: themeValue[darkTheme].colors.backgroundReopen,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <VscIssueReopened style={{ color: 'rgba(35, 134, 54, 0.6)' }} />
                          <div style={{ color: themeValue[darkTheme].colors.foreground }}>
                            Reopen
                          </div>
                        </Button>
                        <Button
                          style={{
                            border: `1px solid ${themeValue[darkTheme].colors.border}`,
                            backgroundColor: 'rgba(35, 134, 54, 0.6)',
                          }}
                        >
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '30%',
              }}
            >
              <div
                style={{
                  color: 'rgb(139, 148, 158)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  padding: 20,
                  borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  <div>Assignees</div>
                  <div>Erik</div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  <div>Labels</div>
                  <div>Add labels...</div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  <div>Milestones</div>
                  <div>Add milestone...</div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  <div>status</div>
                  <div>Done</div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  <div>Descripton</div>
                  <div>Enter text...</div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  <div>Due date</div>
                  <div>Dec 28, 2022</div>
                </div>
              </div>
              <div
                style={{
                  color: 'rgb(139, 148, 158)',
                  paddingTop: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  padding: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <MdOpenInNew />
                  <div>Open in new tab</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <RiFileCopyLine />
                  <div>Copy link</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <BsArchive />
                  <div>Archive</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    color: 'rgb(248, 81, 73)',
                  }}
                >
                  <MdDeleteOutline />
                  <div>Delete from project</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RapidDefaultModal>
    </div>
  )
}
