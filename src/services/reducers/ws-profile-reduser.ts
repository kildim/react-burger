import {createReducer} from '@reduxjs/toolkit';
import {TOrder} from '../../types/torder';
import {preloadWsProfileState} from '../../constants/preload-ws-profile-state';
import {ordersOnMessage} from '../actions/profile-ws-action';

const wsProfileReducer = createReducer(preloadWsProfileState, (builder) => {
  builder
    .addCase(ordersOnMessage, (state, action) => {
      console.log(action.payload);
      // state.wsProfileData = action.payload.orders;
      // state.total = action.payload.total;
      // state.totalToday = action.payload.totalToday;
      // state.wsFeedDataLoading = false;
    })
})

export {wsProfileReducer}
