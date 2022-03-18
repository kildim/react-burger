import ingredientsStyle from './burger-ingredients.module.css';
import IngredientsList from '../ingredients-list/ingredients-list';

function BurgerIngredients(props: any) {
  const SELECTED_PART_ITEM = `${ingredientsStyle.part_item} ${ingredientsStyle.part_item__selected}`;
  const INACTIVE_PART_ITEM = `${ingredientsStyle.part_item}`;

  const UNSELECTED_REF = `${ingredientsStyle.part_ref__unselected} text text_type_main-default text_color_inactive`;
  const SELECTED_REF = `${ingredientsStyle.part_ref} text text_type_main-default`;

  const main = () => props.filter((item: any) => item.type === 'main');
  const sauce = () => props.filter((item: any) => item.type === 'sauce');
  const bun = () => props.filter((item: any) => item.type === 'bun');

  return (
    <section className={ingredientsStyle.grid}>
      <ul className={ingredientsStyle.parts_list}>
        <li className={SELECTED_PART_ITEM}><a href={'#'} className={SELECTED_REF}>Булки</a></li>
        <li className={INACTIVE_PART_ITEM}><a href={'#'} className={UNSELECTED_REF}>Соусы</a></li>
        <li className={INACTIVE_PART_ITEM}><a href={'#'} className={UNSELECTED_REF}>Начинки</a></li>
      </ul>
      <section className={ingredientsStyle.ingredients}>
        <h3 className={ingredientsStyle.ingredient_caption}>Булки</h3>
        <IngredientsList/>
        <h3 className={ingredientsStyle.ingredient_caption}>Соусы</h3>
        <IngredientsList/>
        <h3 className={ingredientsStyle.ingredient_caption}>Начинки</h3>
        <IngredientsList/>
      </section>
    </section>
  )
}

export default BurgerIngredients;
