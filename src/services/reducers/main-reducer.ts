import {createReducer, current} from '@reduxjs/toolkit';
import {preloadBurger, preloadedState} from '../../constants/preload-state';
import {
  addToBurger,
  clearBurger,
  dropOrder,
  hideErrorMessage,
  hideIngredientDetail,
  hideOrderDetail,
  loadIngredients,
  loadOrder, loadSelectedOrder,
  removeFilling,
  replaceFillings,
  selectIngredient,
  setIsLoading, setIsOrderLoading,
  showErrorMessage,
  showIngredientDetail,
  showOrderDetail,
} from '../actions/action';
import genId from '../../utils/gen-id';
import { Action } from '../../constants/actions';
import { TIngredient } from '../../types/tingredient';

type TState = {
  ingredients: TIngredient[];
  burger: {
    bun: TIngredient;
    fillings: TIngredient[];
  };
  currentIngredient: {};
  order: {
    success: boolean;
    order: { number: number; };
  };
  isLoading: boolean;
  errorMessage: null;
  showIngredientDetail: boolean;
  showOrderDetail: boolean;
  showErrorMessage: boolean;
  ingredient: {};
}

const getUniqueIndex = genId();

const addIngredient = (state: TState, action: { payload: any; type?: Action.AddToBurger; }) => {
  let ingredients = [...current(state).ingredients]
  let ingredientIndex = ingredients.findIndex((ingredient) => ingredient._id === action.payload);
  let bun = {...current(state).burger.bun};
  let fillings = [...current(state).burger.fillings]
  if (ingredients[ingredientIndex].type === 'bun') {
    bun = {...ingredients[ingredientIndex]}
  } else {
    fillings.push({...ingredients[ingredientIndex], uniqueIndex: getUniqueIndex()})
  }

  return {bun, fillings}
}

const removeIngredient = (state: TState, action: { payload: any; type?: Action.RemoveFilling; }) => {
  const ingredientUniqueIndex = action.payload;
  return current(state).burger.fillings.filter((filling) => filling.uniqueIndex !== ingredientUniqueIndex);
}

const mainReducer = createReducer(preloadedState, (builder) => {
  builder
    .addCase(loadIngredients, (state, action) => {
      state.ingredients = action.payload.ingredients;
    })
    .addCase(addToBurger, (state, action) => {
      const {bun, fillings} = addIngredient(state, action);
      state.burger = {bun: bun, fillings: fillings}
    })
    .addCase(removeFilling, (state, action) => {
      state.burger.fillings = removeIngredient(state, action);
    })
    .addCase(replaceFillings, (state, action) => {

      const {dragIndex: sourceUniqueIndex, hoverIndex: targetUniqueIndex} = action.payload;
      const targetIndex = state.burger.fillings.findIndex((filling) => filling.uniqueIndex === targetUniqueIndex);
      const sourceIndex = state.burger.fillings.findIndex((filling) => filling.uniqueIndex === sourceUniqueIndex);

      const dragItem = state.burger.fillings[sourceIndex];
      state.burger.fillings[sourceIndex] = state.burger.fillings[targetIndex];
      state.burger.fillings[targetIndex] = dragItem;
    })
    .addCase(loadOrder, (state, action) => {
      state.order = action.payload.order;
    })
    .addCase(dropOrder, (state, _action) => {
      state.order = {success: false, order: {number:0}}
    })
    .addCase(showIngredientDetail, (state, _action) => {
      state.showIngredientDetail = true
    })
    .addCase(hideIngredientDetail, (state, _action) => {
      state.showIngredientDetail = false
    })
    .addCase(showOrderDetail, (state, _action) => {
      state.showOrderDetail = true
    })
    .addCase(clearBurger, (state, _action) => {
      state.burger = preloadBurger;
    })
    .addCase(hideOrderDetail, (state, _action) => {
      state.showOrderDetail = false
    })
    .addCase(selectIngredient, (state, action) => {
      state.ingredient = state.ingredients.find((ingredient) => ingredient._id === action.payload) as TIngredient
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload
    })
    .addCase(showErrorMessage, (state, action) => {
      state.showErrorMessage = true;
      state.errorMessage = action.payload.errorMessage;
    })
    .addCase(hideErrorMessage, (state, _action) => {
      state.showErrorMessage = false;
      state.errorMessage = null;
    })
    .addCase(setIsOrderLoading, (state, action) => {
      state.isOrderLoading = action.payload
    })
    .addCase(loadSelectedOrder, (state, action) => {
      state.selectedOrder = action.payload
    })
})

export {mainReducer};
