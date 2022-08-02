import styles from './processing-orders-list.module.css';
// import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import genId from '../../utils/gen-id';
import {useAppSelector} from '../../services/app-hooks';

function ProcessingOrdersList() {
  const orders = useAppSelector((store) =>
    store.wsFeed.wsFeedData.filter((order) => order.status === 'created').map((order) => order.number.toString())
  )
  const uniqueID = genId();
  return (
    <div className={styles.grid}>
      {orders.map((order) => (<p className={styles.finished_orders_digits.concat(" text text_type_digits-default")} key={uniqueID()}>{order}</p>))}
    </div>
  )
}

export default ProcessingOrdersList;
