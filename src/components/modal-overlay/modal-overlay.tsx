import modalOverlayStyles from './modal-overlay.module.css';
import {ReactNode} from 'react';

type ModalOverlayProps = {
  onCloseClick: () => void,
  children: ReactNode,
}

function ModalOverlay(props: ModalOverlayProps) {
  const {onCloseClick, children} = props;
  return (
    <div className={modalOverlayStyles.modal_overlay}  onClick={onCloseClick}>
      {children}
    </div>
    )
}

export default ModalOverlay;
