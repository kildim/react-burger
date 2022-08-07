import {createReducer} from '@reduxjs/toolkit';
import {preloadWsProfileState} from '../../constants/preload-ws-profile-state';
import {ordersOnClose, ordersOnMessage} from '../actions/profile-ws-action';

const wsProfileReducer = createReducer(preloadWsProfileState, (builder) => {
  builder
    .addCase(ordersOnMessage, (state, action) => {
      state.wsProfileData = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.wsProfileDataLoading = false;
    })
    .addCase(ordersOnClose, (state) => {
      state.wsProfileDataLoading = true;
      state.wsProfileData = [];
    })
})

export {wsProfileReducer}
