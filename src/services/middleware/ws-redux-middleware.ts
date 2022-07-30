import {Middleware, MiddlewareAPI} from 'redux';
import {feedClose, feedOnClose, feedOnMessage, feedOnOpen} from '../actions/feed-action';
import {FeedActions} from '../../constants/feed-actions';

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
      if (type === wsInit && socket === null) {
        console.log(payload);
        socket = new WebSocket(payload);
      }

      if (type === wsClose && socket) {
        console.log('CLOSE');
        socket.close(wsCloseCode.CLOSE_NORMAL, 'Диспатч wsClose');
        socket = null;
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(feedOnOpen());
        };

        socket.onclose = event => {
          dispatch(feedOnClose());
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { orders, total, totalToday} = parsedData;
          console.log(parsedData)
          dispatch(feedOnMessage({orders, total, totalToday}));
        };
        socket.onerror = (error) => {
          console.log(error)
        }

      }

      next(action);
    }
  }
}
