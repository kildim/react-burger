import OrdersListStyle from './builder.module.css';


import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {feedClose, feedInit} from '../../services/actions/feed-action';
import BuilderStyle from '../builder/builder.module.css';
import FeedsList from '../../components/feeds-list/feeds-list';
import {RootState} from '../../index';
import Loader from '../../components/loader/loader';

const CAPTION_STYLE = `${BuilderStyle.caption} text text_type_main-large`;

function OrdersList() {
  const dispatch = useDispatch();
  const wsFeedOpen = useSelector<RootState, boolean>((state) => state.wsFeed.wsFeedOpen)

  useEffect(() => {
    dispatch(feedInit())

    return (() => {
      dispatch(feedClose())
    })
  }, []);


  return (
    !wsFeedOpen ? <Loader/> :
    <section className={BuilderStyle.grid}>
      <h1 className={CAPTION_STYLE}>Лента заказов</h1>
      <FeedsList />
    </section>
  );
}

export default OrdersList;
