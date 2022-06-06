// @ts-nocheck
import IngredientsList from '../ingredients-list/ingredients-list';

import ingredientsStyle from './burger-ingredients.module.css';
import {useSelector} from 'react-redux';

const SELECTED_PART_ITEM = `${ingredientsStyle.part_item} ${ingredientsStyle.part_item__selected}`;
const INACTIVE_PART_ITEM = `${ingredientsStyle.part_item}`;
const UNSELECTED_REF = `${ingredientsStyle.part_ref__unselected} text text_type_main-default text_color_inactive`;
const SELECTED_REF = `${ingredientsStyle.part_ref} text text_type_main-default`;


function BurgerIngredients() {
  const {ingredients} = useSelector((store) => ({
    ingredients: store.ingredients,
  }))

  if (ingredients.length === 0) {
    return null
  }
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const buns = ingredients.filter((item) => item.type === 'bun');

  const partItemRefClickHandler = (e) => {
    e.currentTarget.classList.remove(`${ingredientsStyle.part_ref__unselected}`, `${ingredientsStyle.text_color_inactive}`);
    e.currentTarget.classList.add(`${ingredientsStyle.part_ref}`);
  };

  const partItemClickHandler = (e) => {
    e.currentTarget.classList.add(`${ingredientsStyle.part_item__selected}`);
  }

  const partsListClickHandler = (e) => {
    const partsList = e.currentTarget;

    partsList.querySelectorAll('li').forEach((listItem) => {
      const listItemRef = listItem.firstChild;

      listItem.classList.remove(`${ingredientsStyle.part_item__selected}`);
      listItemRef.classList.remove(`${ingredientsStyle.part_ref}`);
      listItemRef.classList.add(`${ingredientsStyle.part_ref__unselected}`, 'text_color_inactive')
    })
  }


  return (
    <section className={ingredientsStyle.grid}>
      <ul className={ingredientsStyle.parts_list} onClickCapture={partsListClickHandler}>
        <li className={SELECTED_PART_ITEM} onClick={partItemClickHandler}><a href="#" className={SELECTED_REF}
          onClick={partItemRefClickHandler}>Булки</a></li>
        <li className={INACTIVE_PART_ITEM} onClick={partItemClickHandler}><a href="#" className={UNSELECTED_REF}
          onClick={partItemRefClickHandler}>Соусы</a></li>
        <li className={INACTIVE_PART_ITEM} onClick={partItemClickHandler}><a href="#" className={UNSELECTED_REF}
          onClick={partItemRefClickHandler}>Начинки</a></li>
      </ul>
      <section className={ingredientsStyle.ingredients}>
        <h3 className={ingredientsStyle.ingredient_caption}>Булки</h3>
        <IngredientsList data={buns}/>
        <h3 className={ingredientsStyle.ingredient_caption}>Соусы</h3>
        <IngredientsList data={sauces}/>
        <h3 className={ingredientsStyle.ingredient_caption}>Начинки</h3>
        <IngredientsList data={mains}/>
      </section>
    </section>
  )
}

export default BurgerIngredients;
