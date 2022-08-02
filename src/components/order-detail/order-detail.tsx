import React from 'react';
// import {useSelector} from 'react-redux';
import acceptance from '../../images/acceptance.png';
import {RootState} from '../../index';
import {useAppSelector} from '../../services/app-hooks';

type TOrderState = {
  number: number,
  status: string
}

function OrderDetail() {
  const {number, status} = useAppSelector((state) => ({
    number: state.main.order.order.number,
    status: state.main.order.success ? 'Ваш заказ начали готовить' : 'Ваш заказ отклонён'
  }));

  return (<>
    <span className={'text text_type_digits-large mt-30'}>{number}</span>
    <span className={'text text_type_main-medium mt-8'}>идентификатор заказа</span>
    <img src={acceptance} className={'mt-15'} alt={'Значёк одобрить'}/>
    <span className={'mt-15 text text_type_main-default'}>{status}</span>
    <span className={'mt-2 mb-30 text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</span>
  </>)
}

export default OrderDetail;
