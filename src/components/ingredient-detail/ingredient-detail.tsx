//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import {MouseEvent} from 'react';
import {CloseIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetailStyle from '../ingredient-detail/ingredient-detail.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {hideIngredientDetail} from '../../services/actions/action';

const APP_BODY = document.getElementById('root');
const TERM_DEFINITION_STYLE = 'text text_type_main-small text_color_inactive';
const DEFINITION_DESCRIPTION_STYLE = 'text text_type_digits-default text_color_inactive'

function IngredientDetail() {
  const dispatch = useDispatch();
  const {showIngredientDetail} = useSelector((state) => ({showIngredientDetail: state.showIngredientDetail}))
  const {name, calories, proteins, fat, carbohydrates, image} = useSelector((state) => ({
    name: state.ingredient.name,
    calories: state.ingredient.calories,
    proteins: state.ingredient.proteins,
    fat: state.ingredient.fat,
    carbohydrates: state.ingredient.carbohydrates,
    image: state.ingredient.image,
  }));

  React.useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'Escape')) {
        dispatch(hideIngredientDetail())
      }
    }
    document.addEventListener('keydown', handleEscKeyDown)
    return () => document.removeEventListener('keydown', handleEscKeyDown)
  }, [])

  if (APP_BODY === null) {
    return null;
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>): void => event.stopPropagation();
  const handleCloseClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
    dispatch(hideIngredientDetail())
  }


  return showIngredientDetail && ReactDOM.createPortal(
    <div className={IngredientDetailStyle.modal_overlay} onClick={handleCloseClick}>
      <div className={IngredientDetailStyle.modal} onClick={handleModalClick}>
        <div className={`${IngredientDetailStyle.header} mt-10 mr-10 ml-10`}>
          <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
          <Button type="secondary" size="small" onClick={handleCloseClick}><CloseIcon type="primary"/></Button>
        </div>
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
      </div>
    </div>
, APP_BODY
)
}

export default IngredientDetail;
