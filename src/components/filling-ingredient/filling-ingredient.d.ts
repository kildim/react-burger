type FillingIngredientPropsType = {
  filling: IngredientData,
}

type DragDropItemType = {
  _id: string,
  uniqueIndex: number,
  type?: string,
  index?: number
}

export type {FillingIngredientPropsType, DragDropItemType}
