import { BounceLoader } from 'react-spinners'
import styling from './modal.module.css'
const Modal = () => {
  return (
    <div className={styling.modal}>
        <BounceLoader color="#00BFFF"
        loading={true}
        size={100} />    
      
    </div>
  )
}
//Export
export default Modal
