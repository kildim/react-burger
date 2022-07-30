import {createAction} from '@reduxjs/toolkit';
import {WS_BASE_URL} from '../../constants/env-config';
import {ProfileWsActions} from '../../constants/profile-ws-actions';
import {getCookie} from '../../utils/utils';

const ordersInit = createAction(ProfileWsActions.OrdersInit, () => {
  const accessToken = getCookie("authorization")?.slice(7);
  return {
    type: ProfileWsActions.OrdersInit,
    payload: WS_BASE_URL + `?token=${accessToken}`
  }
})

const ordersClose = createAction(ProfileWsActions.OrdersClose, () => ({
  type: ProfileWsActions.OrdersClose,
  payload: null,
}))

const ordersOnMessage = createAction(ProfileWsActions.OrdersOnMessage, (message) => ({
  type: ProfileWsActions.OrdersOnMessage,
  payload: message,
}))

export {
  ordersInit,
  ordersClose,
  ordersOnMessage,
}
