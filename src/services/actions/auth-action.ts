import {createAction} from '@reduxjs/toolkit';
import {Action} from '../../constants/actions';

const showRecoverPasswordNotification = createAction(
  Action.ShowRecoverPasswordNotification, (notification) => ({
    type: Action.ShowRecoverPasswordNotification,
    payload: notification
  })
)

const hideRecoverPasswordNotification = createAction(
  Action.HideRecoverPasswordNotification, (notification) => ({
    type: Action.HideRecoverPasswordNotification,
    payload: null,
  })
)

const showResetPasswordNotification = createAction(
  Action.ShowResetPasswordNotification, (notification) => ({
    type: Action.ShowResetPasswordNotification,
    payload: notification
  })
)

const hideResetPasswordNotification = createAction(
  Action.HideResetPasswordNotification, (notification) => ({
    type: Action.HideResetPasswordNotification,
    payload: null,
  })
)


const postPasswordRecoverRequest = createAction(
  Action.PostPasswordRecoverRequest, (email) => ({
    type: Action.PostPasswordRecoverRequest,
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
