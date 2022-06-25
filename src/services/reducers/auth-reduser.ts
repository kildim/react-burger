// @ts-nocheck


import {createReducer} from '@reduxjs/toolkit';
import {preloadedAuthState} from '../../constants/preload-auth-state';
import {
  hideRecoverPasswordNotification,
  hideResetPasswordNotification,
  showRecoverPasswordNotification,
  showResetPasswordNotification
} from '../actions/auth-action';

const authReducer = createReducer(preloadedAuthState, (builder) => {
  builder
    .addCase(showRecoverPasswordNotification, ((state, action) => {
      state.showPasswordRecoverNotification = true;
      state.passwordRecoverStatus = action.payload;
    }))
    .addCase(hideRecoverPasswordNotification, ((state, action) => {
      state.showPasswordRecoverNotification = false;
      state.passwordRecoverStatus = null;
    }))
    .addCase(showResetPasswordNotification, ((state, action) => {
      state.showPasswordResetNotification = true;
      state.passwordResetStatus = action.payload;
    }))
    .addCase(hideResetPasswordNotification, ((state, action) => {
      state.showPasswordResetNotification = false;
      state.passwordResetStatus = null;
    }))
})

export {authReducer}
