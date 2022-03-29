import acceptance from '../../images/acceptance.png';
import {OrderDetailsType} from './order-details.d'

function OrderDetails(props: OrderDetailsType) {
  const {_id, status} = props.order;

  return (
    <>
        <span className={'text text_type_digits-large mt-30'}>{_id}</span>
        <span className={'text text_type_main-medium mt-8'}>идентификатор заказа</span>
        <img src={acceptance} className={'mt-15'}/>
        <span className={'mt-15 text text_type_main-default'}>{status}</span>
        <span className={'mt-2 mb-30 text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</span>
    </>
  )
}

export default OrderDetails;
