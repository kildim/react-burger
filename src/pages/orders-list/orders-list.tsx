import React, {useEffect} from 'react';
import styles from './orders-list.module.css'
import {useDispatch, useSelector} from 'react-redux';
import FeedsList from '../../components/feeds-list/feeds-list';
import {RootState} from '../../index';
import FinishedOrdersList from '../../components/finished-orders-list/finished-orders-list';
import ProcessingOrdersList from '../../components/processing-orders-list/processing-orders-list';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {feedClose, feedInit} from '../../services/actions/feed-action';
import Loader from '../../components/loader/loader';

const CAPTION_STYLE = `${styles.caption} text text_type_main-large`;

function OrdersList() {
  const total = useSelector<RootState, number>((state) => state.wsFeed.total);
  const totalToday = useSelector<RootState, number>((state) => state.wsFeed.totalToday);
  // const isFeedDataLoading = useSelector<RootState, boolean>((store) => (store.wsFeed.wsFeedDataLoading));

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(feedInit())
  //
  //   return (() => {
  //     dispatch(feedClose())
  //   })
  // }, []);

  return  (
    // isFeedDataLoading ? <Loader />
    // :
      <section className={styles.grid}>
        <h1 className={CAPTION_STYLE}>Лента заказов</h1>
        <FeedsList/>
        <div className={styles.summaries_grid}>
          <div className={styles.process_summary_grid}>
            <p className={'text text_type_main-medium'}>Готовы :</p>
            <p className={'text text_type_main-medium'}>В работе:</p>
            <FinishedOrdersList/>
            <ProcessingOrdersList/>
          </div>
          <div className={styles.total_summary}>
            <p className={'text text_type_main-medium'}>Выполнено за все время:</p>
            <p className={'text text_type_digits-large'}>{total}</p>
          </div>
          <div className={styles.total_summary}>
            <p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
            <p className={'text text_type_digits-large'}>{totalToday}</p>
          </div>
        </div>
      </section>
    )
}

export default OrdersList;
