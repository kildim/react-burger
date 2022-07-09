import {TIngredient} from '../types/tingredient';

export const preloadBurger = {
  bun: {} as TIngredient,
  fillings: []
}

export const preloadedState = {
  ingredients: [] as TIngredient[],
  burger: preloadBurger,
  currentIngredient: {},
  order: {
    success: false,
    order: {number: 0}

  },
  isLoading: true,
  errorMessage: null,
  showIngredientDetail: false,
  showOrderDetail: false,
  showErrorMessage: false,
  ingredient: {},
}
