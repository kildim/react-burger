import {mainReducer} from './main-reducer';
import {combineReducers} from 'redux';
import {authReducer} from './auth-reduser';
import {wsFeedReducer} from './ws-feed-reduser';
import {wsProfileReducer} from './ws-profile-reduser';

export const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  wsFeed: wsFeedReducer,
  wsProfile: wsProfileReducer,
})
