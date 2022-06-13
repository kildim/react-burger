//@ts-nocheck

import {
  loadIngredients,
  setIsLoading,
  setFetchError,
  loadOrder,
  dropOrder,
  showOrderDetail,
  hideOrderDetail
} from '../actions/action';
import {API_URL} from '../../constants/env-config';
import {ok} from 'assert';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res.status);

const fetchIngredients = () => (dispatch, _getState) => {
  dispatch(setIsLoading(true));
  fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => dispatch(loadIngredients(res.data)))
    .catch((error) => dispatch(setFetchError({isError: true, errorMessage: error})))
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
      dispatch(showOrderDetail())
    })
    .catch((error) => {
      dispatch(hideOrderDetail());
      dispatch(setFetchError({isError: true, errorMessage: error}));
    })
    .finally(() => dispatch(setIsLoading(false)))
}


export {fetchIngredients, fetchOrder};
