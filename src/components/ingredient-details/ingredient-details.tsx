import React from 'react';

import {IngredientDetailsProps} from './ingredient-details.d';
import IngredientDetailsStyle from './ingredient-details.module.css'

function IngredientDetails(props: IngredientDetailsProps) {
  const {image, name, calories, proteins, fat, carbohydrates} = props.data;

  const TERM_DEFINITION_STYLE = 'text text_type_main-small text_color_inactive';
  const DEFINITION_DESCRIPTION_STYLE = 'text text_type_digits-default text_color_inactive'

  return (
 <div className={IngredientDetailsStyle.content}>
   <img src={image}
        alt={`${name} ingredient illustration`}
        width={480}
        height={240}
   />
   <span className={'mt-4 text text_type_main-medium'}>
     {name}
   </span>
   <div className={`${IngredientDetailsStyle.characteristics_container} mt-8 mb-15`}>
      <dl className={IngredientDetailsStyle.characteristics}>
        <dt className={TERM_DEFINITION_STYLE}>Калории,ккал</dt>
        <dd className={DEFINITION_DESCRIPTION_STYLE}>{calories}</dd>
        <dt className={TERM_DEFINITION_STYLE}>Белки, г</dt>
        <dd className={DEFINITION_DESCRIPTION_STYLE}>{proteins}</dd>
        <dt className={TERM_DEFINITION_STYLE}>Жиры, г</dt>
        <dd className={DEFINITION_DESCRIPTION_STYLE}>{fat}</dd>
        <dt className={TERM_DEFINITION_STYLE}>Углеводы, г</dt>
        <dd className={DEFINITION_DESCRIPTION_STYLE}>{carbohydrates}</dd>
      </dl>
   </div>

 </div>
  )
}

export default IngredientDetails;
