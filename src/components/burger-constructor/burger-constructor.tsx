import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FillingIngredient from '../filling-ingredient/filling-ingredient'

import constructorStyle from './burger-constructor.module.css';
import {BurgerConstructorProps, State} from './burger-constructor.d';
import React from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {IngredientData} from '../../types/ingredient-data';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {order} from '../../utils/data';

function BurgerConstructor(props: BurgerConstructorProps) {

  const {data} = props;
  const [state, setState] = React.useState<State>({showIngredientDetails: false, showOrderDetails: false, ingredient: null})

  const bun = data[0];

  const handleModalClose = () => {
    setState({...state, showIngredientDetails: false, showOrderDetails: false})
  }

  const handleCardClick = (ingredient: IngredientData) => () => {
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
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </section>
      <section className={constructorStyle.filling}>
        {data.map((item: IngredientData) => <FillingIngredient filling={item} key={item._id} onClick={handleCardClick(item)}/>)}
      </section>
      <section className={constructorStyle.bottom_cover} onClick={handleCardClick(bun)}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name}  (низ)`}
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
        state.showIngredientDetails && state.ingredient &&
        <Modal header={'Детали ингредиента'} onCloseClick={handleModalClose}>
          <IngredientDetails data={state.ingredient}  />
        </Modal>
      }

      {
        state.showOrderDetails &&
        <Modal header={''} onCloseClick={handleModalClose}>
          <OrderDetails order={order} />
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor;
