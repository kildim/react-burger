import modalOverlayStyles from './modal-overlay.module.css';
import {ModalOverlayProps} from './modal-overlay.d'

function ModalOverlay(props: ModalOverlayProps) {
  const {onCloseClick, children} = props;
  return (
    <div className={modalOverlayStyles.modal_overlay}  onClick={onCloseClick}>
      {children}
    </div>
    )
}

export default ModalOverlay;
