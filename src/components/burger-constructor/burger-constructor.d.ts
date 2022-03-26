type FillingType = {
  _id: string,
  text: string,
  price: number,
  thumbnail: string
}

type BunType = {
  _id: string
  type: string,
  text: string,
  price: number,
  thumbnail: string,
}

type BurgerConstructorPropsType = {
  burger: {
  bun: BunType,
  fillings: FillingType[]
}
};

export type {BurgerConstructorPropsType, FillingType, BunType};
