import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import fillingIngredientStyle from './filling-ingredient.module.css';
import {FillingIngredientPropsType} from './filling-ingredient.d'

function FillingIngredient (props: FillingIngredientPropsType) {
  const {name, price, image} = props.filling;
  const {onClick} = props

  return (
    <div className={fillingIngredientStyle.wrapper}>
      <div className={fillingIngredientStyle.handle_wrapper}>
        <DragIcon type="primary" />
      </div>
      <div className={fillingIngredientStyle.element_wrapper} onClick={onClick}>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
        />
      </div>

    </div>

  )
}

export default FillingIngredient;
