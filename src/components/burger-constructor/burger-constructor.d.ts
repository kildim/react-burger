import {DataType} from '../../types/data-type';

export type BurgerConstructorProps = {
  data: DataType[]
}

export type BurgerIngredient = {
  data: DataType
}

export type State = {
  showIngredientDetails: boolean,
  showOrderDetails: boolean,
  ingredient: DataType | null
}
