import Ingredient from '../ingredient/ingredient';
import {DataType, IngredientsListPropsType} from './ingredients-list.d'

import ingredientsListStyle from './ingredients-list.module.css';
import React from 'react';


function IngredientsList(props: IngredientsListPropsType) {
  const {data = []} = props;

  return (
    <div className={ingredientsListStyle.ingredients}>
      {data.map((item: DataType) => <Ingredient key={item._id} data={item}/>)}
    </div>

  )
}

export default IngredientsList;
