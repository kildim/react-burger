import style from './order-exhaustive.module.css';
import OrderComplete from '../../components/order-complete/order-complete';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {useEffect} from 'react';
import {selectOrder} from '../../services/actions/feed-action';
import {TOrder} from '../../types/torder';

type TLocationParams = {
  id: string,
}
type OrderExhaustiveType = {
  orderId: string
}

function OrderExhaustive(props: OrderExhaustiveType): JSX.Element | null {

  const {orderId} = props
  // const dispatch = useDispatch();
  // const {id} = useParams<TLocationParams>();
  // const history = useHistory();

  // useEffect(() => {
  //     dispatch(selectOrder(orderId))
  // }, [])


  // return history.location.state ? null
  //   :
  //   (<div className={style.order_exhaustive}>
  //       <OrderComplete />
  //     </div>
  // )
  return (
    <div className={style.order_exhaustive}>
        <OrderComplete orderId={orderId}/>
      </div>
  )

}

export default OrderExhaustive
