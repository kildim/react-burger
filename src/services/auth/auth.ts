//@ts-nocheck


import {
  showRecoverPasswordNotification,
  showResetPasswordNotification
} from '../actions/auth-action';
import {
  setIsLoading,
  showErrorMessage,
} from '../actions/action';
import {API_URL} from '../../constants/env-config';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res.status);


const postRememberPasswordNotification = (email) => (dispatch, _getState) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({email: email}),
    headers: {
      'Content-Type': 'application/json'
    },
  };

  dispatch(setIsLoading(true));
  fetch(`${API_URL}/password-reset`, options)
    .then(checkResponse)
    .then((res) => {
      dispatch(showRecoverPasswordNotification(res))
    })
    .catch((error) => {
      dispatch(showErrorMessage({errorMessage: error}));
    })
    .finally(() => dispatch(setIsLoading(false)))
}

const postResetPassword = (requestBody) => (dispatch, _getState) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    },
  };


  dispatch(setIsLoading(true));
  fetch(`${API_URL}/password-reset/reset`, options)
    .then(checkResponse)
    .then((res) => {
      dispatch(showResetPasswordNotification(res))
    })
    .catch((error) => {
      dispatch(showErrorMessage({errorMessage: error}));
    })
    .finally(() => dispatch(setIsLoading(false)))
}

export {postRememberPasswordNotification, postResetPassword}
