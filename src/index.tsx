import React from 'react';
// @ts-ignore
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {rootReducer} from './services/reducers/root-reducer';
import {BrowserRouter as Router} from 'react-router-dom';
import {wsReduxMiddleware} from './services/middleware/ws-redux-middleware';
import {FeedActions} from './constants/feed-actions';
import {OrdersActions} from './constants/orders-actions';

const feedWsActions = {
  wsInit: FeedActions.FeedInit,
  wsClose: FeedActions.FeedClose,
  onOpen: FeedActions.FeedOnOpen,
  onClose: FeedActions.FeedOnClose,
  onError: FeedActions.FeedOnError,
  onMessage: FeedActions.FeedOnMessage,
};

const ordersWsActions = {
  wsInit: OrdersActions.OrdersInit,
  wsClose: OrdersActions.OrdersClose,
  onOpen: OrdersActions.OrdersOnOpen,
  onClose: OrdersActions.OrdersOnClose,
  onError: OrdersActions.OrdersOnError,
  onMessage: OrdersActions.OrdersOnMessage,
};


const feedListWebSocket = wsReduxMiddleware(feedWsActions);
// const ordersListWebSocket = wsReduxMiddleware(ordersWsActions)

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, feedListWebSocket],
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
