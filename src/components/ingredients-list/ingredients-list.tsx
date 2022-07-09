import Ingredient from '../ingredient/ingredient';
import ingredientsListStyle from './ingredients-list.module.css';
import React from 'react';
import {TIngredient} from '../../types/tingredient';

type IngredientsListProps = {
  data: TIngredient[]
}

function IngredientsList(props: IngredientsListProps) {
  const {data = []} = props;

  return (
    <div className={ingredientsListStyle.ingredients}>
      {data.map((item: TIngredient) => <Ingredient key={item._id} data={item}/>)}
    </div>

  )
}

export default IngredientsList;
