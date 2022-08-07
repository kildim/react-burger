import {wsFeedReducer as reducer} from '../ws-feed-reducer';
import {preloadWsFeedState} from '../../../constants/preload-ws-feed-state';
import {feedOnClose, feedOnMessage} from '../../actions/feed-action';

describe('wsFeed reducer test', () => {
  test('should reinitialize store variables after closing websocket connection', () => {
    const initialStore = {...preloadWsFeedState, wsFeedDataLoading: false, wsFeedData: [{test: 'MOCK_DATA'}]};
    const resultStore = {...initialStore, wsFeedDataLoading: true, wsFeedData: []};

    expect(reducer(initialStore, feedOnClose())).toEqual(resultStore);
  })

  test('should initialize store variables after message', () => {
    const testFeed = [{feed: 'MOCK FEED'}];
    const initialStore = {...preloadWsFeedState, wsFeedData: [], total: null, totalToday: null, wsFeedDataLoading: true};
    const resultStore = {...initialStore, wsFeedData: testFeed, total: 1, totalToday: 1, wsFeedDataLoading: false};

    expect(reducer(initialStore, feedOnMessage({orders: testFeed, total: 1, totalToday: 1}))).toEqual(resultStore);
  })
})
