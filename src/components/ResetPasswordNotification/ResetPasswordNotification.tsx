import React from 'react';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

type TResetPasswordNotificationProps = {
  onClosePopup: () => void;
}

function ResetPasswordNotification(props: TResetPasswordNotificationProps): JSX.Element {
  const {onClosePopup} = {...props};


  return (
    <div className={'mb-10 mt-10'}>
      <Button type="primary" size="medium" onClick={onClosePopup}>
        Отлично
      </Button>
    </div>)
}

export default ResetPasswordNotification;
