import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import fillingIngredientStyle from './filling-ingredient.module.css';

function FillingIngredient () {
  return (
    <div className={fillingIngredientStyle.wrapper}>
      <div className={fillingIngredientStyle.handle_wrapper}>
        <DragIcon type="primary" />
      </div>
      <div className={fillingIngredientStyle.element_wrapper}>
        <ConstructorElement
          text="Соус Spicy-X"
          price={50}
          thumbnail={'https://code.s3.yandex.net/react/code/sauce-02.png'}
        />
      </div>

    </div>

  )
}

export default FillingIngredient;
