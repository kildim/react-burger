import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BuilderStyle from './builder.module.css';
import {BuilderType} from './builder.d'


const CAPTION_STYLE = `${BuilderStyle.caption} text text_type_main-large`;

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
