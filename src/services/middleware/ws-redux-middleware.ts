import {Middleware, MiddlewareAPI} from 'redux';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

export type TWsActions = {
  wsInit: ActionCreatorWithPayload<string>,
  wsClose: ActionCreatorWithPayload<null>,
  onOpen: ActionCreatorWithPayload<null>,
  onClose: ActionCreatorWithPayload<null>,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<unknown>,
}

const wsCloseCode = {
 CLOSE_NORMAL: 1000
}

export const wsReduxMiddleware = (wsActions: TWsActions): Middleware => {

  return (store:MiddlewareAPI) => {
    let socket: WebSocket | null  = null
    return (next) => (action) => {
      const { dispatch, getState } = store;

      if (wsActions.wsInit.match(action) && socket === null) {
        socket = new WebSocket(action.payload);
      }

      if (wsActions.wsClose.match(action) && socket) {
        socket.close(wsCloseCode.CLOSE_NORMAL, 'Диспатч wsClose');
        socket = null;
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(wsActions.onOpen(null));
        };

        socket.onclose = event => {
          if (event.code !== wsCloseCode.CLOSE_NORMAL) {
            console.log('error')
            dispatch(wsActions.onError(event.code.toString()));
          }
          dispatch(wsActions.onClose(null));
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsActions.onMessage(parsedData));
        };
        socket.onerror = (error) => {
          console.log(error)
          dispatch(wsActions.onError(error.type));
        }

      }

      next(action);
    }
  }
}
