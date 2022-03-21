import BuilderStyle from './builder.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {burger} from '../../utils/data';

const CAPTION_STYLE = `${BuilderStyle.caption} text text_type_main-large`;

type dataType =
  {
    '_id': string,
    'name': string,
    'type': string,
    'proteins': number,
    'fat': number,
    'carbohydrates': number,
    'calories': number,
    'price': number,
    'image': string,
    'image_mobile': string,
    'image_large': string,
    '__v': number
  }[];

type burgerType = {
  upside: {
    type: string,
    text: string,
    price: number,
    thumbnail: string,
  },
  fillings: {
    text: string,
    price: number,
    thumbnail: string
  }[],
  downside: {
    type: string,
    text: string,
    price: number,
    thumbnail: string,
  },
}

type BuilderType = {
  data: dataType,
  burger: burgerType
}

function Builder(props: BuilderType) {
  return (
    <section className={BuilderStyle.grid}>
      <h1 className={CAPTION_STYLE}>Соберите бургер</h1>

      <BurgerIngredients data={props.data}/>
      <BurgerConstructor burger={props.burger}/>
    </section>
  )
}

export default Builder;
