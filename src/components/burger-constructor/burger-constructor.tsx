// @ts-nocheck
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FillingIngredient from '../filling-ingredient/filling-ingredient'

import constructorStyle from './burger-constructor.module.css';
import {State, BurgerConstructorProps} from './burger-constructor.d';
import React, {useContext, useMemo} from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {IngredientData} from '../../types/ingredient-data';
import IngredientDetails from '../ingredient-details/ingredient-details';

// import {order} from '../../utils/data';
import {AppContext} from '../../services/app-context';
import {API_URL} from '../../constants/env-config';
import {useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';

function BurgerConstructor() {
  const [state, setState] = React.useState<State>({
    showIngredientDetails: false,
    showOrderDetails: false,
    ingredient: null
  });

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  // const {state: appState} = useContext(AppContext);
  const {bun, fillings} = useSelector((store) => ({
    bun: store.burger.bun,
    fillings: store.burger.fillings
  }))
  const handleModalClose = () => {
    setState({...state, showIngredientDetails: false, showOrderDetails: false, order: null})
  }


  // const bun = burger.find((item) => item.type === 'bun') || null;
  // const fillings = burger.filter((item) => item.type !== 'bun') ;

  const amount = useMemo(() => {
    const amount = fillings.reduce((amount, current) => amount + current.price, 0);
    return amount + (bun ? bun.price * 2 : 0);
  }, [fillings, bun]);

  const canOrder = () => {

  }

  const ingredientsIds = () => {
    let ids = fillings.map((item) => item._id);
    ids.push(bun._id);
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
        return response.ok ? response.json() : Promise.reject(response.status)
      })
      .then((data) => {
        setState({...state, order: data.order.number, showOrderDetails: true})
      })
      .catch((error) => console.error(error))
  }

  return (
    <section className={constructorStyle.grid} ref={drop}>
      {
        bun &&
        <section className={constructorStyle.upper_cover} onClick={handleCardClick(bun)}>
          <div className={constructorStyle.element_wrapper}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name || 'булочка'} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </section>

      }
      {
        fillings &&
          <section className={constructorStyle.filling}>
            {fillings.map((item: IngredientData) => <FillingIngredient filling={item} key={item._id}
              onClick={handleCardClick(item)}/>)}
          </section>
      }
      {
        bun &&
        <section className={constructorStyle.bottom_cover} onClick={handleCardClick(bun)}>
          <div className={constructorStyle.element_wrapper}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name || 'булочка'}  (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </section>
      }
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
          <IngredientDetails data={state.ingredient}/>
        </Modal>
      }

      {
        state.showOrderDetails &&
        <Modal header={''} onCloseClick={handleModalClose}>
          <OrderDetails order={{_id: state.order, status: 'Ваш заказ начали готовить'}}/>
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor;
