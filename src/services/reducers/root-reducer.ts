import {mainReducer} from './main-reducer';
import {combineReducers} from 'redux';
import {authReducer} from './auth-reduser';
import {wsFeedReduser} from './ws-feed-reduser';

export const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  wsFeed: wsFeedReduser,
})

export type TRootReducer = ReturnType<typeof rootReducer>;
