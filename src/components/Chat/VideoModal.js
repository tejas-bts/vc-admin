import { FiXCircle } from "react-icons/fi"

const VideoModal = ({show, onClose}) => {
  return (
    <div className={`video-modal-container${show ? ' is-active' : ''}`}>
      <div className={`video-modal-body`}>
      <button className="close" onClick={onClose ? onClose : null}><FiXCircle /></button>
        Hi there
      </div>
    </div>
  )
}

export default VideoModal
