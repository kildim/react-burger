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

const fetchIngredients = () =>
  async (dispatch, _getState) => {
    dispatch(setIsLoading(true));
    try {
      const res = await fetch(`${API_URL}/ingredients`);
      if (res.ok) {
        const serverData = await res.json();
        const ingredients = serverData.data;

        dispatch(loadIngredients(ingredients));
        dispatch(setIsLoading(false));
      } else {
        dispatch(setFetchError({isError: true, errorMessage: res.status}));
        dispatch(setIsLoading(false));
      }
    } catch
      (error) {
      dispatch(setIsLoading(false));
      dispatch(setFetchError({isError: true, errorMessage: error.message}));
    }
  }

const fetchOrder = (ingredientsIds) =>
  async (dispatch, _getState) => {
    dispatch(setIsLoading(true));
    dispatch(dropOrder())
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ingredients: ingredientsIds}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch(`${API_URL}/orders`, options)
        .then((response) => {
          return response.ok ? response.json() : Promise.reject(response.status)
        })
        .then((data) => {
          dispatch(loadOrder(data));
          dispatch(showOrderDetail())
        })
        .catch((error) => {
          dispatch(hideOrderDetail());
          dispatch(setFetchError({isError: true, errorMessage: error.message}));
        })
    } catch
      (error) {
      dispatch(hideOrderDetail())
      dispatch(setFetchError({isError: true, errorMessage: error.message}));
    } finally {
      dispatch(setIsLoading(false));
    }
  }


export {fetchIngredients, fetchOrder};
