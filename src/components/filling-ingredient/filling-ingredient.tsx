// @ts-nocheck

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import fillingIngredientStyle from './filling-ingredient.module.css';

function FillingIngredient (props) {
  const {text, price, thumbnail}={...props.filling}

  return (
    <div className={fillingIngredientStyle.wrapper}>
      <div className={fillingIngredientStyle.handle_wrapper}>
        <DragIcon type="primary" />
      </div>
      <div className={fillingIngredientStyle.element_wrapper}>
        <ConstructorElement
          text={text}
          price={price}
          thumbnail={thumbnail}
        />
      </div>

    </div>

  )
}

export default FillingIngredient;
