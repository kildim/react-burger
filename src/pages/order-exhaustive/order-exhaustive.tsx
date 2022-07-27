import style from './order-exhaustive.module.css';
import OrderComplete from '../../components/order-complete/order-complete';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {useEffect} from 'react';
import {selectOrder} from '../../services/actions/feed-action';

type TLocationParams = {
  id: string,
}

function OrderExhaustive(): JSX.Element | null {

  const dispatch = useDispatch();
  const {id} = useParams<TLocationParams>();
  const history = useHistory();

  useEffect(() => {
      dispatch(selectOrder(id))
  }, [])


  return history.location.state ? null
    :
    (<div className={style.order_exhaustive}>
        <OrderComplete />
      </div>
  )
}

export default OrderExhaustive
