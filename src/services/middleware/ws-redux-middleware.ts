import {AnyAction, Middleware} from 'redux';


export const wsReduxMiddleware: Middleware = (url: string, accessToken = '') => {
  const extraParams = accessToken === '' ? '' : `?token=${accessToken}`;

  return (store) => {
    let socket = null
    return next => (action: AnyAction) => {
      next(action);
    }
  }

}
