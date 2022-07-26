import styles from './finished-orders-list.module.css';
import {useSelector} from 'react-redux';
import {RootState} from '../../index';

function FinishedOrdersList() {
  const orders = useSelector<RootState, string[]>((store) =>
    store.wsFeed.wsFeedData.filter((order) => order.status === 'done').map((order) => order.number.toString())
  )
  return (
    <div className={styles.grid}>
      {orders.map((order) => (<p className={styles.finished_orders_digits.concat(" text text_type_digits-default")} key={order}>{order}</p>))}
    </div>
  )
}

export default FinishedOrdersList;
