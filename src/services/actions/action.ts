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

const loadOrder = createAction(
  Action.LoadOrder, (order) => ({
    type: Action.LoadOrder,
    payload: {
      order: order
    }
  })
)

const dropOrder = createAction(
  Action.DropOrder, () => ({
    type: Action.DropOrder,
    payload: {}
  })
)

const addToBurger = createAction(
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

const showIngredientDetail = createAction(
  Action.ShowIngredientDetail, () => ({
    type: Action.ShowIngredientDetail,
    payload: null
  })
)

const hideIngredientDetail = createAction(
  Action.HideIngredientDetail, () => ({
    type: Action.HideIngredientDetail,
    payload: null
  })
)

const selectIngredient = createAction(
  Action.SelectIngredient, (id) => ({
    type: Action.SelectIngredient,
    payload: id
  })
)

const showOrderDetail = createAction(
  Action.ShowOrderDetail, () => ({
    type: Action.ShowOrderDetail,
    payload: null
  })
)

const clearBurger = createAction(
  Action.ClearBurger, () => ({
    type: Action.ClearBurger,
    payload: null,
  })
)

const hideOrderDetail = createAction(
  Action.HideOrderDetail, () => ({
    type: Action.HideOrderDetail,
    payload: null
  })
)

const setIsLoading = createAction(
  Action.SetIsLoading, (isLoading: boolean) => ({
    type: Action.SetIsLoading,
    payload: isLoading,
  })
);

const showErrorMessage = createAction(
  Action.ShowErrorMessage, (errorMessage) => ({
      type: Action.ShowErrorMessage,
      payload: {errorMessage},
    })
)



const hideErrorMessage = createAction(
  Action.HideErrorMessage, () => ({
    type: Action.HideErrorMessage,
    payload: null,
  })
)

export {
  loadIngredients,
  addToBurger,
  removeFilling,
  replaceFillings,
  loadOrder,
  dropOrder,
  showIngredientDetail,
  hideIngredientDetail,
  selectIngredient,
  showOrderDetail,
  hideOrderDetail,
  setIsLoading,
  showErrorMessage,
  hideErrorMessage,
  clearBurger,
}
