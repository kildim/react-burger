import {createReducer} from '@reduxjs/toolkit';
import {preloadWsFeedState} from '../../constants/preload-ws-feed-state';
import {feedInit} from '../actions/feed-action';

const wsFeedReduser = createReducer(preloadWsFeedState, (builder) => {
  builder.addCase(feedInit, ((state, action) => {

  }))
})

export {wsFeedReduser}
