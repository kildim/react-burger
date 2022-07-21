import {Middleware, MiddlewareAPI} from 'redux';

type TWsActions = {
  wsInit: string,
  wsClose: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
}

const wsCloseCode = {
 CLOSE_NORMAL: 1000
}

export const wsReduxMiddleware = (wsActions: TWsActions): Middleware => {

  return (store:MiddlewareAPI) => {
    let socket: WebSocket | null  = null
    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (socket) {

        if (type === wsClose) {
          socket.close(wsCloseCode.CLOSE_NORMAL, 'Диспатч wsClose');
        }
      }

      next(action);
    }
  }
}
