type dataType =
  {
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
  };

type burgerType = {
  bun: {
    _id: string
    type: string,
    text: string,
    price: number,
    thumbnail: string,
  },
  fillings: {
    _id: string,
    text: string,
    price: number,
    thumbnail: string
  }[]
}

type BuilderType = {
  data: dataType[],
  burger: burgerType
}

export type {BuilderType}
