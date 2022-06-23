//@ts-nocheck

import {
  loadIngredients,
  setIsLoading,
  loadOrder,
  showOrderDetail,
  hideOrderDetail,
  clearBurger,
  showErrorMessage,
  showRecoverPasswordNotification,
  showResetPasswordNotification,
} from '../actions/action';
import {API_URL} from '../../constants/env-config';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res.status);

const fetchIngredients = () => (dispatch, _getState) => {
  dispatch(setIsLoading(true));
  fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => dispatch(loadIngredients(res.data)))
    .catch((error) => {
      dispatch(showErrorMessage(error))
    })
    .finally(() => dispatch(setIsLoading(false)))
}


const fetchOrder = (ingredientsIds) => (dispatch, _getState) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ingredients: ingredientsIds}),
    headers: {
      'Content-Type': 'application/json'
    },
  };

  dispatch(setIsLoading(true));
  fetch(`${API_URL}/orders`, options)
    .then(checkResponse)
    .then((res) => {
      dispatch(loadOrder(res));
      dispatch(clearBurger());
      dispatch(showOrderDetail())
    })
    .catch((error) => {
      dispatch(hideOrderDetail());
      dispatch(showErrorMessage({errorMessage: error}));
    })
    .finally(() => dispatch(setIsLoading(false)))
}

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


export {fetchIngredients, fetchOrder, postRememberPasswordNotification, postResetPassword};
