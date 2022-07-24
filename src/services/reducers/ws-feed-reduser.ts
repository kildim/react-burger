import {createReducer} from '@reduxjs/toolkit';
import {preloadWsFeedState} from '../../constants/preload-ws-feed-state';
import {feedOnClose, feedOnMessage, feedOnOpen} from '../actions/feed-action';

const wsFeedReducer = createReducer(preloadWsFeedState, (builder) => {
  builder
    .addCase(feedOnOpen, (state) => {
    state.wsFeedOpen = true;
  })
    .addCase(feedOnClose, (state) => {
      state.wsFeedOpen = false;
    })
    .addCase(feedOnMessage, (state, action) => {
      state.wsFeedData = action.payload;
    })
})

export {wsFeedReducer}
