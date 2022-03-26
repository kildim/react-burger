type IngredientDetailsPropsType = {
  data: {
    _id: string,
    name: string,
    type: 'main' | 'sauce' | 'bun',
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
  }
};

export type {IngredientDetailsPropsType};
