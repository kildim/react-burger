import constructorStyle from './constructor.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const CAPTION_STYLE = `${constructorStyle.caption} text text_type_main-large`;
function Constructor(props: any) {
  return (
    <section className={constructorStyle.grid}>
      <h1 className={CAPTION_STYLE}>Соберите бургер</h1>
      <BurgerIngredients data={props}/>
      <BurgerConstructor data={props}/>
    </section>
  )
}

export default Constructor;
