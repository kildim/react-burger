import styles from './order-complete.module.css';
import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TOrder} from '../../types/torder';
import OrderCompleteCard from '../order-complete-card/order-complete-card';
import {formatOrderTime} from '../../utils/utils';
import {TIngredient} from '../../types/tingredient';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import genId from '../../utils/gen-id';

type OrderCompleteType = {
  orderId?: string
}

function OrderComplete(props: OrderCompleteType): JSX.Element {
  const {orderId} = props;
  const order = useSelector<RootState, TOrder>(state => state.wsFeed.wsFeedData.find((order) => order._id === orderId)  as TOrder);
  const nutrients = useSelector<RootState, TIngredient[]>((store) => store.main.ingredients);

  const {number, name, ingredients = [], updatedAt = ''} = order;
  const uniqueOrderItemsIds = Array.from(new Set(ingredients));
  const itemsRecord = uniqueOrderItemsIds.map((orderItemId) => (
    {
      ingredient: nutrients.find((nutrient) => nutrient._id === orderItemId),
      count: ingredients.reduce((accumulator, currentValue) =>  accumulator + (currentValue ? (currentValue === orderItemId ? 1 :0) :0), 0)
    }
  ));
  console.log(itemsRecord)
  const orderItems = ingredients.map((ingredient) => nutrients.find((nutrient) => nutrient._id === ingredient))
  const cost = orderItems.length > 0 ? orderItems.reduce(
    (accumulator, currentValue) => accumulator
      + (currentValue ? currentValue.type === 'bun' ? currentValue.price * 2 : currentValue.price : 0), 0) : 0;
  const uniqueId = genId();

  return (
    <div className={styles.order_complete}>
      <p className={'text text_type_digits-medium mb-10'}>#{number}</p>
      <p className={'text text_type_main-medium mb-10'}>{name}</p>
      <p className={'text text_type_main-medium'}>Состав:</p>
      <ul className={styles.list}>
        {/*{ingredients.map((ingredient) => (<li key={uniqueId()}><OrderCompleteCard id={ingredient}/> </li>))}*/}
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
