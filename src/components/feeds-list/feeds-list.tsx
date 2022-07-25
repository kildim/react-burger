import FeedsListStyles from './feeds-list.module.css';
import CardOrder from '../card-order/card-order';
import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TOrder} from '../../types/torder';

function FeedsList() {
  const feeds = useSelector<RootState, TOrder[]>((state) => state.wsFeed.wsFeedData)
  return ( feeds.length > 0 ?
    <section className={FeedsListStyles.feeds}>
      {feeds.map((feed) => <CardOrder order={feed} key={feed._id}/>)}
    </section>
  :
  null
  )
};

export default FeedsList;
