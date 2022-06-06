// @ts-nocheck
import {createReducer} from '@reduxjs/toolkit';
import {preloadedState} from '../../constants/preload-state';
import {
  dropSelectedIngredient,
  getBurger,
  getOrderNumber,
  getSelectedIngredient,
  loadIngredients,
  setIsLoading,
  setFetchError,
} from '../actions/action';

const rootReducer = createReducer( preloadedState, (builder) => {
  builder
    .addCase(loadIngredients, (state, action) => {
        state.ingredients = action.payload.ingredients;
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
