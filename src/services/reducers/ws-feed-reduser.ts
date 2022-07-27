import {createReducer} from '@reduxjs/toolkit';
import {preloadWsFeedState} from '../../constants/preload-ws-feed-state';
import {
  feedOnClose,
  feedOnMessage,
  feedOnOpen,
  hideOrderComplete,
  selectOrder,
  showOrderComplete
} from '../actions/feed-action';
import {TOrder} from '../../types/torder';

const wsFeedReducer = createReducer(preloadWsFeedState, (builder) => {
  builder
    .addCase(feedOnOpen, (state) => {
  })
    .addCase(feedOnClose, (state) => {
      state.wsFeedDataLoading = true;
    })
    .addCase(feedOnMessage, (state, action) => {
      state.wsFeedData = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.wsFeedDataLoading = false;
    })
    .addCase(selectOrder, (state, action) => {
      state.selectedOrder = state.wsFeedData.find((order) => order._id === action.payload) as TOrder
    })
    .addCase(showOrderComplete, (state, _action) => {
      state.showOrderComplete = true;
    })
    .addCase(hideOrderComplete, (state, _action) => {
      state.showOrderComplete = false;
    })
})

export {wsFeedReducer}
