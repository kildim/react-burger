import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BuilderStyle from './builder.module.css';
import {BuilderProps} from './builder.d'


const CAPTION_STYLE = `${BuilderStyle.caption} text text_type_main-large`;

function Builder(props: BuilderProps) {
  return (
    <section className={BuilderStyle.grid}>
      <h1 className={CAPTION_STYLE}>Соберите бургер</h1>

      <BurgerIngredients data={props.data}/>
      <BurgerConstructor data={props.data}/>
    </section>
  )
}

export default Builder;
