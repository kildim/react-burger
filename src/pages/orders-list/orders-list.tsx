import React, {useEffect} from 'react';
import styles from './orders-list.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {feedClose, feedInit} from '../../services/actions/feed-action';
import FeedsList from '../../components/feeds-list/feeds-list';
import {RootState} from '../../index';
import Loader from '../../components/loader/loader';
import FinishedOrdersList from '../../components/finished-orders-list/finished-orders-list';
import ProcessingOrdersList from '../../components/processing-orders-list/processing-orders-list';

const CAPTION_STYLE = `${styles.caption} text text_type_main-large`;

function OrdersList() {
  const dispatch = useDispatch();
  const wsFeedOpen = useSelector<RootState, boolean>((state) => state.wsFeed.wsFeedOpen);
  const total = useSelector<RootState, number>((state) => state.wsFeed.total);
  const totalToday = useSelector<RootState, number>((state) => state.wsFeed.totalToday)


  useEffect(() => {
    dispatch(feedInit())

    return (() => {
      dispatch(feedClose())
    })
  }, []);


  return (
    !wsFeedOpen ? <Loader/> :
    <section className={styles.grid}>
      <h1 className={CAPTION_STYLE}>Лента заказов</h1>
      <FeedsList />
      <div className={styles.summaries_grid}>
        <div className={styles.process_summary_grid}>
          <p className={'text text_type_main-medium'}>Готовы :</p>
          <p className={'text text_type_main-medium'}>В работе:</p>
          <FinishedOrdersList />
          <ProcessingOrdersList />
        </div>
        <div className={styles.total_summary}>
          <p className={"text text_type_main-medium"}>Выполнено за все время:</p>
          <p className={"text text_type_digits-large"}>{total}</p>
        </div>
        <div className={styles.total_summary}>
          <p className={"text text_type_main-medium"}>Выполнено за сегодня:</p>
          <p className={"text text_type_digits-large"}>{totalToday}</p>
        </div>
      </div>
    </section>
  );
}

export default OrdersList;
