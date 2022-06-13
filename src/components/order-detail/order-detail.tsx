//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import {hideOrderDetail} from '../../services/actions/action';
import acceptance from '../../images/acceptance.png';
import Modal from '../modal/modal';

const APP_BODY = document.getElementById('root');

function OrderDetail() {
  const dispatch = useDispatch();
  const {showOrderDetail} = useSelector((state) => ({showOrderDetail: state.showOrderDetail}))
  const {number, status} = useSelector((state) => ({
    number: {...state.order.order}.number,
    status: state.order.success ? 'Ваш заказ начали готовить' : 'Ваш заказ отклонён'
  }));

  const handleClosePopup = () => {
    dispatch(hideOrderDetail())
  }

  return showOrderDetail &&
    <Modal header={''} onClosePopup={handleClosePopup}>
      <>
        <span className={'text text_type_digits-large mt-30'}>{number}</span>
        <span className={'text text_type_main-medium mt-8'}>идентификатор заказа</span>
        <img src={acceptance} className={'mt-15'}/>
        <span className={'mt-15 text text_type_main-default'}>{status}</span>
        <span className={'mt-2 mb-30 text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</span>
      </>
    </Modal>
}

export default OrderDetail;
