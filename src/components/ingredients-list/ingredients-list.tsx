import ingredientsListStyle from './ingredients-list.module.css';
import Ingredient from '../ingredient/ingredient';

function IngredientsList() {
  return (
    <div className={ingredientsListStyle.ingredients}>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
      <Ingredient/>
    </div>

  )
}

export default IngredientsList;
