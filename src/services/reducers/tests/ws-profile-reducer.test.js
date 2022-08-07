import {preloadWsProfileState} from '../../../constants/preload-ws-profile-state';
import {wsProfileReducer as reducer} from '../ws-profile-reducer';
import {ordersOnClose, ordersOnMessage} from '../../actions/profile-ws-action';
import {preloadWsFeedState} from '../../../constants/preload-ws-feed-state';

describe('wsProfile reducer test', () => {
  test('should initialize store variables after message', () => {
    const testFeed = [{feed: 'MOCK FEED'}];
    const initialStore = {...preloadWsProfileState, wsProfileData: [], total: null, totalToday: null, wsProfileDataLoading: true};
    const resultStore = {...initialStore, wsProfileData: testFeed, total: 1, totalToday: 1, wsProfileDataLoading: false};

    expect(reducer(initialStore, ordersOnMessage({orders: testFeed, total: 1, totalToday: 1}))).toEqual(resultStore);
  })

  test('should reinitialize store variables after closing websocket connection', () => {
    const initialStore = {...preloadWsFeedState, wsProfileDataLoading: false, wsProfileData: [{test: 'MOCK_DATA'}]};
    const resultStore = {...initialStore, wsProfileDataLoading: true, wsProfileData: []};

    expect(reducer(initialStore, ordersOnClose())).toEqual(resultStore);
  })
});
