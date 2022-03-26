import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {ModalPropsType} from './modal.d';
import {MouseEvent, useEffect} from 'react';
import {CloseIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'

const APP_BODY = document.getElementById('root');

function Modal(props: ModalPropsType) {
  const {header, show, onCloseClick, children} = props;
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown)
    return () => document.removeEventListener('keydown', handleEscKeyDown)
  }, [])

  if (!show || APP_BODY===null) {
    return null;
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>): void => event.stopPropagation();
  const handleEscKeyDown = (event: KeyboardEvent) => {
    if ((event.key === "Escape")) {
      onCloseClick();
    }
  }

  return ReactDOM.createPortal(
    <div className={modalStyles.modal_overlay}  onClick={onCloseClick}>
      <div className={modalStyles.modal} onClick={handleModalClick}>
        <div className={`${modalStyles.header} mt-10 mr-10 ml-10`}>
          <h1 className={'text text_type_main-large'}>{header}</h1>
          <Button type="secondary" size="small" onClick={onCloseClick}><CloseIcon type="primary"/></Button>
        </div>
        {children}
      </div>
    </div>
, APP_BODY
  )
}

export default Modal;
