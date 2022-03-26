import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FillingIngredient from '../filling-ingredient/filling-ingredient'

import constructorStyle from './burger-constructor.module.css';
import {BurgerConstructorPropsType, FillingType, BunType} from './burger-constructor.d'

function BurgerConstructor(props: BurgerConstructorPropsType) {

  const {bun, fillings} = props.burger;

  return (
    <section className={constructorStyle.grid}>
      <section className={constructorStyle.upper_cover}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.text}
            price={bun.price}
            thumbnail={bun.thumbnail}
          />
        </div>
      </section>
      <section className={constructorStyle.filling}>
        {fillings.map((item: FillingType) => <FillingIngredient filling={item} key={item._id}/>)}

      </section>
      <section className={constructorStyle.bottom_cover}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.text}
            price={bun.price}
            thumbnail={bun.thumbnail}
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
