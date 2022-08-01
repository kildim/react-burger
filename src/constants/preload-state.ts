import {TIngredient} from '../types/tingredient';
import {TOrder} from '../types/torder';

export const preloadBurger = {
  bun: {} as TIngredient,
  fillings: [] as TIngredient[]
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
  isOrderLoading: true,
  errorMessage: null,
  showIngredientDetail: false,
  showOrderDetail: false,
  showErrorMessage: false,
  ingredient: {} as TIngredient,
  selectedOrder: {} as TOrder,
}
