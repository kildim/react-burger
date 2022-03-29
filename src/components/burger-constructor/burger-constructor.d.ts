import {IngredientData} from '../../types/ingredient-data.d';

export type BurgerConstructorProps = {
  data: IngredientData[]
}

export type BurgerIngredient = {
  data: IngredientData
}

export type State = {
  showIngredientDetails: boolean,
  showOrderDetails: boolean,
  ingredient: IngredientData | null
}
