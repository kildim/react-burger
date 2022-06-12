// @ts-nocheck
import {createReducer, current} from '@reduxjs/toolkit';
import {preloadedState} from '../../constants/preload-state';
import {
  dropSelectedIngredient,
  getBurger,
  getOrderNumber,
  getSelectedIngredient,
  replaceFillings,
  loadIngredients,
  removeFilling,
  setIsLoading,
  setFetchError,
  addToBurger,
} from '../actions/action';
import genId from '../../utils/gen-id';

const getUniqueIndex = genId();

const addIngredient = (state, action) => {
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

const removeIngredient = (state, action) => {
  const ingredientUniqueIndex = action.payload;
  let updatedFillings = current(state).burger.fillings.filter((filling) => filling.uniqueIndex !== ingredientUniqueIndex);

  return updatedFillings;
}

const rootReducer = createReducer(preloadedState, (builder) => {
  builder
    .addCase(loadIngredients, (state, action) => {
      state.ingredients = action.payload.ingredients;
    })
    .addCase(addToBurger, (state, action) => {
      const {bun, fillings} = addIngredient(state, action);
      state.burger = {bun: bun, fillings: fillings}
    })
    .addCase(removeFilling, (state, action) => {
      const updatedFillings = removeIngredient(state, action);
      state.burger.fillings = updatedFillings;
    })
    .addCase(replaceFillings, (state, action) => {

      const {dragIndex: sourceUniqueIndex, hoverIndex: targetUniqueIndex} = action.payload;
      const targetIndex = state.burger.fillings.findIndex((filling) => filling.uniqueIndex === targetUniqueIndex);
      const sourceIndex = state.burger.fillings.findIndex((filling) => filling.uniqueIndex === sourceUniqueIndex);

      const dragItem = state.burger.fillings[sourceIndex];
      const hoverItem = state.burger.fillings[targetIndex];
      state.burger.fillings[sourceIndex] = hoverItem;
      state.burger.fillings[targetIndex] = dragItem;
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
