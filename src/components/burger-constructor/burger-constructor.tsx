// @ts-nocheck
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FillingIngredient from '../filling-ingredient/filling-ingredient'

import constructorStyle from './burger-constructor.module.css';
import {State, BurgerConstructorProps} from './burger-constructor.d';
import React, {useContext} from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {IngredientData} from '../../types/ingredient-data';
import IngredientDetails from '../ingredient-details/ingredient-details';

// import {order} from '../../utils/data';
import {AppContext} from '../../contexts/app-context';
import {API_URL} from '../../constants/env-config';
import {log} from 'util';

function BurgerConstructor() {
  const [state, setState] = React.useState<State>({showIngredientDetails: false, showOrderDetails: false, ingredient: null});
  const {state: appState} = useContext(AppContext);
  const ingredients = [...appState.data]

  const handleModalClose = () => {
    setState({...state, showIngredientDetails: false, showOrderDetails: false, order: null})
  }



  const bun = ingredients.find((item) => item.type === 'bun');
  const fillings = ingredients.filter((item) => item.type !== 'bun');


  const [burger, setBurger] = React.useState({bun: bun, fillings: fillings})

  const cost = (burger) => {
    let amount = burger.fillings.reduce((amount, current) => amount + current.price, 0);
    return amount + burger.bun.price + burger.bun.price;
  }

  const amount = cost(burger);

  const ingredientsIds = () => {
    let ids = burger.fillings.map((item) => item._id);
    ids.push(burger.bun._id);
    return ids;
  }

  const handleCardClick = (ingredient: IngredientData) => () => {
    setState(({...state, showIngredientDetails: true, ingredient: ingredient}))
  }
  const handleOrderClick = () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ingredients: ingredientsIds()}),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`${API_URL}/orders`, options)
      .then((response) => {
        console.log(response);
        return response.json()})
      .then((data) => {
        setState({...state, order: data.order.number, showOrderDetails: true })})
      .catch((error) => console.log(eroor))
  }

  return (
    <section className={constructorStyle.grid}>
      <section className={constructorStyle.upper_cover} onClick={handleCardClick(bun)}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burger.bun.name} (верх)`}
            price={burger.bun.price}
            thumbnail={burger.bun.image}
          />
        </div>
      </section>
      <section className={constructorStyle.filling}>
        {burger.fillings.map((item: IngredientData) => <FillingIngredient filling={item} key={item._id} onClick={handleCardClick(item)}/>)}
      </section>
      <section className={constructorStyle.bottom_cover} onClick={handleCardClick(bun)}>
        <div className={constructorStyle.element_wrapper}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burger.bun.name}  (низ)`}
            price={burger.bun.price}
            thumbnail={burger.bun.image}
          />
        </div>
      </section>
      <section className={constructorStyle.amount}>
        <p className="text text_type_digits-medium">{amount}</p>
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
          <OrderDetails order={{_id: state.order, status: 'Ваш заказ начали готовить'}} />
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor;
