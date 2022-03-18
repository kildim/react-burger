import constructorStyle from './constructor.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const CAPTION_STYLE = `${constructorStyle.caption} text text_type_main-large`;
function Constructor(props: any) {
  return (
    <section className={constructorStyle.grid}>
      <h1 className={CAPTION_STYLE}>Соберите бургер</h1>
      <BurgerIngredients data={props}/>
      <BurgerIngredients data={props}/>
    </section>
  )
}

export default Constructor;
