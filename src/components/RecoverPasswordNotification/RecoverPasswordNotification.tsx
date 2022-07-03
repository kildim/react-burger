//@ts-nocheck
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../modal/modal';
import {useHistory} from 'react-router-dom';
import {hideRecoverPasswordNotification} from '../../services/actions/auth-action';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';


function RecoverPasswordNotification() {
  const dispatch = useDispatch();
  const {showPasswordRecoverNotification} = useSelector((state) => ({showPasswordRecoverNotification: state.auth.showPasswordRecoverNotification}))
  const {status, notification} = useSelector((state) => {
    return {
      status: {...state.auth.passwordRecoverStatus}?.success,
      notification: state.auth.passwordRecoverStatus?.success ? 'Письмо с сылкой успешно выслано на почту!' : 'Сервер не подтвердил отправку письма на почту!'
    }
  });

  const history = useHistory();

  const handleClosePopup = () => {
    dispatch(hideRecoverPasswordNotification());
    if (status) {
      history.push('/reset-password')
    }
  }

  return showPasswordRecoverNotification &&
    <Modal header={notification} onClosePopup={handleClosePopup}>
      <div className={'mb-10 mt-10'}>
        <Button type="primary" size="medium" onClick={handleClosePopup}>
          Страница сброса пароля
        </Button>
      </div>
    </Modal>
}

export default RecoverPasswordNotification;
