//@ts-nocheck
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../modal/modal';
import {useHistory} from 'react-router-dom';
import {hideResetPasswordNotification} from '../../services/actions/action';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';


function ResetPasswordNotification() {
  const dispatch = useDispatch();
  const {showPasswordResetNotification} = useSelector((state) => ({showPasswordResetNotification: state.showPasswordResetNotification}))
  const {status, notification} = useSelector((state) => {
    return {
      status: {...state.passwordResetStatus}?.success,
      notification: state.passwordResetStatus?.success ? 'Пароль сброшен успешно!' : 'Сервер не подтвердил сброс пароля!'
    }
  });

  const history = useHistory();

  const handleClosePopup = () => {
    dispatch(hideResetPasswordNotification());
    if (status) {
      history.push('/login')
    }
  }

  return showPasswordResetNotification &&
    <Modal header={notification} onClosePopup={handleClosePopup}>
      <div className={'mb-10 mt-10'}>
        <Button type="primary" size="medium" onClick={handleClosePopup}>
          Ok
        </Button>
      </div>
    </Modal>
}

export default ResetPasswordNotification;
