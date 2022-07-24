import {mainReducer} from './main-reducer';
import {combineReducers} from 'redux';
import {authReducer} from './auth-reduser';
import {wsFeedReducer} from './ws-feed-reduser';

export const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  wsFeed: wsFeedReducer,
})
