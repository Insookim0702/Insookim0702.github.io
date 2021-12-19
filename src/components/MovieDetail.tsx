import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { iMovie } from '../api'

const Overlay = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
`

const Modal = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  width: ${window.innerWidth < 600 ? '100%' : '60%'};
  height: 90%;
  overflow-y: scroll;
`
interface prop {
  pLayoutId: string
}

function MovieDetail (pLayourId: prop) {
  const id = pLayourId.pLayoutId
  const history = useHistory()
  function onClickOverlay () {
    history.push('/')
  }

  return (
    <AnimatePresence>
      <Overlay
        onClick={onClickOverlay}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Modal layoutId={id}></Modal>
      </Overlay>
    </AnimatePresence>
  )
}

export default MovieDetail
