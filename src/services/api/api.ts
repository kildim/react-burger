import {
  loadIngredients,
  setIsLoading,
  loadOrder,
  showOrderDetail,
  hideOrderDetail,
  clearBurger,
  showErrorMessage,
} from '../actions/action';
import {API_URL} from '../../constants/env-config';
import {checkResponse} from '../../utils/utils'
import {ThunkAction} from 'redux-thunk';

const fetchIngredients = (): ThunkAction<any, any, any, any> => (dispatch, _getState) => {
  dispatch(setIsLoading(true));
  fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => dispatch(loadIngredients(res.data)))
    .catch((error) => {
      dispatch(showErrorMessage(error))
    })
    .finally(() => dispatch(setIsLoading(false)))
}


const fetchOrder = (ingredientsIds: string[]): ThunkAction<any, any, any, any> => (dispatch, _getState) => {
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
