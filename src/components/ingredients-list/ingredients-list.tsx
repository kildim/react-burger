// @ts-nocheck
import Ingredient from '../ingredient/ingredient';

import ingredientsListStyle from './ingredients-list.module.css';


function IngredientsList(props: any) {
  const {data = []} = props;
  return (
    <div className={ingredientsListStyle.ingredients}>
      {data.map((item) => <Ingredient key={item._id} data={item}/>)}
    </div>

  )
}

export default IngredientsList;
