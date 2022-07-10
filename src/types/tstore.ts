import {preloadBurger} from '../constants/preload-state';

export type TStore = {
  main: {
    ingredients: [],
    burger: {
      bun: {},
      fillings: []
    },
    currentIngredient: {},
    order: {},
    isLoading: true,
    errorMessage: null,
    showIngredientDetail: false,
    showOrderDetail: false,
    showErrorMessage: false,
    ingredient: {},
  }
}
