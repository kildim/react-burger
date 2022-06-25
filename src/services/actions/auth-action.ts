import {createAction} from '@reduxjs/toolkit';
import {AuthAction} from '../../constants/auth-actions';

const showRecoverPasswordNotification = createAction(
  AuthAction.ShowRecoverPasswordNotification, (notification) => ({
    type: AuthAction.ShowRecoverPasswordNotification,
    payload: notification
  })
)

const hideRecoverPasswordNotification = createAction(
  AuthAction.HideRecoverPasswordNotification, (notification) => ({
    type: AuthAction.HideRecoverPasswordNotification,
    payload: null,
  })
)

const showResetPasswordNotification = createAction(
  AuthAction.ShowResetPasswordNotification, (notification) => ({
    type: AuthAction.ShowResetPasswordNotification,
    payload: notification
  })
)

const hideResetPasswordNotification = createAction(
  AuthAction.HideResetPasswordNotification, (notification) => ({
    type: AuthAction.HideResetPasswordNotification,
    payload: null,
  })
)


const postPasswordRecoverRequest = createAction(
  AuthAction.PostPasswordRecoverRequest, (email) => ({
    type: AuthAction.PostPasswordRecoverRequest,
    payload: {
      email: email,
    },
  }),
);

export{
  showRecoverPasswordNotification,
  hideRecoverPasswordNotification,
  showResetPasswordNotification,
  hideResetPasswordNotification,
}
