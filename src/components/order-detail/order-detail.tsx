//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import {MouseEvent} from 'react';
import {CloseIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetailStyle from '../order-detail/order-detail.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {hideOrderDetail} from '../../services/actions/action';
import acceptance from '../../images/acceptance.png';

const APP_BODY = document.getElementById('root');

function OrderDetail() {
  const dispatch = useDispatch();
  const {showOrderDetail} = useSelector((state) => ({showOrderDetail: state.showOrderDetail}))
  const {number, status} = useSelector((state) => ({
    number: {...state.order.order}.number,
    status: state.order.success ? 'Ваш заказ начали готовить' : 'Ваш заказ отклонён'
  }));

  React.useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'Escape')) {
        dispatch(hideOrderDetail())
      }
    }
    document.addEventListener('keydown', handleEscKeyDown)
    return () => document.removeEventListener('keydown', handleEscKeyDown)
  }, [])

  if (APP_BODY === null) {
    return null;
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>): void => event.stopPropagation();
  const handleCloseClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
    dispatch(hideOrderDetail())
  }

  return showOrderDetail && ReactDOM.createPortal(
    <div className={OrderDetailStyle.modal_overlay} onClick={handleCloseClick}>
      <div className={OrderDetailStyle.modal} onClick={handleModalClick}>
        <div className={`${OrderDetailStyle.header} mt-10 mr-10 ml-10`}>
          <h1 className={'text text_type_main-large'}></h1>
          <Button type="secondary" size="small" onClick={handleCloseClick}><CloseIcon type="primary"/></Button>
        </div>
        <span className={'text text_type_digits-large mt-30'}>{number}</span>
        <span className={'text text_type_main-medium mt-8'}>идентификатор заказа</span>
        <img src={acceptance} className={'mt-15'}/>
        <span className={'mt-15 text text_type_main-default'}>{status}</span>
        <span className={'mt-2 mb-30 text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</span>
      </div>
    </div>
    , APP_BODY
  )
}

export default OrderDetail;
