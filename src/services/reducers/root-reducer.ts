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
  let updatedFillings = current(state).burger.fillings.filter( (filling) => filling.uniqueIndex !== ingredientUniqueIndex);

  return updatedFillings;
}

const replaceIngredients = (state, action) => {
  const {dragIndex: sourceUniqueIndex, hoverIndex: targetUniqueIndex} = action.payload;
  const sourceItem = {...current(state).burger.fillings.find( (filling) => filling.uniqueIndex === sourceUniqueIndex)};
  const targetIndex = current(state).burger.fillings.findIndex( (filling) => filling.uniqueIndex === sourceUniqueIndex);
  const sourceIndex = current(state).burger.fillings.findIndex( (filling) => filling.uniqueIndex === sourceUniqueIndex);
  const updatedFillings = current(state).burger.fillings.map( (filling) => filling);
  updatedFillings.splice(sourceIndex, 1);
  updatedFillings.splice(targetIndex, 0, sourceItem);

  // не могу понять почему не изменяется updatedFillings при перетаскиавнии ингредиента !
  console.log(updatedFillings);
  return updatedFillings;
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
    .addCase(removeFilling, (state, action) => {
        const updatedFillings = removeIngredient(state, action);
        state.burger.fillings = updatedFillings;
    })
    .addCase(replaceFillings, (state, action) => {
      const replacedFillings = replaceIngredients(state, action);
      state.burger.fillings = replacedFillings;
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
