import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {ModalPropsType} from './modal.d';
import {MouseEvent} from 'react';
import {CloseIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';

const APP_BODY = document.getElementById('root');

function Modal(props: ModalPropsType) {
  const {header, onCloseClick, children} = props;
  React.useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "Escape")) {
        onCloseClick();
      }
    }
    document.addEventListener('keydown', handleEscKeyDown)
    return () => document.removeEventListener('keydown', handleEscKeyDown)
  }, [onCloseClick])

  if (APP_BODY===null) {
    return null;
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>): void => event.stopPropagation();


  return ReactDOM.createPortal(
    <ModalOverlay onCloseClick={onCloseClick}>
      <div className={modalStyles.modal} onClick={handleModalClick}>
        <div className={`${modalStyles.header} mt-10 mr-10 ml-10`}>
          <h1 className={'text text_type_main-large'}>{header}</h1>
          <Button type="secondary" size="small" onClick={onCloseClick}><CloseIcon type="primary"/></Button>
        </div>
        {children}
      </div>
    </ModalOverlay>
, APP_BODY
  )
}

export default Modal;
