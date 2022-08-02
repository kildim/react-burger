import styles from './order-complete.module.css';
// import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TOrder} from '../../types/torder';
import OrderCompleteCard from '../order-complete-card/order-complete-card';
import {formatOrderTime} from '../../utils/utils';
import {TIngredient} from '../../types/tingredient';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import genId from '../../utils/gen-id';
import Loader from '../loader/loader';
import {useEffect} from 'react';
import {fetchIngredients, fetchOrderByNum} from '../../services/api/api';
import {useAppDispatch, useAppSelector} from '../../services/app-hooks';

type OrderCompleteType = {
  orderId?: string
}

function OrderComplete(props: OrderCompleteType): JSX.Element {
  const {orderId} = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchOrderByNum(orderId));
    }, [dispatch]
  );

  const order = useAppSelector(state => state.main.selectedOrder);
  const nutrients = useAppSelector((store) => store.main.ingredients);
  const isOrderLoading = useAppSelector((store) => store.main.isOrderLoading);

  const {number, name, ingredients = [], updatedAt = ''} = order;
  const uniqueOrderItemsIds = Array.from(new Set(ingredients));
  const itemsRecord = uniqueOrderItemsIds.map((orderItemId) => (
    {
      ingredient: nutrients.find((nutrient) => nutrient._id === orderItemId),
      count: ingredients.reduce((accumulator, currentValue) =>  accumulator + (currentValue ? (currentValue === orderItemId ? 1 :0) :0), 0)
    }
  ));
  const orderItems = ingredients.map((ingredient) => nutrients.find((nutrient) => nutrient._id === ingredient))
  const cost = orderItems.length > 0 ? orderItems.reduce(
    (accumulator, currentValue) => accumulator
      + (currentValue ? currentValue.type === 'bun' ? currentValue.price * 2 : currentValue.price : 0), 0) : 0;
  const uniqueId = genId();


  return (
    isOrderLoading ?
      <Loader/>
      :
    <div className={styles.order_complete}>
      <p className={'text text_type_digits-medium mb-10'}>#{number}</p>
      <p className={'text text_type_main-medium mb-10'}>{name}</p>
      <p className={'text text_type_main-medium'}>Состав:</p>
      <ul className={styles.list}>
        {itemsRecord.map((item) => (<li key={uniqueId()}><OrderCompleteCard nutrientRecord={item}/> </li>))}

      </ul>
      <div className={styles.footer}>
        <p className={'text text_type_main-default text_color_inactive'}>{formatOrderTime(updatedAt)}</p>
        <div className={styles.price_wrapper}>
          <span className={'text text_type_digits-default mr-5'}>{cost}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}

export default OrderComplete
