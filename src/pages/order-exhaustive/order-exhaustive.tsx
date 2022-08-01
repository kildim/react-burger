import style from './order-exhaustive.module.css';
import OrderComplete from '../../components/order-complete/order-complete';
import {useHistory, useParams} from 'react-router-dom';
// import {useDispatch, useSelector} from 'react-redux';

import React, {useEffect} from 'react';
import {feedClose, feedInit, selectOrder} from '../../services/actions/feed-action';
import {TOrder} from '../../types/torder';
import Loader from '../../components/loader/loader';
import {RootState} from '../../index';

type TLocationParams = {
  id: string,
}
type OrderExhaustiveType = {
  orderId: string
}

function OrderExhaustive(props: OrderExhaustiveType): JSX.Element | null {

  const {orderId} = props
  return (
    <div className={style.order_exhaustive}>
      <OrderComplete orderId={orderId}/>
      </div>
  )
}

export default OrderExhaustive
