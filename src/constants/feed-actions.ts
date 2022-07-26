import {selectOrder} from '../services/actions/feed-action';

export enum FeedActions {
  FeedClose = 'FEED_CLOSE',
  FeedOnOpen = 'FEED_ON_OPEN',
  FeedOnClose = 'FEED_ON_CLOSE',
  FeedOnMessage = 'FEED_ON_MESSAGE',
  FeedOnError = 'FEED_ON_ERROR',
  FeedInit = 'FEED_INIT',
  HideOrderComplete = 'HIDE_ORDER_COMPLETE',
  ShowOrderComplete = 'SHOW_ORDER_COMPLETE',
  SelectOrder = 'SELECT_ORDER',
};
