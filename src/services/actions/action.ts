import {createAction} from '@reduxjs/toolkit';
import {Action} from '../../constants/actions';

const loadIngredients = createAction(
  Action.LoadIngredients, (ingredients) => ({
  type: Action.LoadIngredients,
  payload: {
    ingredients: ingredients,
  },
}),
);

const  addToBurger = createAction(
  Action.AddToBurger, (_id) => ({
    type: Action.AddToBurger,
    payload: _id
  })
)

const removeFilling = createAction(
  Action.RemoveFilling, (uniqueIndex) => ({
    type: Action.RemoveFilling,
    payload: uniqueIndex,
  })
)

const replaceFillings = createAction(
  Action.ReplaceFillings, (dragIndex, hoverIndex) => ({
    type: Action.ReplaceFillings,
    payload: {dragIndex, hoverIndex},
  })
)

const getBurger = createAction(Action.GetBurger);

const getSelectedIngredient = createAction(Action.GetSelectedIngredient);

const dropSelectedIngredient = createAction(Action.DropSelectedIngredient);

const getOrderNumber = createAction(Action.GetOrderNumber);

const setIsLoading = createAction(
  Action.SetIsLoading, (isLoading: boolean) => ({
    type: Action.SetIsLoading,
    payload: isLoading,
  })
);
const setFetchError = createAction(
  Action.SetFetchError, (fetchError) => ({
    type: Action.SetFetchError,
    payload: fetchError,
  })
);

export {
  loadIngredients,
  addToBurger,
  removeFilling,
  replaceFillings,
  getBurger,
  getSelectedIngredient,
  dropSelectedIngredient,
  getOrderNumber,
  setIsLoading,
  setFetchError
}
