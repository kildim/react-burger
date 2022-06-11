import {FillingType} from '../../types/filling-type';

type FillingIngredientPropsType = {
  filling: FillingType,
}

type DragDropItemType = {
  _id: string,
  uniqueIndex: number,
  type?: string,
  index?: number
}

export type {FillingIngredientPropsType, DragDropItemType}
