import {createAction} from '@reduxjs/toolkit';
import {FeedActions} from '../../constants/feed-actions';
import {WS_FEED_BASE_URL} from '../../constants/env-config';

const feedInit = createAction(FeedActions.FeedInit, () => ({
  type: FeedActions.FeedInit,
  payload: WS_FEED_BASE_URL + '/all'
}))

const feedClose = createAction(FeedActions.FeedClose, () => ({
  type: FeedActions.FeedClose,
  payload: null,
}))

export {
  feedInit,
  feedClose
}
