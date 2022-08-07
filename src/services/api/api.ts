import {
  loadIngredients,
  setIsLoading,
  loadOrder,
  showOrderDetail,
  hideOrderDetail,
  clearBurger,
  showErrorMessage, setIsOrderLoading, loadSelectedOrder, TAction,
} from '../actions/action';
import {API_URL} from '../../constants/env-config';
import {checkResponse, getCookie} from '../../utils/utils'
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../index';

const fetchIngredients = (): ThunkAction<void, RootState, unknown, TAction> => (dispatch, _getState) => {
  dispatch(setIsLoading(true));
  fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => dispatch(loadIngredients(res.data)))
    .catch((error) => {
      dispatch(showErrorMessage(error))
    })
    .finally(() => dispatch(setIsLoading(false)))
}


const fetchOrder = (ingredientsIds: string[]): ThunkAction<void, RootState, unknown, TAction> => (dispatch, _getState) => {
  let authorisation = getCookie("authorization");

  dispatch(setIsLoading(true));
  if (authorisation === undefined) {
    authorisation = '';
    dispatch(hideOrderDetail());
    dispatch(showErrorMessage('no Authorization Key'));
    dispatch(setIsLoading(false));
  };
  const options = {
    method: 'POST',
    body: JSON.stringify({ingredients: ingredientsIds}),
    headers: {
      'Content-Type': "application/json;charset=utf-8",
      authorization: authorisation,
    },
  };

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

const fetchOrderByNum = (orderId: string | undefined): ThunkAction<void, RootState, unknown, TAction> => (dispatch, _getState) => {
  if (orderId === undefined) {
    dispatch(showErrorMessage({errorMessage: 'Не указан номер заказа!'}))
  };
  dispatch(setIsOrderLoading(true));
  fetch(`${API_URL}/orders/${orderId}`)
    .then(checkResponse)
    .then((res) => {
      dispatch(loadSelectedOrder(res.orders[0]))
    })
    .catch((error) => {
      dispatch(showErrorMessage(error))
    })
    .finally(() => dispatch(setIsOrderLoading(false)))

};

export {fetchIngredients, fetchOrder, fetchOrderByNum};
