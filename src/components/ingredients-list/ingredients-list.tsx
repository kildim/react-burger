import ingredientsListStyle from './ingredients-list.module.css';
import Ingredient from '../ingredient/ingredient';
import { Key } from 'react';

function IngredientsList(props: any) {
  const {data = []} = {...props};
  return (
    <div className={ingredientsListStyle.ingredients}>
      {data.map((item: { _id: Key | null | undefined; }) => <Ingredient key={item._id} data={item}/>)}
    </div>

  )
}

export default IngredientsList;
