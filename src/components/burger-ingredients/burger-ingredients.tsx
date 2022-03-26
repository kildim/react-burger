import IngredientsList from '../ingredients-list/ingredients-list';

import ingredientsStyle from './burger-ingredients.module.css';
import {BurgerIngredientsPropsType, BurgerIngredientType} from './burger-ingredients.d';

const SELECTED_PART_ITEM = `${ingredientsStyle.part_item} ${ingredientsStyle.part_item__selected}`;
const INACTIVE_PART_ITEM = `${ingredientsStyle.part_item}`;
const UNSELECTED_REF = `${ingredientsStyle.part_ref__unselected} text text_type_main-default text_color_inactive`;
const SELECTED_REF = `${ingredientsStyle.part_ref} text text_type_main-default`;

function BurgerIngredients(props: BurgerIngredientsPropsType) {
  const {data} = props;

  const mains = data.filter((item) => item.type === 'main');
  const sauces = data.filter((item) => item.type === 'sauce');
  const buns = data.filter((item) => item.type === 'bun');

  return (
    <section className={ingredientsStyle.grid}>
      <ul className={ingredientsStyle.parts_list}>
        <li className={SELECTED_PART_ITEM}><a href='#' className={SELECTED_REF}>Булки</a></li>
        <li className={INACTIVE_PART_ITEM}><a href='#' className={UNSELECTED_REF}>Соусы</a></li>
        <li className={INACTIVE_PART_ITEM}><a href='#' className={UNSELECTED_REF}>Начинки</a></li>
      </ul>
      <section className={ingredientsStyle.ingredients}>
        <h3 className={ingredientsStyle.ingredient_caption}>Булки</h3>
        <IngredientsList data={buns}/>
        <h3 className={ingredientsStyle.ingredient_caption}>Соусы</h3>
        <IngredientsList data={sauces}/>
        <h3 className={ingredientsStyle.ingredient_caption}>Начинки</h3>
        <IngredientsList  data={mains}/>
      </section>
    </section>
  )
}

export default BurgerIngredients;
