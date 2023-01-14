import { Loading } from '../loading'
import { Modal } from '../modal'

interface BackDropLoadingProp {
  isOpen: boolean
}

export const BackDropLoading = ({ isOpen }: BackDropLoadingProp) => {
  return (
    <Modal open={isOpen} preventClose>
      <Loading size={100} />
    </Modal>
  )
}
