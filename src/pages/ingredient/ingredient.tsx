//@ts-nocheck
import styles from '../ingredient/ingredient.module.css';
import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

const TERM_DEFINITION_STYLE = 'text text_type_main-small text_color_inactive';
const DEFINITION_DESCRIPTION_STYLE = 'text text_type_digits-default text_color_inactive'
const TITLE_STYLE = "text text_type_main-large"


function Ingredient() {
  const {id} = useParams()
  const {name, calories, proteins, fat, carbohydrates, image} = useSelector((state) => ({
    name: state.ingredients[id].name,
    calories: state.ingredients[id].calories,
    proteins: state.ingredients[id].proteins,
    fat: state.ingredients[id].fat,
    carbohydrates: state.ingredients[id].carbohydrates,
    image: state.ingredients[id].image,
  }));

  return (
    <section >
      <div className={styles.content}>
        <h1 className={TITLE_STYLE}>Детали ингредиента</h1>
        <img src={image}
          alt={`ingredient illustration`}
          width={480}
          height={240}
        />
        <span className={'mt-4 text text_type_main-medium'}>{name}</span>
        <div className={`mt-8 mb-15`}>
          <dl className={styles.characteristics}>
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
    </section>
  )
}

export default Ingredient;
