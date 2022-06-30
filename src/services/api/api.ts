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
// const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

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

export {fetchIngredients, fetchOrder};
