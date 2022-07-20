import {mainReducer} from './main-reducer';
import {combineReducers} from 'redux';
import {authReducer} from './auth-reduser';

export const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
})

export type TRootReducer = ReturnType<typeof rootReducer>;
