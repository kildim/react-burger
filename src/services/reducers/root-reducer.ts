// @ts-nocheck
import {createReducer, current} from '@reduxjs/toolkit';
import {preloadedState} from '../../constants/preload-state';
import {
  dropSelectedIngredient,
  getBurger,
  getOrderNumber,
  getSelectedIngredient,
  loadIngredients,
  setIsLoading,
  setFetchError, addToBurger,
} from '../actions/action';
import ingredient from '../../components/ingredient/ingredient';

const addIngredient = (state, action) => {
  let ingredients = [...current(state).ingredients]
  let ingredientIndex = ingredients.findIndex((ingredient) => ingredient._id === action.payload);
  let bun = {...current(state).burger.bun};
  let fillings = [...current(state).burger.fillings]
  if (ingredients[ingredientIndex].type === 'bun') {
    bun = {...ingredients[ingredientIndex]}
  } else {
    fillings.push(ingredients[ingredientIndex])
  }

  return {bun, fillings}
}

const rootReducer = createReducer( preloadedState, (builder) => {
  builder
    .addCase(loadIngredients, (state, action) => {
      state.ingredients = action.payload.ingredients;
    })
    .addCase(addToBurger, (state, action) => {
       const {bun, fillings} = addIngredient(state, action);
       state.burger = {bun: bun, fillings: fillings}
    })
    .addCase(getBurger, (state, action) => {
    })
    .addCase(getSelectedIngredient, (state, action) => {
    })
    .addCase(dropSelectedIngredient, (state, action) => {
    })
    .addCase(getOrderNumber, (state, action) => {
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload
    })
    .addCase(setFetchError, ((state, action) => {
      state.isError = action.payload.isError;
      state.errorMessage = action.payload.errorMessage;
    }))
})

export {rootReducer};
