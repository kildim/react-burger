import {mainReducer} from './main-reducer';
import {combineReducers} from 'redux';
import {authReducer} from './auth-reduser';

export default combineReducers({
  main: mainReducer,
  auth: authReducer,
})
