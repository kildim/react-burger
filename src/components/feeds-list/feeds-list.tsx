import FeedsListStyles from './feeds-list.module.css';
import CardOrder from '../card-order/card-order';
import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TOrder} from '../../types/torder';

function FeedsList() {
  const feeds = useSelector<RootState, TOrder[]>((state) => state.wsFeed.wsFeedData)
  console.log(feeds);
  return (
    <section className={FeedsListStyles.feeds}>
      {feeds.map((feed) => <CardOrder order={feed} key={feed._id}/>)}
    </section>
  )
};

export default FeedsList;
