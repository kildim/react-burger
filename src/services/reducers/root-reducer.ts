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

const addIngredient = (state, action) => {
  const ingredient = current(state).ingredients.find((ingredient) => ingredient._id === action.payload);
  let bun = {...current(state).burger.bun};
  let fillings = [...current(state).burger.fillings]
  console.log(fillings)
  if (ingredient.type === 'bun') {
    bun = ingredient
  } else {
    fillings.push(ingredient)
  }
  return {bun, fillings}
}

const rootReducer = createReducer( preloadedState, (builder) => {
  builder
    .addCase(loadIngredients, (state, action) => {
      state.ingredients = action.payload.ingredients;
    })
    .addCase(addToBurger, (state, action) => {
      state.burger = addIngredient(state, action);
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
