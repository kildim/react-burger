// @ts-nocheck
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import FillingIngredient from '../filling-ingredient/filling-ingredient'

import constructorStyle from './burger-constructor.module.css';
import React, {useMemo} from 'react';
import {IngredientData} from '../../types/ingredient-data';

import {useDispatch, useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';
import {addToBurger} from '../../services/actions/action';
import {fetchOrder} from '../../services/api/api';

function BurgerConstructor() {
  const {bun, fillings} = useSelector((store) => ({
    bun: store.burger.bun,
    fillings: store.burger.fillings,
    order: store.order,
  }))

  const amount = useMemo(() => {
    const amount = fillings.reduce((amount, current) => amount + current.price, 0);
    return amount + (bun ? bun.price * 2 : 0);
  }, [fillings, bun]);

  const dispatch = useDispatch();

  const [{canDrop, isOver}, dropTargetRef] = useDrop(() => ({
    accept: 'ingredient',
    drop: ({_id}) => {
      dispatch(addToBurger(_id))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const ingredientsIds = () => {
    let ids = fillings.map((item) => item._id);
    ids.push(bun._id);
    return ids;
  }

  const handleOrderClick = () => {
    dispatch(fetchOrder(ingredientsIds()));
  }

  return (
    <section className={constructorStyle.grid} ref={dropTargetRef}>
      {
        Object.keys(bun).length !== 0 &&
        <section className={constructorStyle.upper_cover}>
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
      }
      {
        fillings.length !== 0 &&
        <section className={constructorStyle.filling}>
          {fillings.map((item: IngredientData) => <FillingIngredient filling={item} key={item.uniqueIndex}/>)}
        </section>
      }
      {
        Object.keys(bun).length !== 0 &&
        <section className={constructorStyle.bottom_cover}>
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
    </section>
  )
}

export default BurgerConstructor;
