import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FillingIngredient from '../filling-ingredient/filling-ingredient'

import constructorStyle from './burger-constructor.module.css';
import {BurgerConstructorPropsType} from './burger-constructor.d'
import React from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {DataType} from '../../types/data-type';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {order} from '../../utils/data';

function BurgerConstructor(props: BurgerConstructorPropsType) {

  const {bun, fillings} = props.burger;
  const [state, setState] = React.useState({showIngredientDetails: false, showOrderDetails: false, ingredient: {}})

  const handleModalClose = () => {
    setState({...state, showIngredientDetails: false, showOrderDetails: false})
  }
  const handleCardClick = (ingredient: DataType) => () => {
    setState(({...state, showIngredientDetails: true, ingredient: ingredient}))
  }
  const handleOrderClick = () => {
    setState(({...state, showOrderDetails: true}))
  }

  return (
    <section className={constructorStyle.grid}>
      <section className={constructorStyle.upper_cover} onClick={handleCardClick(bun)}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </section>
      <section className={constructorStyle.filling}>
        {fillings.map((item: DataType) => <FillingIngredient filling={item} key={item._id} onClick={handleCardClick(item)}/>)}
      </section>
      <section className={constructorStyle.bottom_cover} onClick={handleCardClick(bun)}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </section>
      <section className={constructorStyle.amount}>
        <p className="text text_type_digits-medium">620</p>
        <div className={constructorStyle.currency_icon}>
          <CurrencyIcon type="primary"/>
        </div>
        <div onClick={handleOrderClick}>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
      {
        state.showIngredientDetails &&
        <Modal header={'Детали ингредиента'} show={true} onCloseClick={handleModalClose}>
          <IngredientDetails data={state.ingredient} />
        </Modal>
      }

      {
        state.showOrderDetails &&
        <Modal header={''} show={true} onCloseClick={handleModalClose}>
          <OrderDetails order={order} />
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor;
