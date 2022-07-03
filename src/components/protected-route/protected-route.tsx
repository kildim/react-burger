import {Redirect, Route, RouteProps, useLocation} from 'react-router-dom';
import {useAuth} from '../../services/auth/auth';
import React from 'react';
import Loader from '../loader/loader';

function ProtectedRoute(props: RouteProps) {
  const {nick, isAuthChecked} = useAuth();
  const location = useLocation();

  if (!isAuthChecked) {
    return (<Loader/>);
  }

  if (!nick) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {from: location.pathname}
        }}
      />
    )
  }

  return <Route {...props} />
}

export default ProtectedRoute;
