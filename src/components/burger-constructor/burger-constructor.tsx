// @ts-nocheck

import constructorStyle from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import FillingIngredient from '../filling-ingredient/filling-ingredient'
import fillingIngredientStyle from '../filling-ingredient/filling-ingredient.module.css';

function BurgerConstructor(props) {

  const {upside, fillings, downside} = {...props.burger};

  return (
    <section className={constructorStyle.grid}>
      <section className={constructorStyle.upper_cover}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={upside.text}
            price={upside.price}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>
      </section>
      <section className={constructorStyle.filling}>
        {fillings.map((item) => <FillingIngredient filling={item}/>)}

      </section>
      <section className={constructorStyle.bottom_cover}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>
      </section>
      <section className={constructorStyle.amount}>
        <p className="text text_type_digits-medium">620</p>
        <div className={constructorStyle.currency_icon}>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </section>
    </section>
  )
}

export default BurgerConstructor;
