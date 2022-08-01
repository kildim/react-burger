import {createAction} from '@reduxjs/toolkit';
import {AuthAction} from '../../constants/auth-actions';

const showRecoverPasswordNotification = createAction(
  AuthAction.ShowRecoverPasswordNotification, (notification) => ({
    type: AuthAction.ShowRecoverPasswordNotification,
    payload: notification
  })
)

const hideRecoverPasswordNotification = createAction(
  AuthAction.HideRecoverPasswordNotification, () => ({
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
  AuthAction.HideResetPasswordNotification, () => ({
    type: AuthAction.HideResetPasswordNotification,
    payload: null,
  })
)

const saveUserProfile = createAction(
  AuthAction.SaveUserProfile, (userProfile) => ({
    type: AuthAction.SaveUserProfile,
    payload: userProfile,
  })
)

const setAuthChecked = createAction(
  AuthAction.SET_AUTH_CHECKED, (isChecked) => ({
    type: AuthAction.SET_AUTH_CHECKED,
    payload: isChecked,
  })
)

const setIsAuthenticated = createAction(
  AuthAction.SetIsAuthenticated, (isAuthenticated) => ({
    type: AuthAction.SetIsAuthenticated,
    payload: isAuthenticated,
  })
)

const setIsUserDataLoading = createAction(
  AuthAction.SetIsUserDataLoading, (isUserDataLoading) => ({
    type: AuthAction.SetIsUserDataLoading,
    payload: isUserDataLoading,
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

export type TAuthAction =
    ReturnType<typeof showRecoverPasswordNotification>
  | ReturnType<typeof hideRecoverPasswordNotification>
  | ReturnType<typeof showResetPasswordNotification>
  | ReturnType<typeof hideResetPasswordNotification>
  | ReturnType<typeof postPasswordRecoverRequest>
  | ReturnType<typeof saveUserProfile>
  | ReturnType<typeof setIsAuthenticated>
  | ReturnType<typeof setIsUserDataLoading>
  | ReturnType<typeof setAuthChecked>

export{
  showRecoverPasswordNotification,
  hideRecoverPasswordNotification,
  showResetPasswordNotification,
  hideResetPasswordNotification,
  postPasswordRecoverRequest,
  saveUserProfile,
  setIsAuthenticated,
  setIsUserDataLoading,
  setAuthChecked,
}
