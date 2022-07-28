//@ts-nocheck
import React from 'react';
import IngredientDetailStyle from '../ingredient-detail/ingredient-detail.module.css';
import {useSelector} from 'react-redux';

const TERM_DEFINITION_STYLE = 'text text_type_main-small text_color_inactive';
const DEFINITION_DESCRIPTION_STYLE = 'text text_type_digits-default text_color_inactive'

function IngredientDetail(props) {
const {q} = props;
  const {name, calories, proteins, fat, carbohydrates, image} = useSelector((state) => ({
    name: state.main.ingredient.name,
    calories: state.main.ingredient.calories,
    proteins: state.main.ingredient.proteins,
    fat: state.main.ingredient.fat,
    carbohydrates: state.main.ingredient.carbohydrates,
    image: state.main.ingredient.image,
  }));

  return (
    <>
      <div className={IngredientDetailStyle.content}>
        <img src={image}
          alt={`${name} ingredient illustration`}
          width={480}
          height={240}
        />
        <span className={'mt-4 text text_type_main-medium'}>{name}</span>
        <div className={`${IngredientDetailStyle.characteristics_container} mt-8 mb-15`}>
          <dl className={IngredientDetailStyle.characteristics}>
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
    </>
  )
}

export default IngredientDetail;
