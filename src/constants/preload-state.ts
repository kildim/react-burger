export const preloadBurger = {
  bun: {
    _id: ''
  },
  fillings: []
}

export const preloadedState = {
  ingredients: [],
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
