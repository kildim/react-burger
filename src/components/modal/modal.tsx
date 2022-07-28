import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {MouseEvent} from 'react';
import {CloseIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModalProps = {
  header: string,
  onClosePopup: () => void,
  children: ReactNode,
  drillProp?: Partial<any>,
}

const MODAL_PORTAL = document.getElementById('modals');

function Modal(props: TModalProps):JSX.Element | null {
  const {header, onClosePopup, children, drillProp} = props;
  React.useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "Escape")) {
        onClosePopup();
      }
    }
    document.addEventListener('keydown', handleEscKeyDown)
    return () => document.removeEventListener('keydown', handleEscKeyDown)
  }, [onClosePopup])

  if (MODAL_PORTAL===null) {
    return null;
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>): void => event.stopPropagation();


  return ReactDOM.createPortal(
    <ModalOverlay onCloseClick={onClosePopup}>
      <div className={modalStyles.modal} onClick={handleModalClick}>
        <div className={`${modalStyles.header} mt-10 mr-10 ml-10`}>
          <h1 className={'text text_type_main-large'}>{header}</h1>
          <Button type="secondary" size="small" onClick={onClosePopup}><CloseIcon type="primary"/></Button>
        </div>
        {React.cloneElement(children as React.ReactElement, drillProp)}
      </div>
    </ModalOverlay>
, MODAL_PORTAL
  )
}

export default Modal;
