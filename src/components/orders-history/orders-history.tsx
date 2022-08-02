import FeedsListStyles from './orders-history.module.css';
import CardOrder from '../card-order/card-order';
// import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TOrder} from '../../types/torder';
import {useAppSelector} from '../../services/app-hooks';

function OrdersHistory() {
  const orders = useAppSelector((state) => state.wsProfile.wsProfileData)
  return ( orders.length > 0 ?
    <section className={FeedsListStyles.feeds}>
      {orders.map((order) => <CardOrder order={order} key={order._id} from={'/profile/orders'}/>)}
    </section>
  :
  null
  )
};

export default OrdersHistory;
