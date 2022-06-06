//@ts-nocheck

import {loadIngredients, setIsLoading, setFetchError} from '../actions/action';
import {API_URL} from '../../constants/env-config';

const fetchIngredients = () =>
  async (dispatch, _getState) => {
      dispatch(setIsLoading(true));
      const res = await fetch(`${API_URL}/ingredients`);
      try {
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



export {fetchIngredients};
