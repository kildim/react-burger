import {createReducer} from '@reduxjs/toolkit';
import {preloadWsFeedState} from '../../constants/preload-ws-feed-state';
import {
  feedOnClose,
  feedOnMessage,
} from '../actions/feed-action';

const wsFeedReducer = createReducer(preloadWsFeedState, (builder) => {
  builder
    .addCase(feedOnClose, (state) => {
      state.wsFeedDataLoading = true;
      state.wsFeedData = [];
    })
    .addCase(feedOnMessage, (state, action) => {
      state.wsFeedData = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.wsFeedDataLoading = false;
    })
})

export {wsFeedReducer}
