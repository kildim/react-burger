// @ts-nocheck

import constructorStyle from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import FillingIngredient from '../filling-ingredient/filling-ingredient'
import fillingIngredientStyle from '../filling-ingredient/filling-ingredient.module.css';

function BurgerConstructor(props) {

  const {upside, fillings, downside} = {...props.burger};
  console.log(upside.thumbnail)

  return (
    <section className={constructorStyle.grid}>
      <section className={constructorStyle.upper_cover}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={upside.text}
            price={upside.price}
            thumbnail={upside.thumbnail}
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
            text={downside.text}
            price={downside.price}
            thumbnail={downside.thumbnail}
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
