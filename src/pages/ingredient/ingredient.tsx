import styles from '../ingredient/ingredient.module.css';
import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {RootState} from '../../index';
import {TIngredient} from '../../types/tingredient';

const TERM_DEFINITION_STYLE = 'text text_type_main-small text_color_inactive';
const DEFINITION_DESCRIPTION_STYLE = 'text text_type_digits-default text_color_inactive'
const TITLE_STYLE = "text text_type_main-large"

type TLocationParams = {
  id: string,
}

function Ingredient() {
  const {id} = useParams<TLocationParams>()
  const history = useHistory();

  const ingredient = useSelector<RootState, TIngredient | undefined>((state) => state.main.ingredients.find((ingredient) => ingredient._id === id));
  const {name, calories, proteins, fat, carbohydrates, image} = {...ingredient}

  return history.location.state ? null
    :
   (
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
