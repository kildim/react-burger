import {DataType} from '../../types/data-type';

type burgerType = {
  bun: DataType,
  fillings: DataType[]
}

type BuilderProps = {
  data: dataType[],
  burger: burgerType
}

export type {BuilderProps}
