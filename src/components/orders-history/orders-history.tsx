import FeedsListStyles from './orders-history.module.css';
import CardOrder from '../card-order/card-order';
import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TOrder} from '../../types/torder';

function OrdersHistory() {
  const feeds = useSelector<RootState, TOrder[]>((state) => state.wsFeed.wsFeedData)
  return ( feeds.length > 0 ?
    <section className={FeedsListStyles.feeds}>
      {feeds.map((feed) => <CardOrder order={feed} key={feed._id} from={'/profile/orders'}/>)}
    </section>
  :
  null
  )
};

export default OrdersHistory;
