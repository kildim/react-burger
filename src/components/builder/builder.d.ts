import {DataType} from '../../types/data-type';

type burgerType = {
  bun: DataType,
  fillings: DataType[]
}

type BuilderType = {
  data: dataType[],
  burger: burgerType
}

export type {BuilderType}
