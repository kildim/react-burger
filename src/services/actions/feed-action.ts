import {createAction} from '@reduxjs/toolkit';
import {FeedActions} from '../../constants/feed-actions';
import {WS_BASE_URL} from '../../constants/env-config';

const feedInit = createAction(FeedActions.FeedInit, () => ({
  type: FeedActions.FeedInit,
  payload: WS_BASE_URL + '/all'
}))

const feedClose = createAction(FeedActions.FeedClose, () => ({
  type: FeedActions.FeedClose,
  payload: null,
}))

const feedOnOpen = createAction(FeedActions.FeedOnOpen, () => ({
  type: FeedActions.FeedOnOpen,
  payload: null,
}))

const feedOnClose = createAction(FeedActions.FeedOnClose, () => ({
  type: FeedActions.FeedOnClose,
  payload: null,
}))

const feedOnMessage = createAction(FeedActions.FeedOnMessage, (message) => ({
  type: FeedActions.FeedOnMessage,
  payload: message,
}))

const hideOrderComplete = createAction(FeedActions.HideOrderComplete, () => ({
  type: FeedActions.HideOrderComplete,
  payload: null,
}));

const showOrderComplete = createAction(FeedActions.ShowOrderComplete, () => ({
  type: FeedActions.ShowOrderComplete,
  payload: null,
}));

const selectOrder = createAction(
  FeedActions.SelectOrder, (id) => ({
    type: FeedActions.SelectOrder,
    payload: id
  })
)

export type TFeedAction =
    ReturnType<typeof feedInit>
  | ReturnType<typeof feedClose>
  | ReturnType<typeof feedOnOpen>
  | ReturnType<typeof feedOnClose>
  | ReturnType<typeof hideOrderComplete>
  | ReturnType<typeof showOrderComplete>
  | ReturnType<typeof selectOrder>
  | ReturnType<typeof feedOnMessage>;

export {
  feedInit,
  feedClose,
  feedOnOpen,
  feedOnClose,
  feedOnMessage,
  hideOrderComplete,
  showOrderComplete,
  selectOrder,
}
